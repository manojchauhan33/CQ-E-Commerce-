import Cart from "../models/cart.js";
import Product from "../models/product.js";



const addToCart = async (req, res) => {
  try {
    
    const userId = req.user._id;   
    const productId = req.params.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }


    const existing = cart.items.find(item => item.productId.toString() === productId);


    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.redirect("/cart");

  }
   catch (err) {
    console.error(err);
    res.status(500).send("Error adding to cart");
  }
};



const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ 
      userId: req.user._id
    }).populate("items.productId");       //refrence 

    if (!cart) {
      return res.render("cart",{         //render cart but this case when cart is empty
        cartItems: [],
        total: 0 
      });
    }

    
    let total = 0;
    const cartItems = cart.items.map(item => {
      total += item.productId.price * item.quantity;

      return {
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        _id: item.productId._id,
        image: item.productId.image
      };
      
    });

    

    res.render("cart",{
       cartItems,
       total
    });


  } catch (err) {
    console.error(err);
    res.status(500).send("Error viewing cart");
  }
};



const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    let cart = await Cart.findOne({ 
      userId 
    });
    
    if (!cart) return res.redirect("/cart");

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();    // save kr do jo id se match nhi huye bs baki bache delete or remove update ho gya ek tarike se cart

    res.redirect("/cart");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing from cart");
  }
};


export { addToCart, viewCart, removeFromCart };
