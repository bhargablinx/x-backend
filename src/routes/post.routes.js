import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createPost);
router.route("/").get(verifyJWT, getAllPosts);

router.route("/:postId").get(verifyJWT, getPostById);
router.route("/:postId").delete(verifyJWT, deletePost);

export default router;
