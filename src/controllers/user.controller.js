import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";

const registerUsr = async (req, res) => {
    try {
        const { username, name, email, password, bio, avatar } = req.body;

        if (!username || !name || !email || !password)
            res.status(400).json({ message: "Enter all required fields" });

        // check if user already exit
        const dbRes = await User.find({ email });
        if (dbRes.length !== 0)
            return res.status(400).json({
                message: "User already exits!",
            });

        // check of avatar -> if available handle later (not now)

        // create a user and push to db
        const user = await User.create({
            username,
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
    const { email, password } = req.body;

    const user = await User.find({ email, password });

    if (user.length === 0)
        res.status(400).json({
            data: "Invalid credentials!!",
        });

    res.status(200).json({
        message: "OK",
        data: "Log In Successful",
    });
};

const logoutUsr = (req, res) => {
    res.send("User logout!!");
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

export { registerUsr, loginUsr, logoutUsr, getUsr, deleteUsr, getUsrPost };
