import { router } from 'expo-router';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [authError, setAuthError] = useState('');

  const validateAndLogin = () => {
    let valid = true;

    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Email inválido');
      valid = false;
    } else {
      setEmailError('');
    }

    if (valid) {
      console.log('📩 Email:', email);
      console.log('🔒 Senha:', password);
      Alert.alert('Login realizado com sucesso!');

      router.push('/(tabs)');
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
        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>Entrar na conta</Text>

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
        {authError ? <Text style={{ color: '#E50914', marginBottom: 16 }}>{authError}</Text> : <View style={{ height: 16 }} />}

        <TouchableOpacity
          style={{
            backgroundColor: '#E50914',
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 16,
          }}
          onPress={validateAndLogin}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center' }}>
          <Text style={{ color: '#E50914', fontSize: 16 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
