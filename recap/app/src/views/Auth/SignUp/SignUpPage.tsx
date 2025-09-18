import { router } from 'expo-router';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthSession } from '../../../services/auth.service';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

const validateAndSubmit = async () => {
  let valid = true;

  if (!email.includes('@') || !email.includes('.')) {
    setEmailError('Email inválido');
    valid = false;
  } else {
    setEmailError('');
  }

  if (username.trim().length < 3) {
    setUsernameError('Nome de usuário muito curto');
    valid = false;
  } else {
    setUsernameError('');
  }

  if (password !== confirmPassword) {
    setPasswordError('As senhas não coincidem');
    valid = false;
  } else if (password.length < 6) {
    setPasswordError('Senha deve ter pelo menos 6 caracteres');
    valid = false;
  } else {
    setPasswordError('');
  }

  if (valid) {
    const alreadyExists = await AuthSession.userExists({ email, username });

    if (alreadyExists) {
      Alert.alert('Erro', 'Email ou nome de usuário já cadastrado');
      return;
    }

await AuthSession.setLoggedUser({ username, email, password });
    Alert.alert('Conta criada com sucesso!');
    router.replace('/(tabs)');
  }
};


  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <View style={{
        width: '100%',
        maxWidth: 400,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 12,
        padding: 24,
        backgroundColor: '#000'
      }}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>RECAP</Text>
        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>Criar uma conta</Text>

        {/* Email */}
        <Text style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>Email</Text>
        <TextInput
          placeholder="Digite seu email..."
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: '#fff',
            color: '#fff',
            marginBottom: 2,
            padding: 12,
            borderRadius: 8,
          }}
        />
        {emailError ? <Text style={{ color: '#E50914', marginBottom: 16 }}>{emailError}</Text> : <View style={{ height: 16 }} />}

        {/* Nome de usuário */}
        <Text style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>Nome de usuário</Text>
        <TextInput
          placeholder="Digite seu nome de usuário..."
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
          style={{
            borderWidth: 1,
            borderColor: '#fff',
            color: '#fff',
            marginBottom: 2,
            padding: 12,
            borderRadius: 8,
          }}
        />
        {usernameError ? <Text style={{ color: '#E50914', marginBottom: 8 }}>{usernameError}</Text> : <View style={{ height: 16 }} />}

        {/* Senha */}
        <Text style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>Senha</Text>
        <View style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 8 }}>
            <TextInput
              placeholder="Digite sua senha..."
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={{
                color: '#fff',
                flex: 1,
                padding: 12,
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 12 }}>
              {showPassword ? <EyeSlashIcon color="#fff" size={24} /> : <EyeIcon color="#fff" size={24} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirmar senha */}
        <Text style={{ color: '#fff', fontSize: 14, marginBottom: 4, marginTop: 8 }}>Confirmar senha</Text>
        <View style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 8 }}>
            <TextInput
              placeholder="Confirme sua senha..."
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{
                color: '#fff',
                flex: 1,
                padding: 12,
              }}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={{ paddingHorizontal: 12 }}>
              {showConfirm ? <EyeSlashIcon color="#fff" size={24} /> : <EyeIcon color="#fff" size={24} />}
            </TouchableOpacity>
          </View>
        </View>
        {passwordError ? <Text style={{ color: '#E50914', marginBottom: 16 }}>{passwordError}</Text> : <View style={{ height: 16 }} />}

        {/* Botão Criar Conta */}
        <TouchableOpacity
          style={{
            backgroundColor: '#E50914',
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 16,
          }}
          onPress={validateAndSubmit}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>CRIAR CONTA</Text>
        </TouchableOpacity>

        {/* Botão Voltar */}
        <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center' }}>
          <Text style={{ color: '#E50914', fontSize: 16 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
