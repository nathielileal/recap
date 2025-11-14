import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.primary
    },
    top: {
        height: 60,
        paddingTop: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    topTitle: {
        top: 40,
        left: 0,
        right: 0,
        fontSize: 18,
        lineHeight: 32,
        fontWeight: "700",
        textAlign: "center",
        position: "absolute",
        color: theme.terciary,
    },
    review: {
        paddingLeft: 20,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        marginBottom: 5,
        paddingTop: 40,
    },
    info: {
        flexDirection: "column",
        flex: 1,
    },
    infoUser: {
        flexDirection: "row",
        alignItems: "center",
    },
    user: {
        fontSize: 20,
        paddingLeft: 5,
        fontWeight: 'bold',
        color: theme.terciary,
    },
    time: {
        fontSize: 10,
        paddingLeft: 10,
        color: theme.terciary,
    },
    aboutText: {
        padding: 5,
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.terciary,
    },
    title: {
        padding: 5,
        fontSize: 18,
        marginTop: 10,
        marginRight: 25,
        fontWeight: "bold",
        textAlign: "justify",
        color: theme.terciary,
    },
    description: {
        padding: 5,
        fontSize: 15,
        marginRight: 25,
        textAlign: "justify",
        color: theme.terciary,
    },
    more: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.terciary,
    },
    stars: {
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 60,
    },
    rate: {
        fontSize: 10,
        color: theme.terciary,
        paddingLeft: 5,
    },
    divider: {
        margin: 5,
        height: 1,
        width: '92%',
        marginVertical: 10,
        backgroundColor: theme.terciary,
    },
    list: {
        paddingLeft: 25,
        flexDirection: "column",
    },
    comments: {
        flexDirection: "row",
    },
    comment: {
        fontSize: 15,
        paddingLeft: 5,
        color: theme.terciary,
    },
    bottom: {
        left: 0,
        right: 0,
        bottom: 0,
        padding: 15,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        borderTopColor: theme.terciary, 
        backgroundColor: theme.primary, 
    },
    input: {
        flex: 1,
        padding: 15,
        maxHeight: 100,
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 15,
        color: theme.terciary,
        borderColor: theme.terciary,
    },
    btn: {
        marginHorizontal: 10,
    },
});