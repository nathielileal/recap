import { router } from 'expo-router';
import { EyeIcon, EyeSlashIcon } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useAuthContext } from '../../../context/AuthContext';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useAuthViewModel } from '../../../viewmodels/auth.viewmodel';
import { stylesheet } from './SignUp.styles';

export default function SignUpPage() {
  const { email, setEmail, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, passwordError, authError, isLoading, showPassword, setShowPassword, showConfirm, setShowConfirm, getSignUp } = useAuthViewModel();
  const { updateAuthStatus } = useAuthContext();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const handleSignUp = async () => {
    const success = await getSignUp();

    if (success) {
      Alert.alert('Conta criada com sucesso!');
      await updateAuthStatus();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../../../assets/images/recap-screen.png')} style={styles.backgroundImage} resizeMode="cover">
        <Svg style={styles.svgShape} viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,40 C15,15 70,50 100,35 L100,100 L0,100 Z" fill={theme.primary} />
        </Svg>

        <View style={styles.formContent}>
          <Text style={styles.signUpText}>Cadastrar</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="exemplo@domain.com"
            placeholderTextColor={theme.darkGrey}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize='none'
          />

          <Text style={styles.label}>Nome de usuário</Text>
          <TextInput
            placeholder="Digite o nome de usuário"
            placeholderTextColor={theme.darkGrey}
            value={username}
            onChangeText={setUsername}
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
                {showPassword ? <EyeSlashIcon color={theme.darkGrey} size={24} /> : <EyeIcon color={theme.darkGrey} size={24} />}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Confirmar senha</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Confirme sua senha"
                placeholderTextColor={theme.darkGrey}
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.inputPassword}
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
                {showConfirm ? <EyeSlashIcon color={theme.darkGrey} size={24} /> : <EyeIcon color={theme.darkGrey} size={24} />}
              </TouchableOpacity>
            </View>
          </View>

          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : authError ? <Text style={styles.errorText}>{authError}</Text> : <View style={{ height: 16 }} />}

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={isLoading}>
            <Text style={styles.signUpButtonText}>{isLoading ? 'Carregando...' : 'Cadastrar'}</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.signInTextLink}>Já tem uma conta? </Text>

            <TouchableOpacity onPress={() => router.replace('(auth)/sign-in')}>
              <Text style={styles.signInLink}> Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}