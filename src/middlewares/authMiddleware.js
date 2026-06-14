import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token)
            res.status(401).json({
                message: "Unauthorized (token not found)!",
            });

        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedData._id).select(
            "-password -refreshToken"
        );
        if (!user)
            res.status(401).json({
                message: "Invalid access token",
            });

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};
