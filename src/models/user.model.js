import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            // select: false, // password will not return when the user is accessed
        },
        bio: {
            type: String,
            default: "Hey! Guys I am using X",
            trim: true,
        },
        avatar: {
            type: String,
            default: "",
        },
        followersCount: {
            type: Number,
            default: 0,
        },

        followingCount: {
            type: Number,
            default: 0,
        },
        refreshToken: String,
    },
    { timestamps: true }
);

// Encrypt password
userSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10);
});

// Decrypt password and validate
userSchema.methods.isPasswordCorrect = async function (passwordByClient) {
    return await bcrypt.compare(passwordByClient, this.password); // returns bool
};

// Generate Access Token
userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        { _id: this._id, email: this.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

const User = mongoose.model("User", userSchema);

export default User;
