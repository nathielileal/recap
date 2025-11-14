import { IBMPlexMono_400Regular, useFonts } from '@expo-google-fonts/ibm-plex-mono';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { AuthRedirector } from './src/context/AuthRedirector';
import { CustomThemeProvider } from './src/provider/ThemeProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    IBMPlexMono_400Regular
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <AuthProvider>
        <AuthRedirector />
      </AuthProvider>
    </CustomThemeProvider>
  );
}