import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    card: {
        margin: 5,
        padding: 10,
        borderRadius: 15,
        borderColor: theme.terciary,
        borderWidth: 1,
        paddingBottom: 10,
    },
    header: {
        flexDirection: "row",
        marginBottom: 5,
    },
    info: {
        flexDirection: "column",
        flex: 1,
    },
    infoUser: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        paddingLeft: 5,
        fontWeight: 'bold',
        fontSize: 12,
        color: theme.terciary,
    },
    time: {
        paddingLeft: 10,
        fontSize: 8,
        color: theme.terciary,
    },
});