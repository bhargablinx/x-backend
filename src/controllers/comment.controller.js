import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

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

        const post = await Post.findById(postId);
        post.incrementComment(post.commentCount);
        await post.save({ validateBeforeSave: false });

        res.status(200).json({
            message: "added comment",
            totalComment: post.commentCount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const allComments = await Comment.find({ post: postId });

        res.status(200).json(allComments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { createComment, getCommentsByPost };
