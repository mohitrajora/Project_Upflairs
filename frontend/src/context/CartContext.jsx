import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === product._id);
            if (existing) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.success(`🛒 "${product.title}" added to cart`);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (product) => {
        setCartItems((prev) => prev.filter((item) => item._id !== product._id));
    };

    const increaseQuantity = (productId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item._id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        toast.success("🧹 Cart cleared!");
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
