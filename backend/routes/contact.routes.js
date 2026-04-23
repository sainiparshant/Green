import {Router} from 'express';
import { addContactInfo } from '../controllers/contact.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/add', addContactInfo);
router.get('/all', authorize("admin") ,addContactInfo);


export default router;