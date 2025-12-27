import { Router } from 'express';
import { getAllPlants } from '../controllers/products/product.controller.js';



const router = Router();

router.get("/all/plants", getAllPlants);



export default router;