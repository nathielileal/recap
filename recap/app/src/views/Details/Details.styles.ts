import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    header: {
        paddingTop: 30,
        height: 115,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: COLORS.terciary,
        fontWeight: "700",
        fontSize: 18,
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        top: 55,
        lineHeight: 32,
    },
    functions: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        position: "absolute",
        width: "100%",
        height: 210,
    },
    poster: {
        width: 100,
        height: 160,
        borderRadius: 16,
        left: 29,
        right: 251,
        top: 140,
    },
    title: {
        position: "absolute",
        height: 50,
        left: 140,
        right: 32,
        top: 240,
        color: COLORS.terciary,
        fontSize: 18,
        lineHeight: 20,
        fontWeight: "700"
    },
    description: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 160,
    },
    descriptionGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    descriptionText: {
        marginRight: 10,
        color: COLORS.terciary
    },
    descriptionTextHighScore: {
        marginRight: 10,
        color: COLORS.orange
    },
    about: {
        padding: 20
    },
    aboutText: {
        color: COLORS.terciary,
        textAlign: "justify"
    },
    options: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 0,
        margin: 0,
    },
    option: {
        color: COLORS.terciary,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    optionSelected: {
        paddingBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.terciary,
    },
    reviews: {
        // paddingBottom: 100, 
    },
    btn: {
        backgroundColor: COLORS.secondary
    }
});