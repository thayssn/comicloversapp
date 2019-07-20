import axios from 'axios';

import { BASE_URL } from '../config/env_config';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  validateStatus(status) {
    return status < 300; // Reject only if the status code is greater than or equal to 500
  },
});

export default api;
