import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData((prev) => ({
                ...prev,
                image: files[0], // use first file
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        const form = new FormData();
        form.append("title", formData.title);
        form.append("price", formData.price);
        form.append("image", formData.image);

        try {
            const res = await axios.post("http://localhost:5000/product/product-create", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Product added!");
            setFormData({ title: "", price: "", image: null });
        } catch (err) {
            toast.error(err.response?.data?.message || "Error adding product");
            console.error(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
