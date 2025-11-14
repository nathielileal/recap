import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const stylesheet = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: theme.primary,
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
        backgroundColor: theme.darkGrey,
    },
    textInput: {
        width: "80%",
        paddingLeft: 15,
        color: theme.terciary,
    },
    empty: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: "center",
        color: theme.terciary,
    },
    list: {
        flex: 1,
        width: width,
        marginVertical: 20,
    },
    categoryTitle: {
        fontSize: 20,
        color: theme.terciary,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    }
});