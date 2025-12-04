import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const stylesheet = (theme: any) => StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: theme.primary,
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
        marginBottom: 5,
        fontWeight: 'bold',
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 22,
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
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
        color: theme.terciary,
        marginRight: 10,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
        color: theme.terciary,
        transform: [{ translateX: 1 }],
    },
});
