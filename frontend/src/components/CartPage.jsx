import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="py-10 px-4 md:px-20 bg-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-lg">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item, index) => (
                        <div key={index} className="border-b pb-4 flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">{item.title}</h4>
                                <p className="text-green-600 font-bold">₹ {item.price}</p>
                            </div>
                            <button
                                className="text-sm text-red-600 hover:underline"
                                onClick={() => removeFromCart(item)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartPage;
