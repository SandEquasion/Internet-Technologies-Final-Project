import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import Cart_Item from "../Components/Cart_Item";
import Checkout_Card from "../Components/Checkout_Card";
import { createOrderFromCart } from "../Services/orderService";
import {
  getUserById,
  removeCartItem,
  incrementCartItem,
  decrementCartItem,
  clearCart,
  getUserId,
  isLoggedIn
} from "../Services/userService";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch cart on load
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    const userId = getUserId();
    getUserById(userId)
      .then(data => {
        setCartItems(data.user.Cart);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleRemove = async (productId) => {
    try {
      const userId = getUserId();
      const data = await removeCartItem({
        User_ID: userId,
        Product_ID: productId,
      });
      // update local state with the updated cart from backend
      setCartItems(data.cart);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleIncrement = async (productId) => {
    try {
      const userId = getUserId();
      const data = await incrementCartItem({
        User_ID: userId,
        Product_ID: productId,
      });
      setCartItems(data.cart);
    } catch (err) {
      // ← show the stock error message to the user
      setError(err.message);
      // clear error after 3 seconds
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const userId = getUserId();
      const data = await decrementCartItem({
        User_ID: userId,
        Product_ID: productId,
      });
      setCartItems(data.cart);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClearCart = async () => {
    try {
      const userId = getUserId();
      await clearCart(userId);
      setCartItems([]);
    } catch (err) {
      setError(err.message);
    }
  };

  // format cart items for Checkout_Card
  const checkoutItems = cartItems.map(item => ({
    name: item.Product_Name,
    price: item.Product_Price * item.Product_Quantity,
  }));

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col px-4 py-6 md:px-10 md:py-8 gap-6">

        <div className="flex flex-row items-center justify-between">
          <h1 className="text-secondary_1 font-display text-h2">Your Bag</h1>

          {/* Clear cart button - only shows if cart has items */}
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-secondary_1 font-display text-h4 hover:text-secondary_3 transition-colors duration-150"
            >
              Clear Bag
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <p className="text-secondary_1 font-display text-h4 text-center py-20">
            Loading your bag...
          </p>
        )}

        {/* Error state */}
        {error && (
          <p className="text-pink-600 font-display text-h4 text-center py-20">
            {error}
          </p>
        )}

        {/* Cart content */}
        {!loading && !error && (
          <div className="flex flex-col lg:flex-row items-start gap-6">

            {/* Cart items */}
            <div className="flex flex-col gap-4 w-full lg:flex-1">

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20">
                  <p className="text-secondary_1 font-display text-h3 text-center">
                    Your bag is empty
                  </p>
                  <Button variant="filled" onClick={() => navigate("/categories")} className="px-5 py-3 rounded-xl text-sm">
                    Continue Shopping
                </Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <Cart_Item
                    image={item.Product_Image}             
                    brand=""
                    itemName={item.Product_Name}
                    description={item.Product_Description}
                    initialQty={item.Product_Quantity}  
                    maxQty={item.Product_Stock}
                    onRemove={() => handleRemove(item.Product_ID)}
                    onQuantityChange={(qty) => {
                      const current = cartItems.find(i => i.Product_ID === item.Product_ID);
                      if (qty > current.Product_Quantity) {
                        handleIncrement(item.Product_ID);
                      } else {
                        handleDecrement(item.Product_ID);
                      }
                    }}
                  />
                ))
              )}
            </div>

            {/* Checkout card */}
            {cartItems.length > 0 && (
              <div className="w-full lg:w-auto lg:sticky lg:top-8 h-min">
                <Checkout_Card
                  cartItems={checkoutItems}
                  onCheckoutComplete={async () => {
                    try {
                      const userId = getUserId();
                      const data = await createOrderFromCart(userId);
                      setCartItems([]); 
                    } catch (err) {
                      console.error("Checkout error:", err.message);
                    }
                  }}
                />
              </div>
            )}

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Cart;