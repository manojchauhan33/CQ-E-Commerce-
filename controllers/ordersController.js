import Order from "../models/order.js";

const viewOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "name price image") 
      .sort({ createdAt: -1 });

    res.render("orders", { 
      orders 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading orders");
  }
};

export { viewOrders };
