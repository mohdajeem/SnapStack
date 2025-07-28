import api from './api';

export const getAllSessions = async () => {
    try {
        const { data } = await api.get('/sessions');
        return data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch sessions' };
    }
};

export const getSessionById = async (sessionId) => {
    try {
        const { data } = await api.get(`/sessions/${sessionId}`);
        return data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch session' };
    }
};

export const createOrUpdateSession = async (userPrompt, sessionId) => {
    try {
        const payload = { userPrompt, sessionId };
        const { data } = await api.post('/sessions', payload);
        return data;
    } catch (error) {
        throw error.response?.data || { message: 'AI request failed' };
    }
};

export const updateSessionCode = async (sessionId, code) => {
    try {
        console.log(code);
        const { data } = await api.put(`/sessions/${sessionId}`, code);
        return data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to save code' };
    }
}