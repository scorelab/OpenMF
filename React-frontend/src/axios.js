import axios from 'axios';

const URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.defaults.headers['Access-Control-Allow-Origin'] = '*';

export default axiosInstance;
