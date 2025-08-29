import express from 'express';
import roleCheck from '../middleware/roleCheck.js';
import {getAllOrders,updateOrderStatus} from '../controllers/allOrdersController.js';
import authenticate from '../middleware/check.js';

const router = express.Router();



router.get('/', roleCheck("admin"),authenticate, getAllOrders);
router.post('/update-status/:id', roleCheck("admin"), authenticate,updateOrderStatus);

export default router;
