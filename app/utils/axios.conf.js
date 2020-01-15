import axios from 'axios';
import { API_URL, API_TIMEOUT} from '../contans';

const instance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});

instance.interceptors.request.use(function (config) {
  console.log("Sending request...")
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  console.log("getting request...")
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance;
