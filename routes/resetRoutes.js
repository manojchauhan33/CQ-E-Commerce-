import express from 'express';
import { renderResetForm, updatePassword } from '../controllers/resetController.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.status(400).send('Token is required.');            //middleware
});


router.get('/:token', renderResetForm);     



// http://localhost:3000/reset-password/ba2e26955fe35acf996f6a2cb024b76ba04ef4b8523cf79ae15b46ca42171759


router.post('/:token', updatePassword);


export default router;
