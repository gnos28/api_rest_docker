import axios from "axios";

let backUrl = "http://api_rest-back-1:5000";
let frontUrl = "http://localhost:5000";

if (process.env.BACKEND_URL) baseUrl = process.env.BACKEND_URL;

const instance = {
  back: axios.create({
    baseURL: `${backUrl}/api`,
    withCredentials: true,
  }),
  front: axios.create({
    baseURL: `${frontUrl}/api`,
    withCredentials: true,
  }),
};

export default instance;
