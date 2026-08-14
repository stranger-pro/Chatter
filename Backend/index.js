import express, { urlencoded } from "express"
import cors from "cors"
import userRoute from "./routes/user.js"
import {connectDb} from "./config/db.js"
import dotenv from "dotenv"
import http from "http"
dotenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(
    cors({
    origin: "*", 
    credentials:true,
}),
);

app.use("/api/user", userRoute);

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
connectDb();

server.listen(PORT, () => {
  console.log("listen..");
});
