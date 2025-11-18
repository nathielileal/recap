import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    cardMovie: {
        width: 100,
        height: 145,
        borderRadius: 15,
        marginBottom: 10,
        marginHorizontal: 5,
    },
    cardImage: {
        width: 100,
        height: 145,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: theme.darkGrey,
    },
});