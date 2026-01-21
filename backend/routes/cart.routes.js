import { Router } from "express";
import { addToCart, getCart, getPriceSummary, quantityUpdate, removeItem } from "../controllers/cart.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router();
router.post("/add",verifyJwt, addToCart);
router.post("/update-qty", verifyJwt, quantityUpdate);
router.delete("/remove-item", verifyJwt, removeItem);
router.get("/all-item", verifyJwt, getCart);
router.get("/price-summary", verifyJwt, getPriceSummary);

export default router;