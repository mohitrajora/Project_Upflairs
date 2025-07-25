import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Users Card */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Users</h2>
                    <p>Total registered users: 120</p>
                    <Link
                        to="/users"
                        className="inline-block mt-4 text-blue-600 hover:underline"
                    >
                        View All Users
                    </Link>
                </div>

                {/* Orders Card */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Add Product</h2>
                    <p>Total Products: 15</p>
                    <Link
                        to="/add-product"
                        className="inline-block mt-4 text-blue-600 hover:underline"
                    >
                        Add Product
                    </Link>
                </div>

                {/* Revenue Card */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Delete Product</h2>
                    <p>Product Deleted: 5</p>
                    <Link
                        to="/delete-product"
                        className="inline-block mt-4 text-blue-600 hover:underline"
                    >
                        View Product
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
