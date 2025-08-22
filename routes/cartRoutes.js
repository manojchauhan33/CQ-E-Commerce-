import express from "express";
import { addToCart, viewCart, removeFromCart } from "../controllers/cartController.js";
import authenticate from "../middleware/check.js";



const router = express.Router();

router.get("/", authenticate, viewCart);

router.get("/add/:id", authenticate, addToCart);

router.get("/remove/:id", authenticate, removeFromCart);

export default router;
