import mongoose from "mongoose";

export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Monogo Db connected successfully");
    } catch(err){
        console.log("mongoDb connection error", err);
    }
}