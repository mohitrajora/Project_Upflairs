import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/product`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
