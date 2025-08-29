import express from "express";
import { allProducts, deleteProduct,updateProduct, editProductForm} from "../controllers/allProductController.js";
import roleCheck from "../middleware/roleCheck.js";
import upload from "../middleware/multer.js";

const router = express.Router();


router.get("/", roleCheck("admin"), allProducts);


router.post("/delete/:id", roleCheck("admin"), deleteProduct);


router.get("/edit/:id", roleCheck("admin"), editProductForm);
router.post("/edit/:id", upload.single("image"), roleCheck("admin"), updateProduct);


export default router;
