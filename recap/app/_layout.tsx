import { IBMPlexMono_300Light, IBMPlexMono_400Regular, IBMPlexMono_400Regular_Italic, IBMPlexMono_700Bold, IBMPlexMono_700Bold_Italic, useFonts } from '@expo-google-fonts/ibm-plex-mono';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { AuthRedirector } from './src/context/AuthRedirector';
import { CustomThemeProvider } from './src/provider/ThemeProvider';
import { NotificationProvider } from './src/provider/NotificationProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    IBMPlexMono_400Regular,
    IBMPlexMono_700Bold,
    IBMPlexMono_700Bold_Italic,
    IBMPlexMono_300Light,
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
        <NotificationProvider>
          <AuthRedirector />
        </NotificationProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}