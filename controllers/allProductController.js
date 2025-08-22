//allProductController
import Product from "../models/product.js";


const allProducts = async (req, res) => {
  try {

    const products = await Product.find();
    res.render("allProduct",{
         products 
    });

    } catch (err) {
        console.error("err:", err);
        res.status(500).send("errr");
    }
};




const deleteProduct = async (req, res) => {

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/all-product"); 

  } catch (err) {
    console.error("err:", err);
    res.status(500).send("err");
  }

};






export { allProducts, deleteProduct };
