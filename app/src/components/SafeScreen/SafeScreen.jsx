import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useThemeContext();

    return (
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: theme.primary }}>
            {children}
        </View>
    );
};

export default SafeScreen;