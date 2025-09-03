import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 40 }}>
        Bem-vindo ao RECAP
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#E50914',
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 8,
          marginBottom: 16,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={() => router.push("/src/views/(auth)/sign-up")}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#333',
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 8,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={() => router.push("/src/views/(auth)/sign-in")}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}
