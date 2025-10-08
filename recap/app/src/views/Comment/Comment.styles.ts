import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
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
        color: COLORS.terciary,
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
        color: COLORS.terciary,
    },
    time: {
        fontSize: 10,
        paddingLeft: 10,
        color: COLORS.terciary,
    },
    aboutText: {
        padding: 5,
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.terciary,
    },
    title: {
        padding: 5,
        fontSize: 18,
        marginTop: 10,
        marginRight: 25,
        fontWeight: "bold",
        textAlign: "justify",
        color: COLORS.terciary,
    },
    description: {
        padding: 5,
        fontSize: 15,
        marginRight: 25,
        textAlign: "justify",
        color: COLORS.terciary,
    },
    more: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.terciary,
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
        color: COLORS.terciary,
        paddingLeft: 5,
    },
    divider: {
        margin: 5,
        height: 1,
        width: '92%',
        marginVertical: 10,
        backgroundColor: COLORS.terciary,
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
        color: COLORS.terciary,
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
        borderTopColor: COLORS.terciary, 
        backgroundColor: COLORS.primary, 
    },
    input: {
        flex: 1,
        padding: 15,
        maxHeight: 100,
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 15,
        color: COLORS.terciary,
        borderColor: COLORS.terciary,
    },
    btn: {
        marginHorizontal: 10,
    },
});