const mongoose = require('mongoose');

const order_schema = new mongoose.Schema({
    User_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    Order_Items: [{
        Product_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        Product_Name: { type: String },
        Quantity: {type: Number},
        Price_At_Purchase: {type: Number}}],
    Order_Total: {type: Number},
    Order_Date: {type: Date}
})

module.exports = mongoose.model('Order', order_schema, 'Orders');