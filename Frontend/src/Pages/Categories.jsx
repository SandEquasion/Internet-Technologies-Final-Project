import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Input_Field from "../Components/Input_Field";
import CategoryCard from "../Components/Category_Card";
import { getAllCategories } from "../Services/productService";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCategories()
      .then(data => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // filter categories based on search
  const filteredCategories = categories.filter(item =>
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col px-4 py-6 md:px-10 md:py-8 gap-6">

        {/* Top bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-secondary_1 font-display text-h2">
            Categories
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

        {/* Loading state */}
        {loading && (
          <p className="text-secondary_1 font-display text-h4 text-center py-20">
            Loading categories...
          </p>
        )}

        {/* Error state */}
        {error && (
          <p className="text-secondary_1 font-display text-h4 text-center py-20">
            {error}
          </p>
        )}

        {/* Categories grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredCategories.map(item => (
              <CategoryCard
                key={item.category}
                image={item.image}
                category={item.category}
                onClick={() => navigate(`/categories/products/${item.category}`, {
                  state: { categoryName: item.category }
                })}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredCategories.length === 0 && (
          <p className="text-secondary_1 font-display text-h3 text-center py-20">
            No categories found
          </p>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Categories;