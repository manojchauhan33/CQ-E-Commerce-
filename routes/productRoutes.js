import express from "express";
import { products, getProduct } from "../controllers/productController.js";
import authenticate from '../middleware/check.js';

const router = express.Router();


router.get("/", authenticate, products);


router.get("/:id", getProduct);

export default router;
