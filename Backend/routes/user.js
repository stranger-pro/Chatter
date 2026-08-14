import express from "express";
import { fetchUser, register, signIn } from "../controllers/user_controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/register",register);
router.post("/signin",signIn);
router.get("/fetchUser",auth,fetchUser);

export default router;