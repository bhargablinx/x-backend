import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/x-db`);
        console.log("DB Connected!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
