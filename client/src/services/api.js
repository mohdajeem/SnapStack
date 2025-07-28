// import axios from 'axios';

// // Use an environment variable for your API base URL
// // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';


// const api = axios.create({
//     baseURL: API_BASE_URL,
// });

// // Interceptor to add the JWT token to every outgoing request
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default api;

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;