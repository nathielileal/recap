import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthSession } from './src/services/auth.service';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AuthSession.getLoggedUser();
      setIsAuthenticated(!!user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      const isAuthRoute = segments[0] === '(auth)';
      if (!isAuthenticated && !isAuthRoute) {
        router.replace('/auth/sign-in');
      }
    }
  }, [segments, isAuthenticated, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <Slot />;
}
