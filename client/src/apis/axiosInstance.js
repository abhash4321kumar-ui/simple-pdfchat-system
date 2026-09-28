import axios from 'axios';

// Single shared axios instance. Every API call in the app goes through this,
// so base URL / credentials / interceptors only ever need to change in one place.
const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

export default api;
