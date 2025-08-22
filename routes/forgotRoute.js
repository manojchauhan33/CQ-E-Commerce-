import express from 'express';
import { sendResetLink } from '../controllers/forgotController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('forgotPassword');
});

router.post('/', sendResetLink);

export default router;



