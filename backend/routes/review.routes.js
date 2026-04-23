import {Router} from 'express';
import { addReview, getReviews, removeReview } from '../controllers/review.controller.js';
import {authorize, verifyJwt} from '../middleware/auth.middleware.js'

const router = Router();

router.post("/add-review/:productId", authorize("user", "admin"), verifyJwt, addReview);
router.get("/get-all/:productId", authorize("user", "admin"), getReviews);
router.delete("/remove-review/:reviewId", authorize("user", "admin"), verifyJwt, removeReview);

export default router;