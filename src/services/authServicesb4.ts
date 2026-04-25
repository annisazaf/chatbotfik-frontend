import { api } from "./api";

// Interface biar TypeScript nggak marah
export interface UserData {
  nim: string;
  nama: string;
  email: string;
}

export interface RegisterRequest extends UserData {
  password: string;
}

export const authService = {
  // REGISTER: POST /api/register
  register: async (data: RegisterRequest) => {
    const response = await api.post("/register", data);
    return response.data;
  },

  // LOGIN: POST /api/login
  // Kita kirim { nim, password } sesuai yang diminta Flask
  login: async (nim: string, pass: string) => {
    const response = await api.post("/login", { 
      nim: nim, 
      password: pass 
    });
    return response.data;
  },

  // GET ME: GET /api/me
  // Buat ngecek apakah user masih login atau nggak
  getMe: async () => {
    const response = await api.get<UserData>("/me");
    return response.data;
  },

  // LOGOUT: POST /api/logout
  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  }
};