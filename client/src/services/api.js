import axios from 'axios';

const baseURL = import.meta.env.DEV
    ? '/api/v1'
    : `${import.meta.env.VITE_API_URL}/api/v1`;

const api = axios.create({
    baseURL,
    // include credentials if you later use cookies; safe to enable for dev/prod
    withCredentials: true,
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