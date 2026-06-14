import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    { timestamps: true }
);

likeSchema.index({ user: 1, post: 1 }, { unique: true }); // One user can like one post only once

const Like = mongoose.model("Like", likeSchema);

export default Like;
