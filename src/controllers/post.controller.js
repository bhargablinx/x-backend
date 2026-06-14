import Post from "../models/post.model.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content?.trim())
            return res.status(400).json({
                message: "Content is required!!",
            });

        const userId = req.user._id;

        const post = await Post.create({
            author: userId,
            content,
        });

        res.status(201).json(post);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Failed creating post" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const allPost = await Post.find({});
        res.status(200).json(allPost);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Failed to fetch all post" });
    }
};

const getPostById = async (req, res) => {
    try {
        const postId = req.params.postId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post id",
            });
        }

        const post = await Post.findById(postId);

        if (!post)
            return res.status(404).json({ message: "Post doesn't exists" });

        res.status(200).json(post);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch the post",
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params?.postId;
        const userId = req.user?._id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        await post.deleteOne();

        res.status(200).json({ message: "Post deleted!" });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete the post",
        });
    }
};

export { createPost, getAllPosts, getPostById, deletePost };
