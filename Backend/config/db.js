import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();


export const connectDb = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Db connected");
        })
        .catch((e) => {
            console.log('syntax sahi kar');
            console.log(e.message);
            process.exit(1);
        })
} 