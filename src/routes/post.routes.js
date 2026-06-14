import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
} from "../controllers/post.controller.js";
import {
    createComment,
    getCommentsByPost,
} from "../controllers/comment.controller.js";
import { likePost, unlikePost } from "../controllers/like.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createPost);
router.route("/").get(verifyJWT, getAllPosts);

router.route("/:postId").get(verifyJWT, getPostById);
router.route("/:postId").delete(verifyJWT, deletePost);

router.route("/:postId/comments").post(verifyJWT, createComment);
router.route("/:postId/comments").get(verifyJWT, getCommentsByPost);

router.route("/:postId/like").post(verifyJWT, likePost);
router.route("/:postId/like").delete(verifyJWT, unlikePost);

export default router;
