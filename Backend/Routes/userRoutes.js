const express = require('express');
const router = express.Router();

// route to return a user based on their ID
const { Get_User_By_ID } = require('../Controllers/userController');
router.get('/:id', Get_User_By_ID);

//route to increment an item in the user's cart
const {Increment_Cart_Item} = require('../Controllers/userController');
router.put('/increm/', Increment_Cart_Item);

//route to decrement an item in the user's cart
const {Decrement_Cart_Item} = require('../Controllers/userController');
router.put('/decrem/', Decrement_Cart_Item);

//route to create a new user
const {Create_User} = require('../Controllers/userController');
router.post('/create/', Create_User);

//route to login a user
const {Login_User} = require('../Controllers/userController');
router.put('/login/', Login_User);

//route to log-out a user
const {Log_Out_User} = require('../Controllers/userController');
router.put('/logout/:id', Log_Out_User);

//route to delete a user
const {Delete_User_By_ID} = require('../Controllers/userController');
router.delete('/delete/:id', Delete_User_By_ID);

//route to update a user attribute outside of cart
const {Update_User} = require('../Controllers/userController');
router.put('/:id', Update_User);

//route to add an item to the user's cart
const {Add_Cart_Item} = require('../Controllers/userController');
router.put('/', Add_Cart_Item);

//route to remove an item from the user's cart
const {Remove_Cart_Item} = require('../Controllers/userController');
router.delete('/', Remove_Cart_Item);

//route to clear a user's cart
const {Clear_Cart} = require('../Controllers/userController');
router.delete('/:id', Clear_Cart);

module.exports = router;