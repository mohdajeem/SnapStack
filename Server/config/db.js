import mongoose from "mongoose";

export const connectDb = async () => {
    try{
        // console.log("monogUri: ",process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        // console.log("Monogo Db connected successfully");
    } catch(err){
        console.error("mongoDb connection error", err);
    }
}