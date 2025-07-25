import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/product/product-get-all");
            console.log("Fetched data:", res.data);
            setProducts(res.data.data || []);
        } catch (err) {
            console.error("Error fetching products", err);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:5000/product/product-delete/${productId}`);
            toast.success("Product deleted!");
            setProducts((prev) => prev.filter((p) => p._id !== productId));
        } catch (err) {
            console.error("Error deleting product", err);
            toast.error(err.response?.data?.message || "Failed to delete product");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Manage & Delete Products
            </h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">No products available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border p-4 rounded-md shadow-sm hover:shadow-lg transition"
                        >
                            <img
                                src={`http://localhost:5000/uploads/${product.image}`}
                                alt={product.title}
                                className="w-full h-40 object-cover mb-4 rounded"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                            <p className="text-gray-600 mb-1">₹{product.price}</p>
                            <p className="text-sm text-gray-500 truncate">
                                {product.description || "No description available"}
                            </p>
                            <button
                                onClick={() => deleteProduct(product._id)}
                                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeleteProduct;
