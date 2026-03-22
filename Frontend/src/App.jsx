import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Categories from './Pages/Categories.jsx';
import Product_Listing from './Pages/Product_Listing.jsx';
import Cart from './Pages/Cart.jsx';
import Product_Detail from './Pages/Product_Detail.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-secondary_1 text-h1 font-display ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories/products/:id" element={<Product_Listing/>} />
          <Route path="/product/:id" element={<Product_Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;