import axios, { AxiosInstance } from 'axios';
import { getApiUrl } from '../../../lib/utils';
import { AuthService } from './auth.service';

// método padrão de api para enviar token de autenticação nas requisições
export function applyAuthInterceptor(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.request.use(
    async (config) => {
      const user = await AuthService.getLoggedUser();

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

// cria a api com token
export function createApiInstance(serviceName: string): AxiosInstance {
  const baseURL = getApiUrl(serviceName);

  const api = axios.create({ baseURL });

  applyAuthInterceptor(api);

  return api;
}