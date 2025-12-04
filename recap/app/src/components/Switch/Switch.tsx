import { Switch, View } from "react-native";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "./Switch.styles";
import { useMemo } from "react";

interface Props {
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export function BtnSwitch({ value, onValueChange }: Props) {
    const { theme } = useThemeContext();
    const styles = useMemo(() => stylesheet(theme), [theme]);
    
    return (
        <View style={styles.switch}>
            <Switch
                value={value}
                onValueChange={onValueChange}
                thumbColor={value ? theme.secondary : theme.grey}
                trackColor={{
                    false: theme.primary,
                    true: theme.secondaryOpacity,
                }}
            />
        </View>
    );
};
