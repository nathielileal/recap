import { StyleSheet } from "react-native";

export const stylesheet = (theme: any, isRead: boolean) => StyleSheet.create({
    card: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 15,
        paddingBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: theme.terciary,
        backgroundColor: isRead === false ? theme.terciary + '20' : 'transparent',
    },
    title: {
        fontSize: 16,
        flexShrink: 1,
        lineHeight: 25,
        maxWidth: "90%",
        flexWrap: "wrap",
        color: theme.terciary,
        fontWeight: isRead === false ? 'bold' : 'normal',
    },
    time: {
        fontSize: 10,
        color: theme.terciary,
    },
    option: {
        fontSize: 12,
        paddingVertical: 5,
        color: theme.secondary,
    },
    options: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    }
});