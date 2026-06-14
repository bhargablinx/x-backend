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

import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Static Routes
router.route("/register").post(registerUsr);
router.route("/login").post(loginUsr);

// Secure Routes
router.route("/logout").post(verifyJWT, logoutUsr);
router.route("/posts").get(verifyJWT, getUsrPost);
router.route("/refresh-token").get(refreshAccessToken);

// Dynamic Routes
router.route("/username/:username").get(getUsr);
router.route("/:id").delete(deleteUsr);

export default router;
