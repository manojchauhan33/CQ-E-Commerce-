import express from 'express';
import {signup} from '../controllers/signupController.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
});


router.post('/',signup);




export default router;