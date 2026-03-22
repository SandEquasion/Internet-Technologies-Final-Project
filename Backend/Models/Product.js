const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true},
    Rating: { type: Number, default: 0 }, 
    Review_Count: { type: Number, default: 0 },
    Description: { type: String, required: true, unique: true },
    Price: { type: Number, required: true },
    Brand: { type: String, required: true },
    Product_Size: { type: String, required: true},
    Img_Urls: [{ type: String, required: true, unique: true }],
    Category: { type: String, required: true },
    Stock_Quantity: { type: Number, required: true, default: 0 },
    Use_Instructions: { type: String, required: true },
    Ingredients: [{ type: String }]
});

module.exports = mongoose.model('Product', product_schema, 'Products');