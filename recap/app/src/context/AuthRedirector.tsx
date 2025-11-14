import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useThemeContext } from "../provider/ThemeProvider";
import { useAuthContext } from "./AuthContext";

export function AuthRedirector() {
    const { isAuthenticated, isLoading } = useAuthContext();
    const { theme } = useThemeContext();
    const segments = useSegments();
    const router = useRouter();

    const inAuthGroup = segments[0] === "(auth)";

    useEffect(() => {
        if (!isLoading && isAuthenticated !== null) {
            if (isAuthenticated) {
                if (inAuthGroup) router.replace("/(tabs)");
            } else {
                if (!inAuthGroup) router.replace("/(auth)");
            }
        }
    }, [segments, isAuthenticated, isLoading]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.terciary} />
            </View>
        );
    }

    return <Slot />;
}