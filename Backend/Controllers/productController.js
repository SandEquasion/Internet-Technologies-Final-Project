const Order = require('../Models/Order.js');
const Product = require('../Models/Product.js');
const User = require('../Models/User.js');
const Review = require('../Models/Review.js');

//Updates an existing product field(s) based on input passed in
const Update_Product = async (req, res) => {
  try {
    const productID = req.params.id;
    const updates = req.body;

    const currentProduct = await Product.findById(productID);

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (const key of Object.keys(updates)) {

      if (Array.isArray(updates[key])) {
        const incomingItems = updates[key];
        const existingItems = currentProduct[key] || [];

        // check for duplicates within the incoming array itself
        const incomingSet = new Set(incomingItems);
        if (incomingSet.size !== incomingItems.length) {
          const incomingDuplicates = incomingItems.filter(
            (item, index) => incomingItems.indexOf(item) !== index
          );
          return res.status(400).json({
            message: "Duplicate items found in request",
            duplicates: [...new Set(incomingDuplicates)]
          });
        }

        // check against items already in the database
        const duplicates = incomingItems.filter(item => existingItems.includes(item));
        if (duplicates.length > 0) {
          return res.status(400).json({
            message: "Updated element already present",
            duplicates: duplicates
          });
        }

        // no duplicates found, merge the arrays
        updates[key] = [...existingItems, ...incomingItems];

      } else {
        if (currentProduct[key] === updates[key]) {
          return res.status(400).json({
            message: "Updated element already present",
            field: key
          });
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      updates,
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({
      message: "Update successful",
      data: updatedProduct
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// returns all products
const Get_All_Products = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// returns single product by id
const Get_Product_By_ID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//creates a new product
const Create_Product = async (req, res) => {
  try {
    const { Name, Rating, Review_Count, Description, Price, Brand, Product_Size, Img_Urls, Category, Stock_Quantity, Use_Instructions, Ingredients } = req.body;

    // check for duplicates within the Img_Urls array before creating
    if (Img_Urls && Img_Urls.length > 0) {
      const imgSet = new Set(Img_Urls);
      if (imgSet.size !== Img_Urls.length) {
        const duplicates = Img_Urls.filter(
          (item, index) => Img_Urls.indexOf(item) !== index
        );
        return res.status(400).json({
          message: "Duplicate images found in request",
          duplicates: [...new Set(duplicates)]
        });
      }
    }

    // check for duplicates within the Ingredients array before creating
    if (Ingredients && Ingredients.length > 0) {
      const ingredientSet = new Set(Ingredients);
      if (ingredientSet.size !== Ingredients.length) {
        const duplicates = Ingredients.filter(
          (item, index) => Ingredients.indexOf(item) !== index
        );
        return res.status(400).json({
          message: "Duplicate ingredients found in request",
          duplicates: [...new Set(duplicates)]
        });
      }
    }

    // create the product
    const newProduct = new Product({
      Name,
      Rating,
      Review_Count,
      Description,
      Price,
      Brand,
      Product_Size,
      Img_Urls,      
      Category,
      Stock_Quantity,
      Use_Instructions,
      Ingredients
    });

    // save the new product
    const savedProduct = await newProduct.save();
    res.status(201).json({ product: savedProduct });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Deletes a product based on it's ID
const Delete_Product_By_ID = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.body)

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({message: "Product record succesfully removed"});
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// gets all unique categories with their first product image
const Get_All_Categories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        // group products by category, keep the first image found
        $group: {
          _id: "$Category",
          image: { $first: { $arrayElemAt: ["$Img_Urls", 0] } }
        }
      },
      {
        // rename _id to category for cleaner response
        $project: {
          _id: 0,
          category: "$_id",
          image: 1
        }
      },
      {
        // sort alphabetically
        $sort: { category: 1 }
      }
    ]);

    res.status(200).json({ categories });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Returns products based on their category
const Get_Products_By_Category = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ Category: category });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json({ products });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Update_Product, 
  Create_Product, 
  Delete_Product_By_ID, 
  Get_All_Products, 
  Get_Product_By_ID, 
  Get_All_Categories, 
  Get_Products_By_Category
};