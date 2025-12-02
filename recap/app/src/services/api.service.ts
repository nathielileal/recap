import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../../../constants/url';
import { AuthService } from './auth.service';

// envia o token na req
export function applyAuthInterceptor(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.request.use(
    async (config) => {
      const token = await AuthService.getAuthToken();

      if (token) {
        console.log(token);
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
export function createApiInstance(serviceName: string, applyAuth: boolean = true): AxiosInstance {
  const baseURL = API_URL;

  const api = axios.create({ baseURL });

  if (applyAuth) {
        applyAuthInterceptor(api);
    }

  return api;
}

// envia o userId na req
export async function applyUserIdHeader(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const userId = await AuthService.getAuthIDUser(); 
    
    if (userId) {
        config.headers['x-user-id'] = userId;
    }
    
    return config;
}