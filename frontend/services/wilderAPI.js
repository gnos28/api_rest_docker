import axios from "axios";

let baseUrl = "http://172.21.0.2:5000";

if (process.env.BACKEND_URL) baseUrl = process.env.BACKEND_URL;

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

export default instance;
