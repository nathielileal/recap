import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <View style={{
        width: '100%',
        maxWidth: 400,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 12,
        padding: 24,
        backgroundColor: '#000',
        alignItems: 'center'
      }}>

        <Image
          source={require('../../../../assets/images/recap-logo.png')} // ← substitua com o caminho correto
          style={{ width: 120, height: 120, marginBottom: 30, marginTop: 50 }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
          Bem-vindo ao RECAP
        </Text>
        <Text style={{ fontSize: 18, color: 'gray', fontWeight: 'bold', marginBottom: 70, textAlign: 'center', fontStyle: "italic" }}>
          Seu App de recomendação e gerenciamento de filmes
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
          onPress={() => router.push("/(auth)/sign-up")}
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
            marginBottom: 40,
            alignItems: 'center',
          }}
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
