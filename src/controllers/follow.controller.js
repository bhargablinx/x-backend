import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";

const followUser = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const followedUserId = req.params.userId;

        if (loggedInUserId.toString() === followedUserId)
            return res.status(404).json({
                message: "Can't self-follow",
            });

        const user = await User.findById(followedUserId);
        if (!user)
            return res.status(404).json({
                message: "User don't exits that you want to follow",
            });

        await Follow.create({
            follower: loggedInUserId,
            following: followedUserId,
        });

        await User.findByIdAndUpdate(followedUserId, {
            $inc: { followersCount: 1 },
        });

        await User.findByIdAndUpdate(loggedInUserId, {
            $inc: { followingCount: 1 },
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
        const loggedInUserId = req.user._id;
        const followedUserId = req.params.userId;

        if (loggedInUserId.toString() === followedUserId)
            return res.status(404).json({
                message: "Can't self-unfollow",
            });

        const user = await User.findById(followedUserId);
        if (!user)
            return res.status(404).json({
                message: "User don't exits that you want to unfollow",
            });

        const deletedFollow = await Follow.findOneAndDelete({
            follower: loggedInUserId,
            following: followedUserId,
        });

        if (!deletedFollow) {
            return res.status(404).json({
                message: "You are not following this user",
            });
        }

        await User.findByIdAndUpdate(followedUserId, {
            $inc: { followersCount: -1 },
        });

        await User.findByIdAndUpdate(loggedInUserId, {
            $inc: { followingCount: -1 },
        });

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
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const followers = await Follow.find({
            following: userId,
        }).populate("follower", "username");

        const followerUsers = followers.map((follow) => follow.follower);

        return res.status(200).json({
            count: followerUsers.length,
            followers: followerUsers,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const getFollowing = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const followings = await Follow.find({
            follower: userId,
        }).populate("following", "username");

        const followingUsers = followings.map((follow) => follow.following);

        return res.status(200).json({
            count: followingUsers.length,
            followers: followingUsers,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const removeFollower = async (req, res) => {
    try {
        const userId = req.user._id; // logged-in user
        const targetUserId = req.params.targetUserId; // follower to remove from frontend

        if (targetUserId === userId.toString()) {
            return res.status(400).json({
                message: "Cannot remove yourself as a follower",
            });
        }

        await Follow.findOneAndDelete({
            follower: targetUserId,
            following: userId,
        });

        if (!follow) {
            return res.status(404).json({
                message: "User is not following you",
            });
        }

        res.status(200).json({
            message: "Removed follower",
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove follower" });
    }
};

export { followUser, unfollowUser, getFollowers, getFollowing };
