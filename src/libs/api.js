import axios from 'axios';

import {
  getLocalStorage,
} from '../utils/storage';

function getToken() {
  return getLocalStorage('x-access-token');
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
