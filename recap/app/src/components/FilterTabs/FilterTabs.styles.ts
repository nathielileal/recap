import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    tabText: {
        fontSize: 16,
        color: COLORS.grey,
    },
    tabActiveText: {
        fontSize: 16,
        paddingBottom: 2,
        fontWeight: "bold",
        borderBottomWidth: 1,
        color: COLORS.terciary,
        borderBottomColor: COLORS.secondary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
});
