import { useMemo } from "react";
import { View } from "react-native";
import { CamLenseScreen } from "../../components/CamLenseScreen/CamLenseScreen";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "./Feed.styles";

export default function FeedPage() {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);

    return (
        <CamLenseScreen title="Feed">
            <View></View>
        </CamLenseScreen>
    );
}