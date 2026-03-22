import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import Stars from "../Components/Stars";
import Arrow_Icon from "../Components/Arrow_Icon";
import Product_Gallery from "../Components/Product_Gallery";
import Review_Card from "../Components/Review_Card";
import Quantity_Selector from "../Components/Quantity_Selector";
import Product_Card from "../Components/Product_Card";
import { getProductById, getProductsByCategory } from "../Services/productService";
import { addCartItem, getUserId, isLoggedIn } from "../Services/userService";
import { getProductReviews, createReview } from "../Services/reviewService";
import Add_Review_Modal from "../Components/Add_Review_Modal";

const Product_Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // fetch product on load
  useEffect(() => {
    setLoading(true);
    setError("");

    getProductById(id)
      .then(data => {
        setProduct(data.product);
        setLoading(false);
        return getProductsByCategory(data.product.Category);
      })
      .then(data => {
        const filtered = data.products.filter(p => p._id !== id);
        setRelatedProducts(filtered.slice(0, 6));
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // fetch reviews separately so they load independently
  useEffect(() => {
    getProductReviews(id)
      .then(data => {
        setReviews(data.reviews);
      })
      .catch(err => {
        console.error("Reviews fetch error:", err.message);
      });
  }, [id]); 



  const handleAddReview = async ({ title, body }) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    const userId = getUserId();
    const data = await createReview(id, {
      User_ID: userId,
      Review_Title: title,
      Review_Body: body,
    });
    // add new review to local state so it shows immediately
    setReviews(prev => [...prev, data.review]);
  };

  const handleAddToBag = async () => {
    if (!isLoggedIn()) {
      setCartMessage("Please log in to add items to your bag");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setAddingToCart(true);
    setCartMessage("");

    try {
      const userId = getUserId();
      await addCartItem({
        User_ID: userId,
        Product_ID: id,
        Product_Quantity: quantity,
      });
      setCartMessage("Added to bag!");

      // clear message after 2 seconds
      setTimeout(() => setCartMessage(""), 2000);

    } catch (err) {
      setCartMessage(err.message);
    } finally {
      setAddingToCart(false);
    }
  };

  // loading state
  if (loading) return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-secondary_1 font-display text-h3">Loading product...</p>
      </main>
      <Footer />
    </div>
  );

  // error state
  if (error) return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-pink-600 font-display text-h3">{error}</p>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col px-4 py-6 md:px-10 md:py-8 gap-10">

        {/* Gallery + product info */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-10">

          {/* Gallery */}
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <Product_Gallery
              images={product.Img_Urls || []}
              alt={product.Name}
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-3 w-full lg:w-1/2">

            <div>
              <h1 className="font-display text-primary text-h3 md:text-h2 leading-tight">
                {product.Name}
              </h1>
              <h3 className="font-sans text-primary text-b2 md:text-b1">
                {product.Brand}
              </h3>
            </div>

            <div className="flex flex-row items-center gap-2 flex-wrap">
              <span className="font-sans text-primary text-h4 font-bold">
                ${product.Price}
              </span>
              <Stars rating={product.Rating} size={20} />
              <p className="font-sans text-primary text-b3 opacity-75">
                ({product.Review_Count})
              </p>
            </div>

            <p className="text-primary font-sans text-b2 md:text-b1 w-full lg:w-3/4">
              {product.Description}
            </p>

            <p className="font-sans text-primary text-b2">
              Size: {product.Product_Size}
            </p>

            {/* Cart feedback message */}
            {cartMessage && (
              <p className={`
                text-sm font-display
                ${cartMessage === "Added to bag!"
                  ? "text-green-600"
                  : cartMessage === "Please log in to add items to your bag"
                  ? "text-secondary_1"   // neutral colour for the login prompt
                  : "text-pink-600"      // pink for errors
                }
              `}>
                {cartMessage}
              </p>
            )}

            {/* Quantity + buttons */}
            <div className="flex flex-row flex-wrap items-center gap-4 mt-2">
              <Quantity_Selector
                min={1}
                max={product.Stock_Quantity}
                onChange={(qty) => setQuantity(qty)}
              />
              <Button
                variant="filled"
                onClick={handleAddToBag}
                disabled={addingToCart || product.Stock_Quantity === 0}
                className="px-6 py-2 rounded-lg font-display text-h4"
              >
                {product.Stock_Quantity === 0 ? "Out of Stock" : addingToCart ? "Adding..." : "Add to Bag"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}  // ← goes back to previous page
                className="px-6 py-2 rounded-lg font-display text-h4"
              >
                Go Back
              </Button>
            </div>

          </div>
        </div>

        {/* About Product dropdown */}
        <div className="flex flex-col border-t border-zinc-200 pt-4">
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            className="flex flex-row items-center gap-2 w-fit hover:opacity-70 transition-opacity duration-150"
          >
            <h2 className="font-display text-primary text-h3 font-bold">About Product</h2>
            <span className={`text-primary transition-transform duration-300 ${aboutOpen ? "rotate-180" : "rotate-0"}`}>
              <Arrow_Icon />
            </span>
          </button>

          {aboutOpen && (
            <div className="flex flex-col gap-6 mt-6 md:flex-row md:gap-10">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <h3 className="font-display text-primary text-h4 font-bold underline">Ingredients</h3>
                <ul className="flex flex-col gap-1">
                  {product.Ingredients?.map((ingredient, index) => (
                    <li key={index} className="font-sans text-primary text-b2">
                      - {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <h3 className="font-display text-primary text-h4 font-bold underline">How To</h3>
                <p className="font-sans text-primary text-b2 leading-relaxed">
                  {product.Use_Instructions}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Reviews dropdown */}
        <div className="flex flex-col border-t border-zinc-200 pt-4">
          <button
            onClick={() => setReviewsOpen(!reviewsOpen)}
            className="flex flex-row items-center gap-2 w-fit hover:opacity-70 transition-opacity duration-150"
          >
            <h2 className="font-display text-primary text-h3 font-bold">Reviews</h2>
            <span className={`text-primary transition-transform duration-300 ${reviewsOpen ? "rotate-180" : "rotate-0"}`}>
              <Arrow_Icon />
            </span>
          </button>

          {reviewsOpen && (
            <div className="flex flex-col gap-6 mt-6">

              {/* No reviews state */}
              {reviews.length === 0 && (
                <p className="text-secondary_1 font-display text-b1">
                  No reviews yet — be the first!
                </p>
              )}

              {/* Review cards */}
              <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
                {reviews.map(review => (
                  <Review_Card
                    key={review._id}
                    userName={review.User_ID?.Username || "Anonymous"}
                    reviewTitle={review.Review_Title}   // ← add this
                    reviewDate={new Date(review.Review_Date).toLocaleDateString()}
                    content={review.Review_Body}
                    className="w-full md:w-[calc(50%-0.5rem)]"
                  />
                ))}
              </div>

              {/* Add review button */}
              <div className="flex justify-center">
                <Button
                  variant="filled"
                  onClick={() => setReviewModalOpen(true)}
                  className="px-10 py-3 rounded-xl text-h4"
                >
                  Add a Review
                </Button>
              </div>

            </div>
          )}
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-primary text-h3 text-center">
              You Might Also Like:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {relatedProducts.map(product => (
                <Product_Card
                  key={product._id}
                  productId={product._id}
                  image={product.Img_Urls?.[0]}
                  brand={product.Brand}
                  name={product.Name}
                  price={product.Price}
                  rating={product.Rating}
                  reviewCount={product.Review_Count}
                  stock={product.Stock_Quantity}
                />
              ))}
            </div>
          </div>
        )}

      </main>
      
      <Add_Review_Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleAddReview}
      />

      <Footer />
    </div>
  );
};

export default Product_Detail;