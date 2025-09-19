import { router } from 'expo-router';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';
import React from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthViewModel } from '../../../viewmodels/auth.viewmodel';
import { useAuthContext } from '../../../context/AuthContext';

export default function SignUpPage() {
  const { email, setEmail, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, emailError, usernameError, passwordError, isLoading, showPassword, setShowPassword, showConfirm, setShowConfirm, getSignUp } = useAuthViewModel();
  const { updateAuthStatus } = useAuthContext();

  const handleSignUp = async () => {
    const success = await getSignUp();

    if (success) {
      Alert.alert('Conta criada com sucesso!');
      await updateAuthStatus();
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

        <TouchableOpacity
          style={{
            backgroundColor: '#E50914',
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 16,
          }}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{isLoading ? 'Carregando...' : 'CRIAR CONTA'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center' }}>
          <Text style={{ color: '#E50914', fontSize: 16 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}