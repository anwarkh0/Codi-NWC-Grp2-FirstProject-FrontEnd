import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4444',
    withCredentials: true
})

export default axiosInstance
