import axios from "axios";

let baseUrl = "http://api_rest-back-1:5000";

if (process.env.BACKEND_URL) baseUrl = process.env.BACKEND_URL;

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

export default instance;
