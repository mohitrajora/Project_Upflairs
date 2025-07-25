import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/user", 
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const getAllUsers = () => API.get("/getAllUser");
export const deleteUser = (token) =>
  API.delete("/userDelete", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
