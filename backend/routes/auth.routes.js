import { Router } from "express";
import { adminLogin, adminLogout, getAdminProfile, getUserProfile, logoutUser, regenrateAccessToken, registerUser, verifyOtp } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import adminAuth from "../middleware/admin.middleware.js";



const router = Router();

// user
router.post("/login", registerUser);
router.post("/verify-otp", verifyOtp);
router.get("/profile" , verifyJwt , getUserProfile);
router.get("/logout",verifyJwt, logoutUser);
router.get("/refresh-token", regenrateAccessToken);


// admin
router.post("/admin/login", adminLogin);
router.get("/admin/profile", adminAuth, getAdminProfile);
router.get("/admin/logout", adminAuth, adminLogout);


export default router;