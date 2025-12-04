// SessionExpiredScreen.tsx
import { SignOutIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../provider/ThemeProvider";

export function SessionExpiredScreen() {
    const { logout } = useAuthContext();
    const { theme } = useThemeContext();

    const handleReturnToLogin = async () => {
        await logout(); 
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
            <Text style={{ fontSize: 20, marginBottom: 16, textAlign: "center", color: theme.terciary, fontFamily: 'IBMPlexMono_400Regular' }}>Sua sessão expirou!</Text>

            <Text style={{ fontSize: 14, marginBottom: 24, textAlign: "center", color: theme.terciary, fontFamily: 'IBMPlexMono_400Regular' }}>Faça login novamente para continuar usando o aplicativo.</Text>

            <TouchableOpacity onPress={handleReturnToLogin} style={{ padding: 12, backgroundColor: theme.secondary, borderRadius: 8, flexDirection: "row" }}>
                <SignOutIcon size={20} color={theme.terciary} style={{ marginHorizontal: 10 }} />
                <Text style={{ color: theme.terciary, fontSize: 18, marginRight: 10 }}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}
