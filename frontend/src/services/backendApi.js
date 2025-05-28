import axios from "axios";

export const BASE_URL = "https://sadiablog.onrender.com";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL,
  withCredentials:true
  // ...other configs
});

export default api;
