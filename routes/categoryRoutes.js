import express from "express";
import { getElectronics, getFashion, getBooks, getHealthcare, getSports,getFurniture, getGrocery,getKitchen} from "../controllers/categoryController.js";

const router = express.Router();


router.get("/electronics", getElectronics);

router.get("/fashion", getFashion);

router.get("/books", getBooks);

router.get("/healthcare", getHealthcare);

router.get("/sports", getSports);

router.get("/furniture", getFurniture);

router.get("/grocery", getGrocery);

router.get("/kitchen", getKitchen);


export default router;