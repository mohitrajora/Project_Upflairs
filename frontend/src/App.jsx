import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { CartProvider } from "./context/CartContext";
import UserList from "./pages/admin/UserList";
import AddProduct from "./pages/admin/AddProduct";
import DeleteProduct from "./pages/admin/DeleteProduct";


// Check if user is admin
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin";
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="font-sans text-gray-800">
          <Navbar />
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/users"
              element={isAdmin() ? <UserList /> : <div className="p-8 text-center text-red-600 text-xl">Access Denied</div>}
            />
            <Route
              path="/delete-product"
              element={isAdmin() ? <DeleteProduct/> : <div className="p-8 text-center text-red-600 text-xl">Access Denied</div>}
            />
            <Route
              path="/admin/dashboard"
              element={
                isAdmin() ? (
                  <AdminDashboard />
                ) : (
                  <div className="p-8 text-center text-red-600 text-xl">
                    Access Denied
                  </div>
                )
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
