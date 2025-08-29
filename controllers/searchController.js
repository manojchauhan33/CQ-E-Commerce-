import Product from "../models/product.js";

export const searchProducts = async (req, res) => {
  try {


    const query = req.query.search_input;




    let products = [];

    
    if (query) {
       products = await Product.find({ name: query }); 
    }

    
    res.render("search", {
      query,
      products
    });




  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


