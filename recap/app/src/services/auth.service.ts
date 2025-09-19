import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

interface AuthResult {
  success?: boolean;
  token?: string;
  error?: string;
}

export const AuthService = {
  async sighUp(data: { email: string; name: string; password: string }): Promise<AuthResult> {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, data);

      if (response.status == 201) {
        return { success: true };
      }

      return { success: false, error: 'Ocorreu um erro inesperado no cadastro.' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false, error: error.response?.data?.message || 'Erro no cadastro. Tente novamente.' };
      }
      return { success: false, error: 'Ocorreu um erro desconhecido.' };
    }
  },

  async signIn(data: { email: string; password: string }): Promise<AuthResult> {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, { email: data.email, password: data.password });
      const { token } = response.data;

      await AsyncStorage.setItem('auth_token', token);

      return { success: true, token };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false, error: error.response?.data?.message || 'Email ou senha incorretos.' };
      }
      return { success: false, error: 'Ocorreu um erro desconhecido.' };
    }
  },

  async getLoggedUser(): Promise<AuthResult | null> {
    const token = await AsyncStorage.getItem('auth_token');

    return token ? { token } : null;
  },

  async getAuthToken(): Promise<string | null> {
    console.log("token: " + await AsyncStorage.getItem('auth_token'));
    return await AsyncStorage.getItem('auth_token');
  },

  async clearSession() {
    await AsyncStorage.removeItem('auth_token');
    console.log("token saida: " + await AsyncStorage.getItem('auth_token'));
  }
};