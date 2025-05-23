import axios from "axios";

export const BASE_URL = "https://your-render-backend-url.com";

const api = axios.create({
  baseURL: BASE_URL,
  // ...other configs
});

export default api;
