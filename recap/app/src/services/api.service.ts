import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../../../constants/url';
import { AuthService } from './auth.service';

// envia o token na req
export function applyAuthInterceptor(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.request.use(
    async (config) => {
      const user = await AuthService.getLoggedUser();

      if (user?.token) {
        // console.log(user.token);
        config.headers.Authorization = `Bearer ${user.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const message = error.response.data?.error || error.response.data?.message;
        const isTokenExpired = message && (message.includes('auth/id-token-expired') || message.includes('ID token has expired'));

        if (isTokenExpired) {
          console.warn('Firebase ID Token Expirado. Limpando sessão e forçando re-login.');
          
          await AuthService.notifyTokenExpired();
          
          return Promise.reject(error);
        }
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