import axios from "../api/axios.js";

export const getAllProducts = async () => {
    try {
        const response = await axios.get("/product-get-all");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
