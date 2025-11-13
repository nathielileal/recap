import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { getApiUrl } from '../../../lib/utils';

interface AuthResult {
  success?: boolean;
  token?: string;
  error?: string;
}

const AUTH_URL = getApiUrl('auth');

const translation: { [key: string]: string } = {
  "Firebase: Error (auth/email-already-in-use).": "Este email já está em uso.",
  "Firebase: Error (auth/invalid-email).": "E-mail inválido.",
  "Firebase: Error (auth/invalid-credential).": "E-mail ou senha inválidos. Tente novamente.",
  "Firebase: Error (auth/missing-password).": "Houve um erro ao tentar recuperar sua senha. Tente novamente mais tarde.",
};

const translated = (message: string): string => {
  return translation[message] || message;
};

export const AuthService = {
  async sighUp(data: { email: string; name: string; password: string }): Promise<AuthResult> {
    try {
      const response = await axios.post(`${AUTH_URL}/user/register`, data);

      if (response.status == 201 || response.status == 200) {
        return { success: true };
      }

      return { success: false, error: 'Ocorreu um erro inesperado no cadastro.' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data?.error || error.response?.data?.message;
        const errorMsg = apiError ? translated(apiError) : null;

        return { success: false, error: errorMsg || 'Erro no cadastro. Tente novamente.' };
      }
      return { success: false, error: 'Ocorreu um erro desconhecido.' };
    }
  },

  async signIn(data: { email: string; password: string }): Promise<AuthResult> {
    try {
      const response = await axios.post(`${AUTH_URL}/user/login`, { email: data.email, password: data.password });
      const { token } = response.data;

      await AsyncStorage.setItem('auth_token', token);

      return { success: true, token };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data?.error || error.response?.data?.message;
        const errorMsg = apiError ? translated(apiError) : null;

        return { success: false, error: errorMsg || 'Email ou senha incorretos.' };
      }
      return { success: false, error: 'Ocorreu um erro desconhecido.' };
    }
  },

  async recover(data: { email: string }): Promise<AuthResult> {
    try {
      const response = await axios.post(`${AUTH_URL}/user/recover`, { email: data.email });

      if (response.status == 201 || response.status == 200) {
        return { success: true };
      }

      return { success: false, error: 'Ocorreu um erro inesperado ao tentar enviar o e-mail.' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data?.error || error.response?.data?.message;
        const errorMsg = apiError ? translated(apiError) : null;

        return { success: false, error: errorMsg || 'Não foi possível enviar o e-mail.' };
      }
      return { success: false, error: 'Ocorreu um erro desconhecido.' };
    }
  },

  async getLoggedUser(): Promise<AuthResult | null> {
    const token = await AsyncStorage.getItem('auth_token');

    return token ? { token } : null;
  },

  async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('auth_token');
  },

  async clearSession() {
    await AsyncStorage.removeItem('auth_token');
  }
};