import axios from 'axios';
import { AuthSession } from './auth.service';

const api = axios.create({
  baseURL: 'http://localhost:3000', //to-do: alterar depois, só funciona enquanto rodar docker localmente
});

// método padrão de api para enviar token de autenticação nas requisições
api.interceptors.request.use(
  async (config) => {
    const user = await AuthSession.getLoggedUser();
    
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;