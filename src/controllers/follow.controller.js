import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";

const followUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const followedUserId = req.params.userId;

        if (loggedInUserId.toString() === followedUserId)
            res.status(404).json({
                message: "Can't self-follow",
            });

        const user = await User.findById(followedUserId);
        if (!user)
            res.status(404).json({
                message: "User don't exits that you want to follow",
            });

        await Follow.create({
            follower: loggedInUserId,
            following: followedUserId,
        });

        res.status(200).json({
            message: "User followed successfully",
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Already following this user",
            });
        }

        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

const unfollowUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "Unfollowed!!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getFollowers = async (req, res) => {
    try {
        res.status(200).json({
            message: "Unfollowed!!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getFollowing = async (req, res) => {
    try {
        res.status(200).json({
            message: "Unfollowed!!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { followUser, unfollowUser, getFollowers, getFollowing };
