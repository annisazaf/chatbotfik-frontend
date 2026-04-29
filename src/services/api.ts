import axios from "axios";

const TOKEN_KEY = "chatbotfik_token";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 🔥 AUTO KIRIM TOKEN KE SEMUA REQUEST
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});