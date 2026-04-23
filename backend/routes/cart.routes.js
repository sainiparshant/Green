import { Router } from "express";
import { addToCart, getCart, getPriceSummary, quantityUpdate, removeItem } from "../controllers/cart.controller.js";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";


const router = Router();
router.post("/add",verifyJwt, authorize("user", "admin"), addToCart);
router.post("/update-qty", verifyJwt, authorize("user", "admin"), quantityUpdate);
router.delete("/remove-item", verifyJwt, authorize("user", "admin"), removeItem);
router.get("/all-item", verifyJwt, authorize("user", "admin"), getCart);
router.get("/price-summary", verifyJwt, authorize("user", "admin"), getPriceSummary);

export default router;