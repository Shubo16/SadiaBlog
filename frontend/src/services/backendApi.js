import axios from "axios";

export const BASE_URL = "https://sadiablog.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials:true
  // ...other configs
});

export default api;
