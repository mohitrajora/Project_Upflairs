import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProducts();
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10 px-4 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative group border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105"
            data-aos="fade-up"
          >
            {/* Badge */}
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                New
              </span>
            )}
            {product.onSale && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                Sale
              </span>
            )}

            {/* Image */}
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-64 object-cover transition duration-300 ease-in-out group-hover:opacity-90"
            />

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="text-green-600 text-lg font-bold group-hover:text-green-700 transition">
                ₹ {product.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`🛒 "${product.title}" added to cart!`, {
                    duration: 3000,
                    style: {
                      borderRadius: "8px",
                      background: "#333",
                      color: "#fff",
                      fontWeight: "500",
                    },
                    iconTheme: {
                      primary: "#4ADE80",
                      secondary: "#fff",
                    },
                  });
                }}
                className="mt-auto inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
