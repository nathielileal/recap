import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const stylesheet = (theme: any) => StyleSheet.create({
    header: {
        flexShrink: 0,
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
        flexShrink: 1,
        lineHeight: 25,
        maxWidth: "70%",
        flexWrap: "wrap",
        textAlign: "center",
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
    empty: {
        fontSize: 16,
        marginVertical: 20,
        textAlign: "center",
        marginHorizontal: 20,
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
    },
    btn: {
        padding: 15,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: theme.secondary,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
});