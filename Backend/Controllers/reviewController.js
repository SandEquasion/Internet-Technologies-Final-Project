const Order = require('../Models/Order.js');
const Product = require('../Models/Product.js');
const User = require('../Models/User.js');
const Review = require('../Models/Review.js');

const Delete_Review_By_ID = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({message: "Review record succesfully removed"});
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Get_Reviews_By_Product = async (req, res) => {
  try {
    const reviews = await Review.find({ Product_ID: req.params.id })
      .populate('User_ID', 'Username');  // ← fetches Username from User collection
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Create_Review = async (req, res) => {
  try {
    const { User_ID, Review_Title, Review_Body } = req.body;

    const newReview = new Review({
      Product_ID: req.params.id,
      User_ID,
      Review_Title,
      Review_Body,
      Review_Date: new Date(),
    });

    const savedReview = await newReview.save();
    res.status(201).json({ review: savedReview });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {Delete_Review_By_ID, Create_Review, Get_Reviews_By_Product}