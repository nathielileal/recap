import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
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
        color: COLORS.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
    empty: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: "center",
        marginHorizontal: 20,
        color: COLORS.terciary,
    },
    list: {
        flex: 1,
        width: width,
        marginVertical: 20,
    },
    categoryTitle: {
        fontSize: 20,
        color: COLORS.terciary,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    }
});