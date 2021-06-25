import axios from 'axios';
import { API_URL, API_TIMEOUT } from '../contans';

const instance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});

instance.interceptors.request.use(
  (config) => {
    console.log('Sending request...');
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    console.log('getting request...');
    return response;
  },
  (error) => Promise.reject(error),
);

export default instance;
