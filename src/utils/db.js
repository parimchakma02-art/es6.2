import mongoose from "mongoose";


export const connectDb = async (mongoUrl) => {
    if(!mongoUrl) {
        throw new Error("MongoDB URL is not provided");
    }

    await mongoose.connect(mongoUrl);
}