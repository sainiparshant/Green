import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware";
import { createOrder } from "../controllers/payment.controller";

const router = Router();

router.post("/create-order", verifyJwt, createOrder);

export default router;