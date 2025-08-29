import Order from '../models/order.js';


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email') 
      .populate('items.productId', 'name price'); 

    res.render('allOrders', { 
        orders 
    });


  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).send('Server Error');
  }
  
};



const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    await Order.findByIdAndUpdate(orderId, { 
      status 
    });

    

    res.redirect('/all-orders'); 
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).send('Server Error');
  }
};

export  {getAllOrders , updateOrderStatus};
