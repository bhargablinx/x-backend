import Post from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content)
            return res.status(401).json({
                message: "Content is required!!",
            });

        const userId = req.user._id;

        const post = await Post.create({
            author: userId,
            content,
        });

        res.status(200).json(post);
    } catch (error) {
        throw error;
        res.status(500).json({ message: "Failed creating post" });
    }
};

const getAllPosts = (req, res) => {
    res.send("All Post!!");
};

const getPostById = (req, res) => {
    res.send("Post 1!!");
};
const deletePost = (req, res) => {
    res.send("Delete Post !!");
};

export { createPost, getAllPosts, getPostById, deletePost };
