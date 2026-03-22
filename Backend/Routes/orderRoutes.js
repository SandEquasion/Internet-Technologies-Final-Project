const express = require('express');
const router = express.Router();

//route to return a specific order based on it's ID
const { Print_Order_By_ID} = require('../Controllers/orderController');
router.get('/:id', Print_Order_By_ID);

//route to delete a specific order based on it's ID
const { Delete_Order_By_ID } = require('../Controllers/orderController');
router.delete('/:id', Delete_Order_By_ID);

//route to create an order from the user's cart
const { Create_Order_From_Cart } = require('../Controllers/orderController');
router.post('/:id', Create_Order_From_Cart);

module.exports = router;