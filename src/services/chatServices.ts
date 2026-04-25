import {api} from "./api";

export const chatService = {
  // Upload KHS
  uploadKHS: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Axios akan handle boundary-nya
      },
    });
    return response.data;
  },

  // Kirim Pesan Chat
  sendMessage: async (sessionId: string, pesan: string) => {
    const response = await api.post("/chat", {
      session_id: sessionId,
      pesan: pesan,
    });
    return response.data;
  },
};