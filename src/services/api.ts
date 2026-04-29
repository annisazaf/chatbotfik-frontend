import axios from "axios";

const TOKEN_KEY = "chatbotfik_token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// AUTO KIRIM TOKEN KE SEMUA REQUEST
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});