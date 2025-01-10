// axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://192.168.1.5:3000",
  baseURL: "https://tesst-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//     config => {
//         const token = 'your_token_here';
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// // Thêm interceptor cho response
// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         // Xử lý lỗi chung như token hết hạn hoặc lỗi kết nối
//         if (error.response && error.response.status === 401) {
//             console.log('Unauthorized! Redirecting to login...');
//             // Xử lý ví dụ: điều hướng người dùng đến trang đăng nhập
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
