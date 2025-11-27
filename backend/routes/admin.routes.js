import { Router } from "express";
import adminAuth from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { addPhoto, addPlant, changePassword, getSinglePlant, toggleAvailable, toggleFeatured, updatePlantDetail } from "../controllers/admin.controller.js";



const router = Router();

router.post("/add-plant",adminAuth, upload.fields([
    { name: "images", maxCount: 10}
]), addPlant);
router.patch("/change-password", adminAuth, changePassword);
router.post("/add-photo", adminAuth, upload.single('image'), addPhoto);
router.patch("/plants/:id/availablity", adminAuth, toggleAvailable);
router.patch("/plants/:id/feature", adminAuth, toggleFeatured);
router.patch("/plants/:id/update", adminAuth, updatePlantDetail);
router.get("/plants/:id", adminAuth, getSinglePlant);



export default router;