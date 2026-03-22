const mongoose = require('mongoose');

const user_schema = new mongoose.Schema( {
    Username: {type: String, required: true, unique: true},
    Email: {type: String, lowercase: true, required: true, unique: true},
    Password_Hash: {type: String, required: true},
    Token: {type: String, required: true},
    Cart: [{
            Product_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            Product_Name: {type: String},
            Product_Price: {type: Number},
            Product_Quantity: {type: Number},
            Product_Image: { type: String },       
            Product_Description: { type: String },
            Product_Stock: { type: Number }
        }]
});

module.exports = mongoose.model('User', user_schema, 'Users');