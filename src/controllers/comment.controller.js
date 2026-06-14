import Comment from "../models/comment.model.js";

const createComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const content = req.body.content;

        if (!content?.trim())
            return res.status(400).json({
                message: "Comment is required!!",
            });

        const comment = await Comment.create({
            post: postId,
            author: userId,
            content,
        });

        res.status(200).json({
            message: "added comment",
            comment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getCommentsByPost = async (req, res) => {
    try {
        res.status(200).json({ message: "All comments are shown" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { createComment, getCommentsByPost };
