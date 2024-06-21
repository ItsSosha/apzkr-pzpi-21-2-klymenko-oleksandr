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

auth.onAuthStateChanged(async (authState) => {
  idToken = authState ? await await authState.getIdToken() : null;
});
