import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.20.35:5185/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
