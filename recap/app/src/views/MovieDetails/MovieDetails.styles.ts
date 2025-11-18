import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.primary,
    },
    header: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: theme.primary,
    },
    headerItemLeft: {
        flex: 1,
    },
    headerItemRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 25,
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
    functions: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        height: 210,
        width: "100%",
        borderRadius: 10,
        position: "absolute",
    },
    poster: {
        left: 29,
        top: 140,
        right: 251,
        width: 100,
        height: 160,
        borderRadius: 16,
    },
    title: {
        top: 240,
        right: 32,
        left: 140,
        height: 50,
        fontSize: 18,
        lineHeight: 20,
        fontWeight: "700",
        position: "absolute",
        color: theme.terciary,
    },
    description: {
        width: "100%",
        marginTop: 160,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    descriptionGroup: {
        gap: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    descriptionText: {
        marginRight: 20,
        color: theme.terciary,
    },
    descriptionTextHighScore: {
        marginRight: 20,
        color: theme.orange,
    },
    about: {
        padding: 20,
    },
    aboutText: {
        color: theme.terciary,
        textAlign: "justify",
    },
    options: {
        margin: 0,
        padding: 0,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
    },
    option: {
        color: theme.terciary,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    optionSelected: {
        paddingBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: theme.terciary,
    },
    btn: {
        backgroundColor: theme.secondary,
    },
    empty: {
        fontSize: 16,
        marginVertical: 20,
        color: theme.terciary,
    }
});