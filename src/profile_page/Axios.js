import axios from "axios";
import {API_URL} from "../config/index"

const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  },
});

export default AxiosInstance;
