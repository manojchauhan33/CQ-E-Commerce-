import Cart from "../models/cart.js";
import Order from "../models/order.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";


const checkoutPage = async (req, res) => {
  const cart = await Cart.findOne({ 
    userId: req.user._id 
  }).populate("items.productId");




  if (!cart || cart.items.length === 0) {
    return res.redirect("/cart");
  }




  let total = 0;
  cart.items.forEach(item => total += item.productId.price * item.quantity);




  res.render("checkout", { 
    cartItems: cart.items, 
    total 
  });
};




const placeOrder = async (req, res) => {
  
  const cart = await Cart.findOne({ 
    userId: req.user._id 
  }).populate("items.productId");


  if (!cart || cart.items.length === 0) {
    return res.redirect("/cart");
  }

  let total = 0;
  cart.items.forEach(item => total += item.productId.price * item.quantity);




  if (req.body.payment === "COD") {
    


    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      total,
      address: req.body.address,
      phone: req.body.phone,
      paymentMethod: "COD",
      status: "Pending"
    });

    await order.save();
    cart.items = [];
    await cart.save();

    return res.redirect("/orders");

  } else {
    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    try {
      const razorpayOrder = await razorpay.orders.create(options);

      res.render("razorpayCheckout", {
        razorpayOrder,
        total,
        key_id: process.env.RAZORPAY_KEY_ID,
        address: req.body.address,
        phone: req.body.phone
      });



    } catch (error) {
      console.error(error);
      res.send("Error creating Razorpay order");
    }
  }
};





const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, address, phone } = req.body;




    const sign = razorpay_order_id + "|" + razorpay_payment_id;   //both are joined by pipe
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");



    if (razorpay_signature !== expectedSign) {
      return res.status(400).send("Invalid payment signature");
    }



    const cart = await Cart.findOne({ 
      userId: req.user._id 
    }).populate("items.productId");


    if (!cart || cart.items.length === 0){
      return res.redirect("/cart");
    }


    let total = 0;
    cart.items.forEach(item => total += item.productId.price * item.quantity);



    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      total,
      address,
      phone,
      paymentMethod: "Online",
      status: "Paid",
    });


    // paymentId: razorpay_payment_id



    await order.save();
    cart.items = [];
    await cart.save();

    

    res.json({ 
      success: true 
    }); 


    

  } catch (err) {
    console.error(err);
    res.status(500).send("Payment verification failed");
  }
};

export { checkoutPage, placeOrder, verifyPayment };
