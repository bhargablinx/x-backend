import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
    },
    { timestamps: true }
);

export default Comment = mongoose.model("Comment", commentSchema);
