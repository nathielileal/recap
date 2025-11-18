import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    cardMovie: {
        width: 105,
        height: 150,
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