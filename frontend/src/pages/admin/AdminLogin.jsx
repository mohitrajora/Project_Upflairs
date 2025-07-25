import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://project-upflairs.onrender.com/admin/login",
                formData
            );
            const { jwtToken, userData } = res.data.data;

            localStorage.setItem("token", jwtToken);
            localStorage.setItem("user", JSON.stringify(userData));

            toast.success("Login successful!");

            if (userData.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Admin Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
