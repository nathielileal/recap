import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import InputField from '../../../components/Fields/InputField';
import AuthButton from '../../../components/Auth/AuthButton';

type Props = {
  username: string;
  password: string;
  setUsername: (text: string) => void;
  setPassword: (text: string) => void;
  handleSignIn: () => void;
};

export default function SignInView({
  username,
  password,
  setUsername,
  setPassword,
  handleSignIn,
}: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, color: '#fff', marginBottom: 32, textAlign: 'center' }}>
        Acessar sua conta
      </Text>

      <InputField placeholder="Nome de usuário" value={username} onChangeText={setUsername} />
      <InputField placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <AuthButton label="ENTRAR" onPress={handleSignIn} />

      <TouchableOpacity>
        <Text style={{ color: '#aaa', marginTop: 16, textAlign: 'center' }}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
}
