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



const editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("editProduct", { 
      product 
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};



const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const updateData = { name, description, price, category, stock };

    
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/all-product");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export { allProducts, deleteProduct, editProductForm, updateProduct };
