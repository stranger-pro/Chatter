import express from "express";

import { auth } from "../middleware/auth.js";
import { deleteMessage, editMessage, sendMessage } from "../controllers/message.js";
const router = express.Router();


router.post("/createMessage",auth,sendMessage);
router.delete("/deleteMessage",auth,deleteMessage);
router.put("/editMessage",auth,editMessage);

export default router;