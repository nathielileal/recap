import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primaryOpacity,
    },
    modal: {
        width: "90%",
        padding: 24,
        borderWidth: 2,
        borderRadius: 16,
        borderColor: COLORS.terciary,
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        position: "absolute",
        paddingLeft: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        color: COLORS.terciary,
        left: 0,
        right: 0,
        paddingBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.terciary,
    },
    closeBtn: {},
    stars: {
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    form: {},
    input: {
        padding: 12,
        marginTop: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        color: COLORS.terciary,
        borderColor: COLORS.terciary,
    },
    title: {
        marginLeft: 5,
        marginTop: 15,
        color: COLORS.terciary,
    }
});