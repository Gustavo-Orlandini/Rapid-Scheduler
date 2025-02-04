import axios from "axios";

// URL base da API vindo do .env
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
    throw new Error("A variável VITE_API_BASE_URL não está definida no .env");
}

// Configuração do Axios
const apiClient = axios.create({
    baseURL, // Usa a URL do .env
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
