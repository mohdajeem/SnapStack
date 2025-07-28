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