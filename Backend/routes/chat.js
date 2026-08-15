import express from "express";

import { auth } from "../middleware/auth.js";
import { createChat, fetchChat } from "../controllers/chat_controller.js";
const router = express.Router();


router.post("/createChat",auth,createChat);
router.get("/fetchChat",auth,fetchChat);

export default router;