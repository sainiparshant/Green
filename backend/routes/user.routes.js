import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { addProfileImage, deleteProfileImage, updateProfileInfo } from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";


const router = Router();

router.patch("/update-profile", verifyJwt, updateProfileInfo);
router.post("/upload-photo", upload.single("photo"), verifyJwt, addProfileImage);
router.delete("/delete-photo", verifyJwt, deleteProfileImage);

export default router;