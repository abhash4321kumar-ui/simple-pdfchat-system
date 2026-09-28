import api from './axiosInstance';

export const Signupfnc = async (formData) => {
    return await api.post('/api/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
    });
};

export const Loginfnc = async (email, password) => {
    return await api.post('/api/login', { email, password });
};

export const Logoutfnc = async () => {
    return await api.get('/api/logout');
};

export const Getuserfnc = async () => {
    return await api.get('/api/user');
};

export const Uploadpdffnc = async (formData) => {
    return await api.post('/api/upload-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const GoogleSignupfnc = async (userData) => {
    return await api.post('/api/google-signup', userData);
};

export const GoogleLoginfnc = async (email) => {
    return await api.post('/api/google-login', { usermail: email });
};

export const ChatWithPdffnc = async (message) => {
    return await api.post('/api/chatwith-pdf', { usermessage: message });
};

export const GetChatHistoryfnc = async () => {
    return await api.get('/api/chat-history');
};
