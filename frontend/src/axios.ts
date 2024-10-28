import axios from "axios";
import { getCookie } from "./cookies";

const instance = axios.create({
  baseURL: "http://localhost:4444/",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookie("token")}`;
  return config;
});

export default instance;
