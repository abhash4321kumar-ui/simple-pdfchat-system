import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_SIDE_URL,
    withCredentials: true,
});

export default api;
