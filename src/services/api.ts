// filepath: src/services/api.ts
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage ou de outro lugar
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
