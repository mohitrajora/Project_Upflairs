import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Auth context wraps everything */}
      <CartProvider>
        <Toaster position="top-right" />
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
