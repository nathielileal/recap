import { router } from 'expo-router';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Alert, ImageBackground, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useAuthContext } from '../../../context/AuthContext';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useAuthViewModel } from '../../../viewmodels/auth.viewmodel';
import { stylesheet } from './SignIn.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInPage() {
  const { email, setEmail, password, setPassword, authError, isLoading, showPassword, setShowPassword, getSignIn } = useAuthViewModel();
  const { updateAuthStatus } = useAuthContext();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const handleLogin = async () => {
    const success = await getSignIn();

    if (success) {
      Alert.alert('Login realizado com sucesso!');
      await updateAuthStatus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={require('../../../../../assets/images/recap-screen.png')} style={styles.backgroundImage} resizeMode="cover">

            <Svg style={styles.svgShape} viewBox="0 0 100 100" preserveAspectRatio="none">
              <Path d="M0,50 C25,40 75,60 100,50 L100,100 L0,100 Z" fill={theme.primary} />
            </Svg>

            <View style={styles.formContent}>
              <Text style={styles.signInText}>Login</Text>

              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="example@domain.com"
                placeholderTextColor={theme.darkGrey}
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
                    placeholderTextColor={theme.darkGrey}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputPassword}
                    autoCapitalize='none'
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    {showPassword ? <EyeSlashIcon color={theme.grey} size={24} /> : <EyeIcon color={theme.grey} size={24} />}
                  </TouchableOpacity>
                </View>

                <View style={styles.forgotContainer}>
                  <TouchableOpacity onPress={() => router.push('(auth)/recover')}>
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
                <TouchableOpacity onPress={() => router.push('(auth)/sign-up')}>
                  <Text style={styles.link}> Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}