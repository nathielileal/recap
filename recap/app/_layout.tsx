import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import SafeScreen from './src/components/SafeScreen/SafeScreen';
import { AuthProvider, useAuthContext } from './src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthRedirector />
    </AuthProvider>
  );
}

function AuthRedirector() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated !== null) {
      const inAuthGroup = segments[0] === '(auth)';

      if (isAuthenticated) {
        if (inAuthGroup) {
          router.replace('/(tabs)');
        }
      }

      else {
        if (!inAuthGroup) {
          router.replace('/(auth)');
        }
      }
    }
  }, [segments, isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    // <SafeScreen>
      <Slot />
    // </SafeScreen>
  );
}