
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function signUp(data: { email: string; username: string; password: string }) {
  console.log('Dados de cadastro:', data);
}

export async function signIn(data: { username: string; password: string }) {
  console.log('Dados de login:', data);
}

const USERS_KEY = 'recap_users';

export const AuthSession = {
  async getUsers() {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
},

async saveUser(newUser: { username: string; email: string; password: string }) {
  const users = await AuthSession.getUsers();
  const updatedUsers = users ? [...users, newUser] : [newUser];

  await AsyncStorage.setItem('recap_users', JSON.stringify(updatedUsers));
  await AsyncStorage.setItem('recap_user', JSON.stringify(newUser)); // define como logado
},

  async userExists({ email, username }: { email: string; username: string }) {
    const users = await AuthSession.getUsers();
    return users.some((user: { email: string; username: string; }) => user.email === email || user.username === username);
  },

  async getLoggedUser() {
    const data = await AsyncStorage.getItem('recap_user');
    return data ? JSON.parse(data) : null;
  },

  async setLoggedUser(user: { username: string; email: string; password: string }) {
  await AsyncStorage.setItem('recap_user', JSON.stringify(user));
},

async clearUsers() {
  await AsyncStorage.removeItem('recap_users');
  await AsyncStorage.removeItem('recap_user'); // limpa também o usuário logado
},


  async clearSession() {
    await AsyncStorage.removeItem('recap_user');
  }
};
