import React from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);

    toast.success(
      `🛒 "${product.name}" has been added to your cart!`,
      {
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#4ADE80", // Tailwind green-400
          secondary: "#fff",
        },
      }
    );
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
