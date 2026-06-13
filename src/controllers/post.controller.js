const createPost = (req, res) => {
    res.send("Post add!!");
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
