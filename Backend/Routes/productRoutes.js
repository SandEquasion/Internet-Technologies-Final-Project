//product routes
const express = require('express');
const router = express.Router();

// route to get all products
const {Get_All_Products} = require('../Controllers/productController');
router.get('/', Get_All_Products)

// route to get all product categories
const {Get_All_Categories} = require('../Controllers/productController')
router.get('/categories', Get_All_Categories);

const{Get_Products_By_Category} = require('../Controllers/productController')
router.get('/category/:category', Get_Products_By_Category);

// route to get single product
const {Get_Product_By_ID} = require('../Controllers/productController');
router.get('/:id', Get_Product_By_ID);       

//route to update a product field
const {Update_Product} = require('../Controllers/productController');
router.put('/:id', Update_Product);

//route to create a product 
const {Create_Product} = require('../Controllers/productController');
router.post('/', Create_Product);

//route to delete a product 
const {Delete_Product_By_ID} = require('../Controllers/productController');
router.delete('/', Delete_Product_By_ID);
module.exports = router;