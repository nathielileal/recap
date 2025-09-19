import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { styles } from "./Welcome.styles"

export default function WelcomePage() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <Image source={require('../../../../assets/images/recap-screen.png')} style={styles.image} resizeMode="contain" />

      <View style={styles.container}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" style={styles.shape}>
          <Path d="M0,50 C25,40 75,60 100,50 L100,100 L0,100 Z" fill="#000" />
        </Svg>

        <View style={styles.content}>
          <Text style={styles.title}>Olá!</Text>
          <Text style={styles.subtitle}>Sua memória, seus filmes. Tudo em um só lugar.</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('./(auth)/sign-in')}>
          <Text style={styles.text}>Continue</Text>
          <View style={styles.circle}>
            <Text style={styles.icon}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View >
  );
}