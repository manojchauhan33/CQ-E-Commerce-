import Product from "../models/product.js";




export const getElectronics = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "electronics" 
    });

    res.render("electronics", { 
        products 
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading electronics");
  }
};






export const getFashion = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "fashion" 
    });

    res.render("fashion", { 
        products 
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading fashion");
  }
};




export const getBooks = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "books" 
    });

    res.render("books", { 
        products 
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading books");
  }
};



export const getHealthcare = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "healthcare" 
    });

    res.render("healthcare", { 
        products 
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading healthcare");
  }
};



export const getSports = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "sports" 
    });

    res.render("sports", { 
        products 
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading sports");
  }
};







export const getFurniture = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "furniture" 
    });

    res.render("furniture", { 
        products 
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading furniture");
  }
};




export const getGrocery = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "grocery" 
    });

    res.render("grocery", { 
        products 
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading furniture");
  }
};


export const getKitchen = async (req, res) => {
  try {
    const products = await Product.find({ 
        category: "kitchen" 
    });

    res.render("kitchen", { 
        products 
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading furniture");
  }
};