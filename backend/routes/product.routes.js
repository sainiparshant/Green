import { Router } from 'express';
import { getAllPlants, getAllPots, getSinglePlant, getSinglePot } from '../controllers/products/product.controller.js';



const router = Router();

// plant
router.get("/all/plants", getAllPlants);
router.get("/single-plant/:id", getSinglePlant);


// pots

router.get("/all/pots", getAllPots);
router.get("/single-pot/:id", getSinglePot);



export default router;