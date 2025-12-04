import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    cardMovie: {
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.terciary
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: theme.darkGrey,
    },
});