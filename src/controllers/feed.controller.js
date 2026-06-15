import Follow from "../models/follow.model.js";
import Post from "../models/post.model.js";

const homeFeed = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const followingFeed = async (req, res) => {
    try {
        const userId = req.user._id;
        // in follow collection: find where return users where follower = loggedIn user
        const followingUsers = await Follow.find({ follower: userId }).select(
            "-_id -createdAt -updatedAt -follower -__v"
        );

        const followingIds = followingUsers.map((user) => user.following);

        const followingPosts = await Post.find({
            author: { $in: followingIds },
        });

        res.status(200).json(followingPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch followings post" });
    }
};

export { homeFeed, followingFeed };
