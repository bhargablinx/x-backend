import mongoose, { Schema } from "mongoose";

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
    },
    { timestamps: true }
);

export default User = mongoose.model("User", userSchema);
