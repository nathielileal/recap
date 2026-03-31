import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
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
    empty: {
        margin: 20,
        fontSize: 16,
        textAlign: "center",
        color: theme.terciary,
    },
    container: {
        flex: 1,
        width: "90%", 
    },
});