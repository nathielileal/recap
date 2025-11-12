import { IBMPlexMono_400Regular, useFonts } from '@expo-google-fonts/ibm-plex-mono';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { AuthRedirector } from './src/components/Auth/AuthRedirector';
import { AuthProvider } from './src/context/AuthContext';

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
    <AuthProvider>
      <AuthRedirector />
    </AuthProvider>
  );
}