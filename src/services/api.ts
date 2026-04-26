import axios from "axios";

// Sesuaikan dengan port Flask kamu
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // WAJIB: Supaya session cookie kesimpen di browser
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor buat debugging (Optional tapi ngebantu banget)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Kalau 401 (Unauthorized) pas manggil /me, biarkan ditangani di App.tsx/Page
    return Promise.reject(error);
  }
);