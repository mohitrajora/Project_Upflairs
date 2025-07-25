import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  return (
    <div className="py-10 px-4 md:px-20 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="border-b pb-4 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-green-600 font-bold">₹ {item.price}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded text-lg font-semibold"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded text-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-2xl font-bold">Total: ₹{totalPrice}</h3>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
