import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/colors";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        color: COLORS.terciary,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: COLORS.terciary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.terciary,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 20,
        fontSize: 16,
    },
    passwordContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.terciary,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    eyeIcon: {
        paddingLeft: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: COLORS.secondary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: COLORS.terciary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: COLORS.terciary,
        fontSize: 16,
    },
    signupLink: {
        color: COLORS.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});