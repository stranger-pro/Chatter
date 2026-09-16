import express from "express"
import cors from "cors"
import userRoute from "./routes/user.js"
import chatRoute from "./routes/chat.js"
import messageRoute from "./routes/message.js"
import {connectDb} from "./config/db.js"
import dotenv from "dotenv"
dotenv.config()

import {app, server} from "./Socket/soket.js"
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(
    cors({
    origin: "http://localhost:5173", 
    credentials:true,
}),
);

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);


const PORT = process.env.PORT || 5000;
connectDb();

server.listen(PORT, () => {
  console.log("listen..",PORT);
});
