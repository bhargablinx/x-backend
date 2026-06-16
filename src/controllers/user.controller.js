import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log("Server error: Generating token", error);
        throw error;
    }
};

const registerUsr = async (req, res) => {
    try {
        const { username, name, email, password, bio } = req.body;
        const avatarPath = req.file.path;

        if (!username || !name || !email || !password)
            return res
                .status(400)
                .json({ message: "Enter all required fields" });

        // check if user already exit
        const existingUser = await User.findOne({
            $or: [{ username }, { email: email.toLowerCase() }],
        });
        if (existingUser)
            return res.status(400).json({
                message: "User already exits! with username or email!!",
            });

        // check of avatar -> if available handle later (not now)
        const cloudinaryResponse = await uploadToCloudinary(avatarPath);
        const avatar = cloudinaryResponse.url;

        // create a user and push to db
        const user = await User.create({
            username: username.toLowerCase(),
            name,
            email: email.toLowerCase(),
            password,
            bio,
            avatar,
        });

        // send to response to client
        res.status(201).send({
            message: "Account Created",
            user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            message: "Error registering user!!",
        });
    }
};

const loginUsr = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!username && !email)
            return res.status(400).json({
                message: "Something is missing: username or email!!",
            });

        const user = await User.findOne({
            $or: [
                { email: email?.toLowerCase() },
                { username: username?.toLowerCase() },
            ],
        });

        if (!user)
            return res.status(401).json({
                message: "Invalid credentials!!",
            });

        const isPassValid = await user.isPasswordCorrect(password); // user not User to access its methods

        if (!isPassValid)
            return res.status(401).json({
                message: "Incorrect Password!!",
            });

        const { accessToken, refreshToken } = await generateToken(user._id);

        res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
            })
            .json({
                message: "Log In Successful",
                accessToken,
                refreshToken,
            });
    } catch (error) {
        throw error;
        return res.status(500).json({
            message: "Login failed",
        });
    }
};

const logoutUsr = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined,
                },
            },
            { new: true }
        );

        res.status(200)
            .clearCookie("accessToken", { httpOnly: true, secure: true })
            .clearCookie("refreshToken", { httpOnly: true, secure: true })
            .json({ message: "User logged out!!" });
    } catch (error) {
        throw error;
        res.status(500).json({ message: "Failed to logout user" });
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const clientRefreshToken =
            req.cookies?.refreshToken || req.body?.refreshToken;

        if (!clientRefreshToken) throw new Error("Token not found");

        // Decode client token
        const decodedToken = await jwt.verify(
            clientRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // search user in db by id
        const user = await User.findById(decodedToken?._id);
        if (!user) throw new Error("User not found");

        // verify both tokens
        if (clientRefreshToken !== user.refreshToken)
            throw new Error("Token invalid");

        // if verified generate new token
        const { accessToken, refreshToken } = await generateToken(user._id);

        res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
            })
            .json({
                message: "New Tokens generated Successful",
                accessToken,
                refreshToken,
            });
    } catch (error) {
        console.log(error);

        res.status(401).json({
            message: "Unauthorized: Please login to continue",
        });
    }
};

const getUsr = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await User.findOne({ username }).select(
            "-password -refreshToken -email -_id -updatedAt "
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            message: `Hi ${username}!!!`,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: `User doesn't exists with this username`,
        });
    }
};

const deleteUsr = async (req, res) => {
    try {
        const user = req.user;

        await User.findByIdAndDelete(user._id);

        res.status(200)
            .clearCookie("accessToken", { httpOnly: true, secure: true })
            .clearCookie("refreshToken", { httpOnly: true, secure: true })
            .json({ message: "User deleted and cookie cleared!!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete user",
        });
    }
};

const getUsrPost = async (req, res) => {
    try {
        const useId = req.user._id;
        const postByUser = await Post.find({ author: useId });

        res.status(200).json(postByUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error finding post" });
    }
};

export {
    registerUsr,
    loginUsr,
    logoutUsr,
    getUsr,
    deleteUsr,
    getUsrPost,
    refreshAccessToken,
};
