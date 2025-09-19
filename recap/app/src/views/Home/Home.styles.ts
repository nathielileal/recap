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
        height: 40,
        padding: 10,
        borderRadius: 16,
        marginTop: 5,
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
    },
    categoryTitle: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    }
});