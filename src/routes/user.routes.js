import { Router } from "express";
import {
    registerUsr,
    loginUsr,
    logoutUsr,
    getUsr,
    deleteUsr,
    getUsrPost,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUsr);
router.route("/login").post(loginUsr);
router.route("/logout").post(logoutUsr);
router.route("/:id").get(getUsr);
router.route("/:id").delete(deleteUsr);
router.route("/posts").get(getUsrPost);

export default router;
