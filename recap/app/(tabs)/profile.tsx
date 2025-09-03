import { router } from "expo-router";
import { SignOutIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meu perfil</Text>

      <TouchableOpacity onPress={() => router.push('(auth)')} style={{ alignItems: 'center', padding: 10 }}>
        <SignOutIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  text: {
    color: "#000000",
    fontSize: 20
  }
});
