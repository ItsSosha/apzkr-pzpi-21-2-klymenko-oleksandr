import axios from "axios";
import { auth } from "./firebase";

let idToken: string | null = null;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const authState = auth.currentUser;
      if (authState) {
        try {
          idToken = await authState.getIdToken(true);
          error.config.headers.Authorization = `Bearer ${idToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

auth.onAuthStateChanged(async (authState) => {
  idToken = authState ? await await authState.getIdToken() : null;
});
