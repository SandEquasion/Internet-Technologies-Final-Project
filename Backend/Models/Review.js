const mongoose = require('mongoose');

const review_schema= new mongoose.Schema({
    Product_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    User_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    Review_Title: {type: String, required: true},
    Review_Body: {type: String, required: true},
    Review_Date: {type: Date, required: true}
});

module.exports=mongoose.model('Review', review_schema, 'Reviews');