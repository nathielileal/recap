import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meu perfil</Text>
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
