import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import Product_Card from "../Components/Product_Card";
import { addCartItem, getUserId, isLoggedIn } from "../Services/userService";
import Cart_Confirmation_Modal from "../Components/Cart_Confrimation_Modal";
import { getAllProducts } from "../Services/productService";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState("");

  const handleAddToBag = async (product) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    try {
      const userId = getUserId();
      await addCartItem({
        User_ID: userId,
        Product_ID: product._id,
        Product_Quantity: 1,
      });
      setAddedProduct(product.Name);
      setModalOpen(true);
    } catch (err) {
      console.error("Add to bag error:", err);
    }
  };

  useEffect(() => {
    getAllProducts()
      .then(data => {
        console.log("API response:", data);  // ← add this
        setProducts(data.products);  // ← controller returns { products }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);  // ← empty array means this runs once when the page loads


  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col px-3 py-6 md:px-10 md:py-8 gap-10">

        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center bg-secondary_4 w-full overflow-hidden">
          <div className="flex flex-col gap-2 justify-center w-full lg:w-1/2 min-w-0 px-6 py-8 md:px-12 md:py-10 items-center lg:items-start text-center lg:text-left">
            <h1 className="font-display text-primary text-h2 md:text-h1">
              Vera: Reveal Your Radiance
            </h1>
            <h3 className="font-display text-primary text-h4 md:text-h3">
              Simply Luminous Skincare
            </h3>
            <p className="font-sans text-primary text-b2 md:text-b1">
              Discover a curated collection of premium beauty essentials
              designed to nourish your skin and elevate your daily ritual.
              From hydrating serums to velvet finishes, Vera brings truth
              to beauty.
            </p>
            <Button
              variant="filled"
              onClick={() => navigate("/categories")}
              className="mt-2 text-b1 md:text-h3 px-6 py-2"
            >
              Explore
            </Button>
          </div>

          <div className="w-full lg:w-1/2 h-40 md:h-56 lg:h-[75vh] flex-shrink-0">
            <img
              src="https://i.postimg.cc/D0JpTFhL/hero-img.png"
              alt="Woman holding Luminance serum"
              className="w-full h-full object-cover max-w-full"
            />
          </div>
        </div>

        {/* Featured Products */}
        <div className="flex flex-col gap-6 justify-center items-center">
          <h3 className="font-display text-h2 text-primary text-center">
            Featured Products:
          </h3>

          {/* loading state */}
          {loading && (
            <p className="text-secondary_1 font-display text-h4">
              Loading products...
            </p>
          )}

          {/* error state */}
          {error && (
            <p className="text-secondary_1 font-display text-h4">
              {error}
            </p>
          )}

          {/* products grid - only shows when loaded */}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {products.map(product => (
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
                  onAddToBag={() => handleAddToBag(product)}
                />
              ))}
            </div>
          )}

          {/* empty state */}
          {!loading && !error && products.length === 0 && (
            <p className="text-secondary_1 font-display text-h4">
              No products yet
            </p>
          )}

        </div>

      </main>
          <Cart_Confirmation_Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            productName={addedProduct}
          />
        <Footer />
    </div>
  );
};

export default Home;
