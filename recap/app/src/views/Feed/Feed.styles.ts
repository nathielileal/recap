import { Dimensions, StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    empty: {
        margin: 15,
        fontSize: 16,
        textAlign: "center",
        color: theme.terciary,
    },
});