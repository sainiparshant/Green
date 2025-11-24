import { Router } from "express";
import { addPhoto, adminLogin, adminLogout, changePassword, getAdminProfile } from "../controllers/admin.controller.js";
import adminAuth from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";



const router = Router();

router.post("/login", adminLogin);
router.get("/profile", adminAuth, getAdminProfile);
router.patch("/change-password", adminAuth,changePassword);
router.post("/add-photo", adminAuth, upload.single('image'), addPhoto);
router.get("/logout", adminAuth, adminLogout);


export default router;