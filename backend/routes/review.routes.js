import {Router} from 'express';
import { addReview, getReviews, removeReview } from '../controllers/review.controller.js';
import {authorize, verifyJwt} from '../middleware/auth.middleware.js'

const router = Router();

router.post("/add-review/:productId",verifyJwt, authorize("user", "admin"), addReview);
router.get("/get-all/:productId", getReviews);
router.delete("/remove-review/:reviewId", verifyJwt, authorize("user", "admin"), removeReview);

export default router;