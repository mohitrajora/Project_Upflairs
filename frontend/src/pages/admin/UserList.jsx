import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://project-upflairs.onrender.com/user/getAllUser");
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

            await axios.delete(`https://project-upflairs.onrender.com/user/userDelete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("User deleted successfully");
            setUsers(users.filter((user) => user._id !== userId));
        } catch (err) {
            console.error("Failed to delete user", err?.response || err?.message);

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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">User List</h2>

            {loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="w-full table-auto border border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2 capitalize">{user.role}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
