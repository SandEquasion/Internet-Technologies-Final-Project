const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./Models/Product'); // Path to your Model
const User = require('./Models/User'); // Path to your Model
const Order = require('./Models/Order'); // Path to your Model
const Review = require('./Models/Review'); // Path to your Model
const connectDB = require('./config/db.js'); // Path to your DB config

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Atlas
connectDB();

const importProductData = async () => {
  try {
    // 3. Clear existing data to avoid duplicates (Optional but recommended)
    //await Product.deleteMany();

    // 4. Create dummy data based on your Image 1 Schema
    const sampleProduct = {
        Name: 'Radiance Burst',
        Description: 'A calming cream for sensitive skin.',
        Price: 24.99,
        Brand: 'Luminaria',
        Img_Url: 'https://example.com/image1.jpg',
        Category: 'Skincare',
        Stock_Quantity: 50,
        Use_Instructions: 'Apply a small amount to clean skin at night.',
        Ingredients: ['Water', 'Lavender Oil', 'Aloe Vera', 'Glycerin'],
        Rating: 4.5,
        Review_Count: 12
      }
    

    // 5. Insert into Atlas
    await Product.insertOne(sampleProduct)

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const importUser = async () => {
  try {
    //assigns an existing product to a variable for referencing
    const existingProduct = await Product.findOne({ Name: 'Radiance Burst' });

    //if the product isn't found then throw and erroa dn exit the program
    if (!existingProduct) {
      console.log('Product not found! Make sure you ran the product seeder first.');
      process.exit(1);
    }

    // 3. Clear existing data to avoid duplicates (Optional but recommended)
    //await Product.deleteMany();

    // 4. Create dummy data based on your Image 1 Schema
    const sampleUser = {
        Username: 'John_Loves_Girls',
        Email: 'johnjef@gmail.com',
        Password_Hash: 'ilikebigbuttsandicannotlie',
        Token: 'qwertyuiop',
        Cart: [{Product_ID: existingProduct._id, 
                Product_Name: existingProduct.Name, 
                Product_Price: existingProduct.Price, 
                Product_Quantity: 1}]
      }
    

    // 5. Insert into Atlas
    await User.create(sampleUser)

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const importOrder = async () => {
  try {
    //assigns an existing product and user to a variable for referencing
    const existingProduct = await Product.findOne({ Name: 'Radiance Burst' });
    const existinngUser = await User.findOne({Username: 'John_Loves_Girls'});

    //if the product isn't found then throw and erroa dn exit the program
    if (!existingProduct) {
      console.log('Product not found! Make sure you ran the product seeder first.');
      process.exit(1);
    }
    if (!existinngUser) {
      console.log('User not found!');
      process.exit(1);
    }

    const orderTotal = (existingProduct.Price * 2);
    // 3. Clear existing data to avoid duplicates (Optional but recommended)
    //await Product.deleteMany();
    
    // 4. Create dummy data based on your Image 1 Schema
    const sampleOrder = {
        User_ID: existinngUser._id,
        Order_Items: [{Product_ID: existingProduct._id, 
                Quantity: 2, 
                Price_At_Purchase: existingProduct.Price}],
        Order_Total: orderTotal,
        Order_Date: new Date(),
      }
    

    // 5. Insert into Atlas
    await Order.create(sampleOrder)

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const importReview = async () => {
  try {
    //assigns an existing product and user to a variable for referencing
    const existingProduct = await Product.findOne({ Name: 'Radiance Burst' });
    const existingUser = await User.findOne({Username: 'John_Loves_Girls'});

    //if the product isn't found then throw and erroa dn exit the program
    if (!existingProduct) {
      console.log('Product not found! Make sure you ran the product seeder first.');
      process.exit(1);
    }
    if (!existingUser) {
      console.log('User not found!');
      process.exit(1);
    }

    // 3. Clear existing data to avoid duplicates (Optional but recommended)
    //await Product.deleteMany();
    
    // 4. Create dummy data based on your Image 1 Schema
    const sampleReview = {
        Product_ID: existingUser._id,
        User_ID: existingUser._id,
        Review_Title: 'Best Product Everrr',
        Review_Body: 'it is literally the bestest product i have ever seen',
        Review_Date: new Date(),
      }
    

    // 5. Insert into Atlas
    await Review.create(sampleReview)

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};
importOrder();