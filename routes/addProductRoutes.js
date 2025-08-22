import express from "express";
import { addProduct } from "../controllers/addProductController.js";
import roleCheck from "../middleware/roleCheck.js";
import upload from "../middleware/multer.js";

const router = express.Router();


router.get("/", roleCheck("admin"), (req, res) => {
  res.render("addProduct");
});


router.post("/", upload.single("image"), roleCheck("admin"), addProduct);

export default router;
