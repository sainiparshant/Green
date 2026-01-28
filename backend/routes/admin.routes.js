import { Router } from "express";
import adminAuth from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  addPhoto,
  addProduct,
  changePassword,
  getMonthlyRevenue,
  getOrders,
  getProducts,
} from "../controllers/admin.controller.js";

const router = Router();

router.post(
  "/add-product",
  adminAuth,
  upload.fields([{ name: "images", maxCount: 10 }]),
  addProduct
);
router.patch("/change-password", adminAuth, changePassword);
router.post("/add-photo", adminAuth, upload.single("image"), addPhoto);
router.get("/products", getProducts);
router.get("/orders", getOrders);
router.get("/montly-rev", getMonthlyRevenue);




export default router;
