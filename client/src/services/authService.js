// import axios from 'axios'

// const API_BASE = 'http://localhost:5000/api';

// export const loginUser = async (credentials) => {
//     try{
//         const response = await axios.post(`${API_BASE}/auth/login`, credentials);
//         const token = response.data.token;
//         const user = response.data.user;
//         localStorage.setItem('token', token);
//         localStorage.setItem('user',JSON.stringify(user));
//         return response.data;
//     } catch(err){
//         console.log("Server Error", err);
//     }
// }

// export const registerUser = async (credentials) => {
//     try{
//         const res = await axios.post(`${API_BASE}/auth/register`, credentials);
         
//     } catch(err){
//         console.log("Register error in authService", err);
//     }
// }

// export const getToken = () => {
//     return localStorage.getItem('token')
// }

// import api from './api'; // Import the centralized axios instance

// /**
//  * Calls the login endpoint.
//  * @param {object} credentials - { email, password }
//  * @returns {Promise<object>} - The response data { success, token, user }
//  */
// export const loginUser = async (credentials) => {
//     try {
//         const { data } = await api.post('/auth/login', credentials);
//         return data;
//     } catch (error) {
//         // Re-throw the error so the UI component (LoginPage) can catch it
//         // and display a message to the user.
//         throw error.response?.data || { message: 'An unknown error occurred' };
//     }
// };

// /**
//  * Calls the register endpoint.
//  * @param {object} userData - { username, email, password }
//  * @returns {Promise<object>} - The response data { success, token, user }
//  */
// export const registerUser = async (userData) => {
//     try {
//         const { data } = await api.post('/auth/register', userData);
//         return data;
//     } catch (error) {
//         throw error.response?.data || { message: 'An unknown error occurred' };
//     }
// };

// /**
//  * Calls the /me endpoint to verify the current user's token.
//  * @returns {Promise<object>} - The response data { success, data: user }
//  */
// export const verifyUser = async () => {
//     try {
//         const { data } = await api.get('/auth/me');
//         return data;
//     } catch (error) {
//         throw error.response?.data || { message: 'An unknown error occurred' };
//     }
// };

import api from './api';

export const loginUser = async (credentials) => {
    try {
        const { data } = await api.post('/auth/login', credentials);
        return data;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occurred' };
    }
};

export const registerUser = async (userData) => {
    try {
        const { data } = await api.post('/auth/register', userData);
        return data;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occurred' };
    }
};

export const verifyUser = async () => {
    try {
        const { data } = await api.get('/auth/me');
        return data;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occurred' };
    }
};