import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.9.142:5000'
})

export default api;