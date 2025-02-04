import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error("The variable VITE_API_BASE_URL is not defined in .env");
}

const apiClient = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
