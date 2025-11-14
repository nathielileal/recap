import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useThemeContext } from '../../../provider/ThemeProvider';
import { useAuthViewModel } from '../../../viewmodels/auth.viewmodel';
import { stylesheet } from './Recover.styles';

export default function RecoverPage() {
  const { email, setEmail, authError, isLoading, getRecover } = useAuthViewModel();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const handleRecover = async () => {
    const success = await getRecover();

    if (success) {
      Alert.alert('Um e-mail de recuperação foi enviado! Verifique sua caixa de entrada.');
      router.replace('(auth)/sign-in');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../../../assets/images/recap-screen.png')} style={styles.backgroundImage} resizeMode="cover">

        <Svg style={styles.svgShape} viewBox="0 0 85 85" preserveAspectRatio="none">
          <Path d="M0,50 C25,40 75,60 100,50 L100,100 L0,100 Z" fill={theme.primary} />
        </Svg>

        <View style={styles.formContent}>
          <Text style={styles.signInText}>Recuperar senha</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@domain.com"
            placeholderTextColor={theme.grey}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize='none'
          />

          {authError && <Text style={styles.errorText}>{authError}</Text>}

          <TouchableOpacity style={styles.btn} onPress={handleRecover} disabled={isLoading} >
            <Text style={styles.btnText}>{isLoading ? 'Carregando...' : 'Enviar'}</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.replace('(auth)/sign-in')}>
              <Text style={styles.link}> Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}