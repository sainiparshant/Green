import { Router } from 'express';
import { getAllPlants, getAllPots, getSinglePlant, getSinglePot, globalSearch } from '../controllers/products/product.controller.js';
import { authorize } from '../middleware/auth.middleware.js';



const router = Router();

router.get("/search", authorize("user", "admin"), globalSearch);

// plant
router.get("/all/plants", authorize("user", "admin"), getAllPlants);
router.get("/single-plant/:id", authorize("user", "admin"), getSinglePlant);


// pots

router.get("/all/pots", authorize("user", "admin"), getAllPots);
router.get("/single-pot/:id", authorize("user", "admin"), getSinglePot);



export default router;