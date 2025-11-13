import { router } from 'expo-router';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';
import React from 'react';
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../../../../constants/colors';
import { useAuthContext } from '../../../context/AuthContext';
import { useAuthViewModel } from '../../../viewmodels/auth.viewmodel';
import { styles } from './SignIn.styles';

export default function SignInPage() {
  const { email, setEmail, password, setPassword, authError, isLoading, showPassword, setShowPassword, getSignIn } = useAuthViewModel();
  const { updateAuthStatus } = useAuthContext();

  const handleLogin = async () => {
    const success = await getSignIn();

    if (success) {
      Alert.alert('Login realizado com sucesso!');
      await updateAuthStatus();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../../../assets/images/recap-screen.png')} style={styles.backgroundImage} resizeMode="cover">

        <Svg style={styles.svgShape} viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,50 C25,40 75,60 100,50 L100,100 L0,100 Z" fill={COLORS.primary} />
        </Svg>

        <View style={styles.formContent}>
          <Text style={styles.signInText}>Login</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@domain.com"
            placeholderTextColor={COLORS.grey}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize='none'
          />

          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Digite sua senha"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.inputPassword}
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                {showPassword ? <EyeSlashIcon color={COLORS.grey} size={24} /> : <EyeIcon color={COLORS.grey} size={24} />}
              </TouchableOpacity>
            </View>

            <View style={styles.forgotContainer}>
              <TouchableOpacity onPress={() => router.replace('(auth)/recover')}>
                <Text style={[styles.link, { fontSize: 12 }]}> Esqueceu a senha? </Text>
              </TouchableOpacity>
            </View>
          </View>

          {authError && <Text style={styles.errorText}>{authError}</Text>}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>{isLoading ? 'Carregando...' : 'Entrar'}</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace('(auth)/sign-up')}>
              <Text style={styles.link}> Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}