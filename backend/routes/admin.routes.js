import { Router } from "express";
import adminAuth from "../middleware/admin.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  addPhoto,
  addProduct,
  changePassword,
  customers,
  dashboardData,
  deleteVariant,
  getMonthlyRevenue,
  getOrders,
  getProducts,
  orderDetail,
  toggleProduct,
  updateOrderStatus,
  updatePaymentStatus,
} from "../controllers/admin.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/add-product",
  upload.fields([{ name: "images", maxCount: 10 }]),
  addProduct
);
router.patch("/change-password", adminAuth, authorize("admin"), changePassword);
router.post("/add-photo", adminAuth, authorize("admin"),upload.single("image"), addPhoto);
router.get("/products",adminAuth,authorize("admin"), getProducts);
router.get("/orders", adminAuth, authorize("admin"), getOrders);
router.get("/monthly-rev", adminAuth, authorize("admin"), getMonthlyRevenue);
router.get("/recent-orders", adminAuth, authorize("admin"), dashboardData);
router.patch("/toggle/:productId", adminAuth, authorize("admin"), toggleProduct);
router.delete("/delete/:variantId", adminAuth, authorize("admin"), deleteVariant);
router.get("/order/:orderId",adminAuth, authorize("admin"), orderDetail);
router.patch("/order/status/:orderId", adminAuth, authorize("admin"), updateOrderStatus);
router.patch("/order/payment-status/:orderId", adminAuth, authorize("admin"), updatePaymentStatus);
router.get("/customers", adminAuth, authorize("admin"), customers);




export default router;
