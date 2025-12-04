import { usePathname, useRouter } from "expo-router";
import { ChatCircleTextIcon, HouseIcon, RowsPlusBottomIcon, UserCircleGearIcon, UsersThreeIcon } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "./TabBar.styles";
import { useMemo } from "react";

const tabs = [
  { name: 'lists', route: '/lists', Icon: RowsPlusBottomIcon },
  { name: 'recommendation', route: '/recommendation', Icon: ChatCircleTextIcon },
  { name: 'index', route: '/', Icon: HouseIcon },
  { name: 'friends', route: '/friends', Icon: UsersThreeIcon },
  { name: 'config', route: '/config', Icon: UserCircleGearIcon },
];

export function TabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <View style={styles.innerBar}>
          {tabs.map(({ name, route, Icon }) => {
            const focused = pathname === route || (name === 'index' && pathname === '/');

            return (
              <TouchableOpacity key={name} onPress={() => router.push(route)} style={styles.tabButton}>
                <Icon color={theme.secondaryOpacity} size={focused ? 30 : 22} weight="fill"/>
              </TouchableOpacity>
            );
          })}
        </View>
    </SafeAreaView>
  );
};