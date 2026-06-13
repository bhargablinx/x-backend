const registerUsr = (req, res) => {
    res.send("User registered!!");
};

const loginUsr = (req, res) => {
    res.send("User Logged in!!");
};

const logoutUsr = (req, res) => {
    res.send("User logout!!");
};
const getUsr = (req, res) => {
    res.send("This is the User!!");
};
const deleteUsr = (req, res) => {
    res.send("User deleted!!");
};

const getUsrPost = (req, res) => {
    res.send("User: Post!!");
};

export { registerUsr, loginUsr, logoutUsr, getUsr, deleteUsr, getUsrPost };
