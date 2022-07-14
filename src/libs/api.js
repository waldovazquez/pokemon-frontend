import axios from 'axios';

import {
  getSessionStorage,
} from '../utils/storage';

import {
  API_URL,
} from '../utils/constants';

function getToken() {
  return getSessionStorage('x-access-token');
}

const api = axios.create({
  baseURL: `${API_URL}`,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
