import { Router } from "express";
import adminAuth from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  addPhoto,
  addProduct,
  changePassword,
  customers,
  dashboardData,
  deleteProduct,
  getMonthlyRevenue,
  getOrders,
  getProducts,
  orderDetail,
  toggleProduct,
  updateOrderStatus,
} from "../controllers/admin.controller.js";

const router = Router();

router.post(
  "/add-product",
  upload.fields([{ name: "images", maxCount: 10 }]),
  addProduct
);
router.patch("/change-password", adminAuth, changePassword);
router.post("/add-photo", adminAuth, upload.single("image"), addPhoto);
router.get("/products",adminAuth, getProducts);
router.get("/orders", adminAuth, getOrders);
router.get("/monthly-rev", adminAuth, getMonthlyRevenue);
router.get("/recent-orders", adminAuth, dashboardData);
router.patch("/toggle/:productId", adminAuth, toggleProduct);
router.delete("/delete/:productId", adminAuth, deleteProduct);
router.get("/order/:orderId",adminAuth, orderDetail);
router.patch("/order/status/:orderId", adminAuth, updateOrderStatus);
router.get("/customers", adminAuth, customers);




export default router;
