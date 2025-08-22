import express from 'express';

import {login} from '../controllers/loginController.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});




router.post('/', login);


export default router;