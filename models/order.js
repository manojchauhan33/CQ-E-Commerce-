import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      }
    }
  ],

  total: { 
    type: Number, 
    required: true 
  },

  address: { 
    type: String, 
    required: true 
  },

  phone: { 
    type: String, 
    required: true 
  },



  
  paymentMethod: { 
    type: String, 
    enum: ["COD", "Razorpay"], 
    default: "COD" 
  },

   
       

  

  status: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending" 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

