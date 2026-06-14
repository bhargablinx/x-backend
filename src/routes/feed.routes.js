import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { homeFeed, followingFeed } from "../controllers/feed.controller.js";

const router = Router();

// Random user posts
router.route("/").get(verifyJWT, homeFeed);

// Following users posts
router.route("/followings").get(verifyJWT, followingFeed);

export default router;
