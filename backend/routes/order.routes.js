import { Router } from "express";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { getAllOrders, orderDetails, placeOrder } from "../controllers/order.controller.js";


const router = Router();

router.post("/place-order", authorize("user", "admin"), verifyJwt, placeOrder);
router.get("/all", authorize("user", "admin"), verifyJwt, getAllOrders);
router.get("/:orderId", authorize("user", "admin"), verifyJwt, orderDetails);

export default router;