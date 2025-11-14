import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../../../constants/url';
import { AuthService } from './auth.service';

// envia o token na req
export function applyAuthInterceptor(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.request.use(
    async (config) => {
      const token = await AuthService.getAuthToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        AuthService.notifyTokenExpired();
      }

      return Promise.reject(error);
    }
  );
}

// método genérico para mandar a req com token
export function createApiInstance(serviceName: string): AxiosInstance {
  // const baseURL = getApiUrl(serviceName);
  const baseURL = API_URL;

  const api = axios.create({ baseURL });

  applyAuthInterceptor(api);

  return api;
}