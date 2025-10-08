import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 10,
        borderRadius: 15,
        borderColor: COLORS.terciary,
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
    image: {
        width: 20,
        height: 20,
        color: COLORS.terciary,
    },
    title: {
        paddingLeft: 5,
        fontWeight: 'bold',
        fontSize: 12,
        color: COLORS.terciary,
    },
    time: {
        paddingLeft: 10,
        fontSize: 8,
        color: COLORS.terciary,
    },
    stars: {
        paddingTop: 3,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    blur: {
        position: 'absolute', 
        top: 0,
        bottom: 0,
        left: 0,
        right: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 15, 
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 5,
    },
    spoiler: {
        fontSize: 12,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: COLORS.terciary,
    },
    more: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.terciary, 
    },
    description: {
        padding: 5,
        fontSize: 10,
        textAlign: "justify",
        color: COLORS.terciary,
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 5,
    },
    icon: {
        fontSize: 8,
        color: COLORS.terciary,
        paddingLeft: 3,
        paddingRight: 10,
    }
});