import { Text, View } from "react-native";
import { styles } from "../../styles/Tabs.styles";

export function TabIcon({ focused, icon, title }: any) {
    return (
        <View style={[styles.tabs, { backgroundColor: focused ? "#E50914" : '#000000' }]}>
            {icon}
            <Text style={[styles.text, { color: focused ? "#000000" : '#ffffff' }]}>{title}</Text>
        </View>
    );
};