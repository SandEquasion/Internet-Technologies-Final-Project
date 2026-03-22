const Order = require('../Models/Order.js');
const Product = require('../Models/Product.js');
const User = require('../Models/User.js');
const Review = require('../Models/Review.js');
const crypto = require("crypto");

//Creates a user
const Create_User = async (req, res) => {
    try {
        const {Username, Email, Password_Hash } = req.body;

        //generates a unique, random token and updates the user's token in the database

        //create the user
        const newUser = new User({
            Username,
            Email,
            Token: crypto.randomBytes(32).toString("hex"),
            Cart: [],
            Password_Hash
        });

        //save the new user
        const savedUser = await newUser.save();
        res.status(201).json({user: savedUser});   
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Deletes a user based on their's ID
const Delete_User_By_ID = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({message: "User record succesfully removed"});
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update's an attribute of a user except the cart
const Update_User = async (req, res) => {
    try {
        const User_ID = req.params.id;
        const updates = req.body;

        //returns the document after the change and ansures that the schema is adhered to
        const updatedUser = await User.findByIdAndUpdate(
            User_ID, 
            updates, 
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Update successful",
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const Add_Cart_Item = async (req, res) => {
    try { 
        const {User_ID, Product_ID, Product_Quantity} = req.body;
        const user = await User.findById(User_ID);
        const product = await Product.findById(Product_ID);

        //ensures that the product and users are real
        if (!user){return res.status(404).json({message: "User not found"})};
        if (!product){return res.status(404).json({message: "Product not found"})};

        // ← add this check
        if (product.Stock_Quantity === 0) {
        return res.status(400).json({ message: "This product is out of stock" });
        }

        // ← also check if requested quantity exceeds stock
        if (Product_Quantity > product.Stock_Quantity) {
        return res.status(400).json({ 
            message: `Only ${product.Stock_Quantity} items available` 
        });
        }

        const existingCartItem = user.Cart.find((item) => item.Product_ID.toString() === Product_ID);
        
        //checks if the product is already in the user's cart. If it is then it adds the quantity to that if not then it creates a new cart item
         if (existingCartItem) {
            // ← check combined quantity against stock
            const newTotalQuantity = existingCartItem.Product_Quantity + parseInt(Product_Quantity, 10);
            if (newTotalQuantity > product.Stock_Quantity) {
                return res.status(400).json({
                message: `Only ${product.Stock_Quantity} items available. You already have ${existingCartItem.Product_Quantity} in your bag`
                });
            }
            existingCartItem.Product_Quantity = newTotalQuantity;
            } 
            else {
            if (parseInt(Product_Quantity, 10) > product.Stock_Quantity) {
                return res.status(400).json({
                message: `Only ${product.Stock_Quantity} items available`
                });
            }
            user.Cart.push({
                Product_ID,
                Product_Name: product.Name,
                Product_Price: product.Price,
                Product_Quantity,
                Product_Image: product.Img_Urls?.[0],
                Product_Description: product.Description,
                Product_Stock: product.Stock_Quantity
            });
        }

        await user.save();
        res.status(200).json({message: "Item added to cart successfully", cart: user.Cart});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Remove_Cart_Item = async (req, res) => {
    try {
        const {User_ID, Product_ID} = req.body;
        const user = await User.findById(User_ID);
        const product = await Product.findById(Product_ID);

        //ensures that the product and users are real
        if (!user){return res.status(404).json({message: "User not found"})};
        if (!product){return res.status(404).json({message: "Product not found"})};

        const existingCartItem = user.Cart.find((item) => item.Product_ID.toString() === Product_ID);

        //checks if the product is in the user's cart. If it is then it removes it, if not it returns a 404
        if (existingCartItem) {
            user.Cart = user.Cart.filter((item) => item.Product_ID.toString() !== Product_ID);
        }
        else {
            return res.status(404).json({message: "Item not found in cart"});
        }

        await user.save();
        res.status(200).json({message: "Item removed from cart successfully", cart: user.Cart});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Clear_Cart = async (req, res) => {
  try {
    const User_ID  = req.params.id;

    // checks if the user exists
    const user = await User.findById(User_ID);
    if (!user) {return res.status(404).json({message: "User not found.",});}

    //checks if the cart is already empty
    if (user.Cart.length === 0) {
        return res.status(200).json(
            {
                message: "Cart is already empty.",
                cart: []
            }
        );
    }

    //if the cart isn't empty then clear it and save
    user.Cart = [];
    await user.save();

    return res.status(200).json({message: "Cart cleared successfully.", cart: user.Cart,});
  } 
  catch (error) {return res.status(500).json({message: "Internal server error.",});
  }
};

const Increment_Cart_Item = async (req, res) => {
    try {
        const {User_ID, Product_ID} = req.body;
        const user = await User.findById(User_ID);
        const product = await Product.findById(Product_ID);

        //ensures that the product and user are real
        if (!user){return res.status(404).json({message: "User not found"})};
        if (!product){return res.status(404).json({message: "Product not found"})};

        const existingCartItem = user.Cart.find((item) => item.Product_ID.toString() === Product_ID);

        //checks if the product is in the user's cart. If it is then it increments the quantity by 1
        if (existingCartItem) {
            // ← check against stock before incrementing
            if (existingCartItem.Product_Quantity >= product.Stock_Quantity) {
                return res.status(400).json({
                message: `Maximum available stock is ${product.Stock_Quantity}`
                });
            }
            existingCartItem.Product_Quantity += 1;
            } else {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        await user.save();
        res.status(200).json({message: "Item quantity incremented successfully", cart: user.Cart});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Decrement_Cart_Item = async (req, res) => {
    try {
        const {User_ID, Product_ID} = req.body;
        const user = await User.findById(User_ID);
        const product = await Product.findById(Product_ID);

        //ensures that the product and user are real
        if (!user){return res.status(404).json({message: "User not found"})};
        if (!product){return res.status(404).json({message: "Product not found"})};

        const existingCartItem = user.Cart.find((item) => item.Product_ID.toString() === Product_ID);

        //checks if the product is in the user's cart. If it is then it decrements the quantity by 1.
        //if the quantity reaches 0, the item is removed from the cart entirely
        if (existingCartItem) {
            if (existingCartItem.Product_Quantity > 1) {
                existingCartItem.Product_Quantity -= 1;
            }
            else{
                user.Cart = user.Cart.filter((item) => item.Product_ID.toString() !== Product_ID);
            }
        }
        else{
            return res.status(404).json({message: "Item not found in cart"})
        }

        await user.save();
        res.status(200).json({message: "Item quantity decremented successfully", cart: user.Cart});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Logs a user in, and assigns them a unique token
const Login_User = async (req, res) => {
    try {
        const {Username, Password_Hash} = req.body;

        //ensures that the username and password are provided
        if (!Username || !Password_Hash){return res.status(400).json({message: "Username and Password are required"})};

        const user = await User.findOne({Username});

        //ensures that the user exists and that the password matches
        if (!user){return res.status(404).json({message: "User not found"})};
        if (user.Password_Hash !== Password_Hash){return res.status(401).json({message: "Invalid credentials"})};

        //Checks if the user is already logged in 
        if (user.Token !== " "){return res.status(404).json({message: "User already logged in"})};

        //generates a unique, random token and updates the user's token in the database
        const newToken = crypto.randomBytes(32).toString("hex");
        user.Token = newToken;

        await user.save();
        res.status(200).json({message: "Login successful", Token: user.Token, userId: user._id });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Logs a user out, and removes their token as proof of log out
const Log_Out_User = async (req, res) => {
    try {
        const User_ID = req.params.id;
        const user = await User.findById(User_ID);

        //ensures that the user exists and if they're already logged out
        if (!user){return res.status(404).json({message: "User not found"})};
        if (user.Token === " "){return res.status(404).json({message: "User already logged out"})};


        //removes the user's token as proof of log out
        user.Token = " ";
        await user.save();
        res.status(200).json({message: "Log-Out successful", Token: user.Token});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Get_User_By_ID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    Update_User, 
    Add_Cart_Item, 
    Remove_Cart_Item, 
    Clear_Cart, 
    Increment_Cart_Item, 
    Decrement_Cart_Item, 
    Create_User,
    Delete_User_By_ID,
    Login_User,
    Log_Out_User,
    Get_User_By_ID
};