import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const renderLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-500 transition">Home</Link>
      <Link to="/products" className="hover:text-blue-500 transition">Products</Link>
      <a href="#contact" className="hover:text-blue-500 transition">Contact</a>

      {user ? (
        <>
          {user.role === "admin" && (
            <Link to="/admin/dashboard" className="hover:text-blue-500 transition">
              Admin Dashboard
            </Link>
          )}
          <span className="text-gray-600">Hi, {user.firstName || user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
          <Link to="/signup" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Sign Up
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-gray-800">
          <Link to="/">Fashion Store</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 items-center">
          {renderLinks()}
        </div>

        {/* Cart + Hamburger */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h11L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 text-gray-700">
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
