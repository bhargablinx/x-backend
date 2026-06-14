const homeFeed = async (req, res) => {
    try {
        res.status(200).json({
            message: "Home feed",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const followingFeed = async (req, res) => {
    try {
        res.status(200).json({
            message: "Following feed",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { homeFeed, followingFeed };
