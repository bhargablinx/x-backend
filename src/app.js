import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

// CORS Middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
// Other Middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded());
app.use(cookieParser());

// Routes
app.use("/user", userRouter);
app.use("/post", postRouter);

export { app };
