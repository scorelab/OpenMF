import axios from 'axios';

const URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: URL,
  responseType: 'json'
});

export default axiosInstance;
