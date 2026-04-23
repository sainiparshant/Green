import { Router } from "express";
import { authorize, verifyJwt } from "../middleware/auth.middleware.js";
import {
  addAddress,
  deleteAddress,
  getAddress,
  setDefaultAddress,
  updateAddress,
} from "../controllers/address.controller.js";

const router = Router();

router.post("/add-addr", verifyJwt, authorize("user", "admin"), addAddress);
router.get("/get-addrs", verifyJwt, authorize("user", "admin"), getAddress);
router.delete("/remove-addr/:id",authorize("user", "admin"),  verifyJwt, deleteAddress);
router.patch("/update-addr/:id", verifyJwt, authorize("user", "admin"), updateAddress);
router.patch("/update-default/:id", verifyJwt, authorize("user", "admin"), setDefaultAddress);

export default router;
