import { Router } from "express";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-order", authorize("user", "admin"), verifyJwt, createOrder);
router.post("/verify-order", authorize("user", "admin"), verifyJwt, verifyPayment);

export default router;