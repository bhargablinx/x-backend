const followUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "Followed!!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
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
