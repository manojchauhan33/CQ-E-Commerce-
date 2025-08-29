import express from "express";
import { viewOrders } from "../controllers/ordersController.js";
import authenticate from "../middleware/check.js";

const router = express.Router();

router.get("/",authenticate, viewOrders);

export default router;
