import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const scale = (size: number) => (size / 375) * width;

export const styles = StyleSheet.create({
    tab: {
        borderRadius: 50,
        bottom: 36,
        height: 55,
        borderWidth: 1,
        overflow: "hidden",
        marginHorizontal: 20,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#000000",
        backgroundColor: "#000000",
    },
    tabs: {
        height: 40,
        marginTop: 15,
        borderRadius: 25,
        width: scale(80),
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 5,
        justifyContent: "space-evenly",
    },
    text: {
        fontSize: 12,
    },
});