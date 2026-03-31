import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
  switch: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.secondary,
    padding: 2,
  }
});