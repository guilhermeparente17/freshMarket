import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Cart from "../pages/Cart";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default PublicRoutes;
