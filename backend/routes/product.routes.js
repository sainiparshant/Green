import { Router } from 'express';
import { getAllPlants, getAllPots, getSinglePlant, getSinglePot, globalSearch } from '../controllers/products/product.controller.js';
import { authorize } from '../middleware/auth.middleware.js';



const router = Router();

router.get("/search",  globalSearch);

// plant
router.get("/all/plants", getAllPlants);
router.get("/single-plant/:id", getSinglePlant);


// pots

router.get("/all/pots", getAllPots);
router.get("/single-pot/:id", getSinglePot);



export default router;