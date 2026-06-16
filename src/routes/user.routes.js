import { Router } from "express";
import {
    registerUsr,
    loginUsr,
    logoutUsr,
    getUsr,
    deleteUsr,
    getUsrPost,
    refreshAccessToken,
} from "../controllers/user.controller.js";
import {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
} from "../controllers/follow.controller.js";

import { removeFollower } from "../controllers/follow.controller.js";

import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Static Routes
router.route("/register").post(registerUsr);
router.route("/login").post(loginUsr);

// Secure Routes
router.route("/logout").post(verifyJWT, logoutUsr);
router.route("/posts").get(verifyJWT, getUsrPost);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/delete").delete(verifyJWT, deleteUsr);

// Dynamic Routes
router.route("/username/:username").get(getUsr);
router.route("/:userId/follow").post(verifyJWT, followUser);
router.route("/:userId/follow").delete(verifyJWT, unfollowUser);
router.route("/followers/:targetUserId").delete(verifyJWT, removeFollower);

router.route("/:userId/followers").get(getFollowers);
router.route("/:userId/followings").get(getFollowing);

export default router;
