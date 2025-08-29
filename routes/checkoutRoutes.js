import express from "express";
import { checkoutPage, placeOrder, verifyPayment } from "../controllers/checkoutController.js";
import authenticate from "../middleware/check.js";

const router = express.Router();




router.get("/", authenticate, checkoutPage);
router.post("/", authenticate, placeOrder);
router.post("/verify", authenticate, verifyPayment);

export default router;
