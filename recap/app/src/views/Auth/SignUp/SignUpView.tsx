import React from 'react';
import { Text, View } from 'react-native';
import InputField from '../../../components/Fields/InputField';
import AuthButton from '../../../components/Auth/AuthButton';

export default function SignUpView({
  email,
  username,
  password,
  setEmail,
  setUsername,
  setPassword,
  handleSignUp,
}: {
  email: string;
  username: string;
  password: string;
  setEmail: (text: string) => void;
  setUsername: (text: string) => void;
  setPassword: (text: string) => void;
  handleSignUp: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, color: '#fff', marginBottom: 32, textAlign: 'center' }}>Criar uma conta</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Nome de usuário" value={username} onChangeText={setUsername} />
      <InputField placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <AuthButton label="CRIAR CONTA" onPress={handleSignUp} />
    </View>
  );
}
