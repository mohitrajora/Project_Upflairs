import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Optional, for showing alerts

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/user/getAllUser");
            const userList = res.data?.users || res.data?.data || [];
            setUsers(userList);
        } catch (err) {
            console.error("Failed to fetch users", err);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Unauthorized! Login first.");
                return;
            }

            const res = await axios.delete(
                `http://localhost:5000/user/userDelete/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            // Success
            toast.success("User deleted successfully");
            setUsers(users.filter((user) => user._id !== userId));
        } catch (err) {
            console.error("Failed to delete user", err.response || err.message);

            if (err.response?.status === 401) {
                toast.error("Unauthorized. Token missing or invalid");
            } else if (err.response?.status === 403) {
                toast.error("Forbidden. Not enough permissions");
            } else {
                toast.error("Failed to delete user");
            }
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>

            {loading ? (
                <p className="text-gray-500">Loading users...</p>
            ) : users.length > 0 ? (
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Username</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="p-2 border">{user.username}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border capitalize">{user.role}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No users found.</p>
            )}
        </div>
    );
};

export default UserList;
