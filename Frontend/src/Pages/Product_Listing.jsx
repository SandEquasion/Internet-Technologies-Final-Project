import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Input_Field from "../Components/Input_Field";
import Product_Card from "../Components/Product_Card";
import { getProductsByCategory } from "../Services/productService";
import { addCartItem, getUserId, isLoggedIn } from "../Services/userService";
import Cart_Confirmation_Modal from "../Components/Cart_Confrimation_Modal";

const Product_Listing = () => {
  const { category } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState("");
  const navigate = useNavigate();

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

  // category name from navigation state, falls back to url param
  const categoryName = location.state?.categoryName || category || "Products";

  useEffect(() => {
    // fetch products whenever the category changes
    setLoading(true);
    setError("");

    getProductsByCategory(categoryName)
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [categoryName]); // ← re-fetches if category changes

  // filter products based on search
  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(search.toLowerCase()) ||
    product.Brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col px-4 py-6 md:px-10 md:py-8 gap-6">

        {/* Top bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-secondary_1 font-display text-h3 md:text-h2">
            {categoryName}
          </h1>
          <div className="flex flex-row gap-2 items-center w-full sm:w-auto">
            <Input_Field
              type="text"
              placeholder="Search..."
              value={search}
              onChange={setSearch}
              className="!w-full sm:!w-64 placeholder:text-secondary_2"
            />
          </div>
        </div>

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
            {filteredProducts.map(product => (
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

        {/* Loading state */}
        {loading && (
          <p className="text-secondary_1 font-display text-h4 text-center py-20">
            Loading products...
          </p>
        )}

        {/* Error state */}
        {error && (
          <p className="text-secondary_1 font-display text-h4 text-center py-20">
            {error}
          </p>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-secondary_1 font-display text-h3 text-center py-20">
            No products found
          </p>
        )}

      </main>

        {/* Confirmation modal */}
      <Cart_Confirmation_Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={addedProduct}
      />

      <Footer />
    </div>
  );
};

export default Product_Listing;