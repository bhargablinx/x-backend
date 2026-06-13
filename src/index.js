import "dotenv/config";
import connectDB from "./db/connection.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () =>
            console.log(`Server started at ${process.env.PORT}`)
        );
    })
    .catch((err) => {
        console.log("DB Connection Failed!", err);
    });
