import axios from "axios";

let fromBackUrl = "http://api_rest-back-1:5000";
let fromFrontUrl = "http://localhost:5000";

if (process.env.BACKEND_URL) fromFrontUrl = process.env.BACKEND_URL;

const instance = {
  back: axios.create({
    baseURL: `${fromBackUrl}`,
    withCredentials: true,
  }),
  front: axios.create({
    baseURL: `${fromFrontUrl}`,
    // withCredentials: true,
  }),
};

export default instance;
