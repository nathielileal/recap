import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { COLORS } from "../../../../constants/colors";
import { useAuthContext } from "../../context/AuthContext";

export function AuthRedirector() {
    const { isAuthenticated, isLoading, isTokenExpired, clearTokenExpiredFlag } = useAuthContext();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated !== null) {
            const inAuthGroup = segments[0] === '(auth)';

            if (isAuthenticated) {
                if (inAuthGroup) {
                    router.replace('/(tabs)');
                }
            } else {
                if (!inAuthGroup) {
                    router.replace('/(auth)');

                    Alert.alert('Sessão Expirada', 'Seu acesso expirou. Faça login novamente para continuar.', [{ text: "OK" }]);
                }
            }
        }
    }, [segments, isAuthenticated, isLoading, router]);

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (!isLoading && !isAuthenticated && inAuthGroup && isTokenExpired) {
            Alert.alert('Sessão Expirada', 'Seu acesso expirou. Faça login novamente para continuar.', [{ text: "OK", onPress: clearTokenExpiredFlag }]);
        }
    }, [isTokenExpired, isAuthenticated, isLoading, segments, clearTokenExpiredFlag]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.terciary} />
            </View>
        );
    }

    return <Slot />;
}