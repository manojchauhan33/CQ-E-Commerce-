import express from 'express';
import { changePassword } from '../controllers/changePasswordController.js';
import authenticate from '../middleware/check.js';

const router = express.Router();



router.get('/', authenticate, (req, res) => {
  res.render('changePassword');
});

router.post('/', authenticate, changePassword);

export default router;
