import axios, { AxiosInstance } from 'axios';
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

const api = axios.create({
  baseURL: 'http://localhost:3000', //to-do: alterar depois, só funciona enquanto rodar docker localmente
});

applyAuthInterceptor(api);

export default api;