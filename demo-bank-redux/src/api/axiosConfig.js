import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/authSlice';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8070',
  headers: { 'Content-Type': 'application/json' },
});

// Automatically inject Redux token into headers
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

// Automatically logout if backend says token is expired (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;