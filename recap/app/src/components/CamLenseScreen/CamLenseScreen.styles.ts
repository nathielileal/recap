import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
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
        color: COLORS.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
        borderBottomColor: COLORS.terciary,
    },
    title: {
        fontSize: 20,
        lineHeight: 25,
        color: COLORS.terciary,
        fontFamily: 'IBMPlexMono_400Regular',
    },
    outerFixedView: {
        flex: 1,
        paddingBottom: 10,
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        maxWidth: 660,
        width: "100%",
        borderWidth: 2,
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "flex-start",
        borderColor: COLORS.terciary,
        backgroundColor: COLORS.primary,
    },
    //   innerScroll: {
    //     flexGrow: 1,
    //   },
});