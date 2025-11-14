import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const stylesheet = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    svgShape: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: height * 0.9, 

    },
    formContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 30,
        paddingBottom: 40,
        paddingTop: 80, 
        backgroundColor: 'transparent',
    },
    signInText: {
        fontSize: 36,
        marginBottom: 30,
        fontWeight: 'bold',
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
    label: {
        fontSize: 16,
        color: theme.terciary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: theme.terciary,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 30,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: theme.secondary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    btnText: {
        color: theme.terciary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: theme.terciary,
        fontSize: 16,
    },
    link: {
        color: theme.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});