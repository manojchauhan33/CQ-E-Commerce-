import express from 'express';
import authenticate from '../middleware/check.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.render('profile', { 
    user: req.user 
  });
});

export default router;
