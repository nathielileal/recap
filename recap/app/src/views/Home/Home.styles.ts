import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#000000",
    },
    header: {
        padding: 25,
    },
    title: {
        marginTop: 30,
        fontSize: 24,
        lineHeight: 45,
        color: '#ffffff',
    },
    input: {
        backgroundColor: "#585858",
        height: 42,
        padding: 10,
        borderRadius: 16,
        marginTop: 24,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    textInput: {
        color: "#ffffff",
        width: "80%",
        paddingLeft: 15,
    },
    empty: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 20,
    },
    list: {
        width: width,
        alignItems: "center",
        justifyContent: "center",
    }
});