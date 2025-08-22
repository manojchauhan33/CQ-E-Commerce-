import express from "express";
import { allProducts, deleteProduct } from "../controllers/allProductController.js";
import roleCheck from "../middleware/roleCheck.js";

const router = express.Router();


router.get("/", roleCheck("admin"), allProducts);

router.post("/delete/:id", roleCheck("admin"), deleteProduct);

export default router;
