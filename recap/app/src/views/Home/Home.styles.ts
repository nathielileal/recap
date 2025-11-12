import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: COLORS.primary,
    },
    header: {
        paddingBottom: 10,
    },
    input: {
        height: 40,
        padding: 10,
        marginTop: 5,
        borderRadius: 16,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.darkGrey,
    },
    textInput: {
        width: "80%",
        paddingLeft: 15,
        color: COLORS.terciary,
    },
    empty: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: "center",
        color: COLORS.terciary,
    },
    list: {
        flex: 1,
        width: width,
    },
    categoryTitle: {
        fontSize: 20,
        color: COLORS.terciary,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    }
});