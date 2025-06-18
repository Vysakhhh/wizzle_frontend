import axios from "axios"
import server_url from "./server_url"

export const axiosInstance=axios.create({
    baseURL:server_url,
  
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);