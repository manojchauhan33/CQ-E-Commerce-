import Product from "../models/product.js";
import User from '../models/user.js';


const products = async (req, res) => {
  try {

    const products = await Product.find();
      res.render("products", { 
        products
      });

      



  } catch (err) {
    res.status(500).send("Error fetching products");
  }
};





const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product){
       return res.status(404).send("product not found");

    }

    res.render("productDetails",{
       product
     });
  }
  
  
  catch (err) {
    res.status(500).send("Error fetching product details");
  }
};


export { products, getProduct };
