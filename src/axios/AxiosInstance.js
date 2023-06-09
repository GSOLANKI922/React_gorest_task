import axios from "axios";

const Token = localStorage.getItem("Token");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Authorization: Token,
    // Add any other headers you need
  },
});

// You can also add interceptors to the instance if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Perform any request preprocessing or add headers
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
