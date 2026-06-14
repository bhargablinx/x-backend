import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        const existingLike = await Like.findOne({
            user: userId,
            post: postId,
        });

        if (existingLike) {
            return res.status(400).json({
                message: "You already liked this post",
            });
        }

        await Like.create({ user: userId, post: postId });

        const post = await Post.findById(postId);
        post.incrementLike(post.likesCount);
        await post.save({ validateBeforeSave: false });

        res.status(200).json({
            message: "post liked!!",
            totalLike: post.likesCount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const unlikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;

        const like = await Like.findOne({ user: userId, post: postId });

        if (!like)
            return res.json({ message: "No like on this post by this user" });

        await Like.deleteOne({ user: userId, post: postId });

        const post = await Post.findById(postId);
        post.decrementLike(post.likesCount);
        await post.save({ validateBeforeSave: false });

        res.status(200).json({
            message: "post un-liked!!",
            totalLike: post.likesCount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { likePost, unlikePost };
