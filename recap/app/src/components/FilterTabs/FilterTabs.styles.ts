import { StyleSheet } from "react-native";

export const stylesheet = (theme: any) => StyleSheet.create({
    container: {
        marginBottom: 24,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.primary,
    },
    item: {
        paddingVertical: 5,
        paddingHorizontal: 24,
    },
    tabText: {
        fontSize: 12,
        color: theme.grey,
    },
    tabActiveText: {
        fontSize: 16,
        paddingBottom: 2,
        fontWeight: "bold",
        borderBottomWidth: 1,
        color: theme.terciary,
        borderBottomColor: theme.secondary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
});
