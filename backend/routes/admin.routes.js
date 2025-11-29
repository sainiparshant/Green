import { Router } from "express";
import adminAuth from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  addPhoto,
  addPlant,
  addPot,
  availablePlants,
  availablePots,
  changePassword,
  deletePlant,
  deletePot,
  featuredPlants,
  featuredPots,
  getAllPlants,
  getAllPots,
  getSinglePlant,
  getSinglePot,
  toggleAvailable,
  toggleAvailablePot,
  toggleFeatured,
  toggleFeaturedPot,
  updatePlantDetail,
  updatePotDetail,
} from "../controllers/admin.controller.js";

const router = Router();

router.post(
  "/add-plant",
  adminAuth,
  upload.fields([{ name: "images", maxCount: 10 }]),
  addPlant
);
router.patch("/change-password", adminAuth, changePassword);
router.post("/add-photo", adminAuth, upload.single("image"), addPhoto);
router.patch("/plants/:id/availablity", adminAuth, toggleAvailable);
router.patch("/plants/:id/feature", adminAuth, toggleFeatured);
router.patch("/plants/:id/update", adminAuth, updatePlantDetail);
router.get("/plants", adminAuth, getAllPlants);
router.get("/plants/:id", adminAuth, getSinglePlant);
router.get("/featured-plant", adminAuth, featuredPlants);
router.get("/available-plant", adminAuth, availablePlants);
router.delete("/delete-plant/:id", adminAuth, deletePlant);

// pot routes

router.post(
  "/add-pot",
  adminAuth,
  upload.fields([{ name: "images", maxCount: 10 }]),
  addPot
);
router.get("/pots", adminAuth, getAllPots);
router.patch("/pots/:id/availablity", adminAuth, toggleAvailablePot);
router.patch("/pots/:id/feature", adminAuth, toggleFeaturedPot);
router.patch("/pots/:id/update", adminAuth, updatePotDetail);
router.get("/pots/:id", adminAuth, getSinglePot);
router.get("/featured-pots", adminAuth, featuredPots);
router.get("/available-pots", adminAuth, availablePots);
router.delete("/delete-pot/:id", adminAuth, deletePot);


export default router;
