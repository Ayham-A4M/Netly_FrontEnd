import axios from "axios";
const url:string = import.meta.env.VITE_BACK_END_URL;
// Create axios instance
const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
});

export default axiosInstance
