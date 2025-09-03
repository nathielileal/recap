import { StyleSheet, Text, View } from "react-native";

export default function Friends() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Amigos</Text>
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
