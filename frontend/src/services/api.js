import axios from 'axios';

// Use your Azure back-end domain here
const instance = axios.create({
  baseURL: 'https://video-sharing-backend-ewgnfnepbcamg3bq.uksouth-01.azurewebsites.net/api', 
});

// Attach token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
