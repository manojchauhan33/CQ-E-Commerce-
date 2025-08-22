import Product from "../models/product.js";

 const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // console.log(req.body);

    const image = req.file ? req.file.filename : null;

    // console.log(req.body);
    // console.log(req.body);


    if (!name || !description || !price || !category || !stock || !image ) {
      return res.status(400).send("all fields are required");
    }





    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image
    });

    // console.log(newProduct);

    await newProduct.save();

    res.redirect("/products");

    
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).send("Error adding product");
  }
};


export {addProduct};
