import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  empty: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: theme.terciary,
  },
});
