import axios from 'axios';
import API from '../config/modeConfig';

const api = axios.create({
  baseURL: API,
});

api.interceptors.response.use((res) => res.data);

export default api;
