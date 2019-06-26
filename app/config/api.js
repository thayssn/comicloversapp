import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  validateStatus(status) {
    return status < 300; // Reject only if the status code is greater than or equal to 500
  },
});

export default api;
