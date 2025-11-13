import { Switch, View } from "react-native";
import { COLORS } from "../../../../constants/colors";
import { styles } from "./Switch.styles";

interface Props {
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export function BtnSwitch({ value, onValueChange }: Props) {
    return (
        <View style={styles.switch}>
            <Switch
                value={value}
                onValueChange={onValueChange}
                thumbColor={value ? COLORS.secondary : COLORS.grey}
                trackColor={{
                    false: COLORS.primary,
                    true: COLORS.secondaryOpacity,
                }}
            />
        </View>
    );
};
