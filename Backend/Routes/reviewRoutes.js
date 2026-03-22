const express = require('express');
const router = express.Router();

//route to return a specific review
const {Get_Reviews_By_Product} = require('../Controllers/reviewController');
router.get('/:id', Get_Reviews_By_Product);

//route to delete a review
const {Delete_Review_By_ID} = require('../Controllers/reviewController');
router.delete('/:id', Delete_Review_By_ID);

//route to create a review
const {Create_Review} = require('../Controllers/reviewController');
router.post('/:id', Create_Review);

module.exports = router;