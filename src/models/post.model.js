import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280,
        },
        likesCount: {
            type: Number,
            default: 0,
        },
        commentCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
