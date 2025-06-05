import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_PRODUCTION_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
  credentials:'include'
  // ...other configs
});

export default api;
