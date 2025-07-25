// src/api/axios.js
import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ uses env variable
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
