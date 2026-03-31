import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    card: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        paddingBottom: 10,
        borderColor: theme.terciary,
    },
    header: {
        flexDirection: "row",
        marginBottom: 5,
    },
    info: {
        flex: 1,
        flexDirection: "column",
    },
    infoUser: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        flex: 1,
        paddingLeft: 5,
        fontWeight: 'bold',
        fontSize: 12,
        color: theme.terciary,
    },
    time: {
        fontSize: 8,
        paddingLeft: 10,
        color: theme.terciary,
    },
    options: {
        flexDirection: "row",
        justifyContent: 'flex-end'
    }
});