import { Router } from "express";
import { registerUser, verifyOtp } from "../controllers/user.controller.js";



const router = Router();

router.post("/login", registerUser);
router.post("/verify-otp", verifyOtp);

export default router;