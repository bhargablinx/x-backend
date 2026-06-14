import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";

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
    }
};

const registerUsr = async (req, res) => {
    try {
        const { username, name, email, password, bio, avatar } = req.body;

        if (!username || !name || !email || !password)
            res.status(400).json({ message: "Enter all required fields" });

        // check if user already exit
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser)
            return res.status(400).json({
                message: "User already exits! with username or email!!",
            });

        // check of avatar -> if available handle later (not now)

        // create a user and push to db
        const user = await User.create({
            username: username.toLowerCase(),
            name,
            email,
            password,
            bio,
            avatar,
        });

        // send to response to client
        res.status(200).send({
            message: "Account Created",
            user,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error registering user!!",
        });
    }
};

const loginUsr = async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email)
        return res.status(400).json({
            message: "Something is missing: username or email!!",
        });

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user)
        return res.status(400).json({
            message: "Invalid credentials!!",
        });

    const isPassValid = await user.isPasswordCorrect(password); // user not User to access its methods

    if (!isPassValid)
        return res.status(401).json({
            message: "Incorrect Password!!",
        });

    const { accessToken, refreshToken } = await generateToken(user._id);

    res.status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .json({
            message: "Log In Successful",
            accessToken,
            refreshToken,
        });
};

const logoutUsr = async (req, res) => {
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

        res.status(500).json({
            message: "Unauthorized: Please login to continue",
        });
    }
};

const getUsr = (req, res) => {
    res.send("This is the User!!");
};
const deleteUsr = (req, res) => {
    res.send("User deleted!!");
};

const getUsrPost = (req, res) => {
    res.send("User: Post!!");
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
