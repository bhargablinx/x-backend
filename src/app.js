import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

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

export { app };
