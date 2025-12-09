import { usePathname, useRouter } from "expo-router";
import { AddressBookTabsIcon, BookmarkIcon, BookmarkSimpleIcon, BridgeIcon, BroadcastIcon, ChatCircleTextIcon, HouseIcon, RowsPlusBottomIcon, UserCircleGearIcon, UsersThreeIcon } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../../provider/ThemeProvider";
import { stylesheet } from "./TabBar.styles";
import { useMemo } from "react";

const tabs = [
  { name: 'listas', route: '/lists', Icon: RowsPlusBottomIcon },
  { name: 'recomendação', route: '/recommendation', Icon: ChatCircleTextIcon },
  { name: 'página inicial', route: '/', Icon: HouseIcon },
  { name: 'feed', route: '/feed', Icon: BroadcastIcon },
  { name: 'amigos', route: '/friends', Icon: UsersThreeIcon },
  { name: 'configurações', route: '/config', Icon: UserCircleGearIcon },
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
                <Text style={{ color: theme.terciary, opacity: 0.8, fontSize: focused ? 9 : 7, marginTop: 3 }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
    </SafeAreaView>
  );
};