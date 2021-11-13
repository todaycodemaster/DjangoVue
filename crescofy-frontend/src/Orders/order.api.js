import { API_URL, authHeader } from '@/Core/helpers/utils';
import axios from 'axios';

const RESOURCE_URL = `${API_URL}/api/v1/orders/`;

export default {
  get(token, params) {
    return axios.get(RESOURCE_URL, {
      params,
      headers: authHeader(token)
    });
  },
  metrics(token, params) {
    return axios.head(RESOURCE_URL, {
      params,
      headers: authHeader(token)
    });
  }
}
