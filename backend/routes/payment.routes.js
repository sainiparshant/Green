import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-order", verifyJwt, createOrder);
router.post("/varify-order", verifyJwt, verifyPayment);

export default router;