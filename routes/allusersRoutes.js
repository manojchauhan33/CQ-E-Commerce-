import express from 'express';
import { getAllUsers } from '../controllers/allUserController.js';
import roleCheck from '../middleware/roleCheck.js'; // optional, to allow only admin
import authenticate from '../middleware/check.js';

const router = express.Router();


router.get('/', roleCheck("admin"),authenticate, getAllUsers);

export default router;
