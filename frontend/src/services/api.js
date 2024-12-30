import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://video-sharing-backend-ewgnfnepbcamg3bq.uksouth-01.azurewebsites.net/api',
});

export default instance;
