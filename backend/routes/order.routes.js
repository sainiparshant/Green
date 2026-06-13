import { Router } from "express";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import { getAllOrders, orderDetails, placeOrder } from "../controllers/order.controller.js";


const router = Router();

router.post("/place-order",verifyJwt, authorize("user", "admin"), placeOrder);
router.get("/all", verifyJwt,authorize("user", "admin"), getAllOrders);
router.get("/:orderId",verifyJwt, authorize("user", "admin"),  orderDetails);

export default router;