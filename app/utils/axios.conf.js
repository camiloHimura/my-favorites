const axios = require('axios');
const port = 8082;

const config = {
  port,
  url: process.env.API_URL || `http://localhost:${port}/api`
}

const instance = axios.create({
  baseURL: config.url,
  timeout: 1000,
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

module.exports = instance;
