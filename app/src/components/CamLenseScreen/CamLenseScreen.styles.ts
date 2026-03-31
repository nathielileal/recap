import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    safeArea: {
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
    functions: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        gap: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginTop: 2, 
    },
    text: {
        fontSize: 12,
        paddingBottom: 1,
        borderBottomWidth: 1, 
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
        borderBottomColor: theme.terciary,
    },
    title: {
        fontSize: 20,
        lineHeight: 25,
        color: theme.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
    outerFixedView: {
        flex: 1,
        paddingBottom: 10,
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: theme.primary,
    },
    container: {
        flex: 1,
        maxWidth: 660,
        width: "100%",
        borderWidth: 2,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "flex-start",
        borderColor: theme.terciary,
        backgroundColor: theme.primary,
    },
});