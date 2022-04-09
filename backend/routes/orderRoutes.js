import express from 'express';
const router = express.Router();
import { addOrderitems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderitems);

export default router;
