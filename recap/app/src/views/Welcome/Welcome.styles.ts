import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    image: {
        width: width,
        height: height,
        position: 'absolute',
    },
    container: {
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        height: height * 0.5,
    },
    shape: {
        position: 'absolute',
    },
    content: {
        position: 'absolute',
        bottom: height * 0.12,
        left: 30,
        right: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.terciary,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.terciary,
        lineHeight: 22,
    },
    button: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: COLORS.terciary,
        marginRight: 10,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
        color: COLORS.terciary,
        transform: [{ translateX: 1 }],
    },
});
