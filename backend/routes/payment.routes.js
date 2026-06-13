import { Router } from "express";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-order",verifyJwt, authorize("user", "admin"), createOrder);
router.post("/verify-order",verifyJwt, authorize("user", "admin"), verifyPayment);

export default router;