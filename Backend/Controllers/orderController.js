const Order = require('../Models/Order');
const Product = require('../Models/Product');
const User = require('../Models/User');

//Returns an order by ID if the order exists
const Print_Order_By_ID = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('User_ID', 'Username')
            .populate('Order_Items.Product_ID', 'Name');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Deletes an order based on its ID if the ordr exists
const Delete_Order_By_ID = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({message: "Order record succesfully removed"});
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//remember to consider mongoose session transactions for this as a failsafe
//Creates an order object and adds it to the database
const Create_Order_From_Cart = async (req, res) => {
  try {
    const User_ID = req.params.id;
    const user = await User.findById(User_ID);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.Cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

    // ── Step 1: verify stock is available for every item before doing anything ──
    for (const cartItem of user.Cart) {
      const product = await Product.findById(cartItem.Product_ID);

      if (!product) {
        return res.status(404).json({
          message: `Product ${cartItem.Product_Name} no longer exists`
        });
      }

      if (product.Stock_Quantity < cartItem.Product_Quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${cartItem.Product_Name}. Available: ${product.Stock_Quantity}`
        });
      }
    }

    // ── Step 2: all stock checks passed, create the order ──
    const newOrder = new Order({
      User_ID,
      Order_Items: user.Cart.map(item => ({
        Product_ID: item.Product_ID,
        Product_Name: item.Product_Name,
        Price_At_Purchase: item.Product_Price,
        Quantity: item.Product_Quantity,
      })),
      Order_Total: user.Cart.reduce((sum, item) => sum + (item.Product_Price * item.Product_Quantity), 0),
      Order_Date: new Date(),
    });

    const savedOrder = await newOrder.save();

    // ── Step 3: deduct stock for each item ──
    for (const cartItem of user.Cart) {
      await Product.findByIdAndUpdate(
        cartItem.Product_ID,
        { $inc: { Stock_Quantity: -cartItem.Product_Quantity } }, // ← decrement by quantity purchased
        { new: true }
      );
    }

    // ── Step 4: clear the cart ──
    user.Cart = [];
    await user.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  Print_Order_By_ID, 
  Delete_Order_By_ID, 
  Create_Order_From_Cart
};