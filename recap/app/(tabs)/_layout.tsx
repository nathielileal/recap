import { Tabs, useRouter, useSegments } from 'expo-router';
import { HouseIcon, ListDashesIcon, StarFourIcon, UserCircleGearIcon, UsersThreeIcon } from 'phosphor-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const tabs = [
  { name: 'index', route: '/', Icon: HouseIcon },
  { name: 'lists', route: '/lists', Icon: ListDashesIcon },
  { name: 'friends', route: '/friends', Icon: UsersThreeIcon },
  { name: 'profile', route: '/profile', Icon: UserCircleGearIcon },
  { name: 'recommendation', route: '/recommendation', Icon: StarFourIcon },
];

const CustomTabBar = () => {
  const router = useRouter();
  const segments = useSegments();

  const current = '/' + (segments[0] ?? '');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerWrapper}>
        <View style={styles.innerBar}>
          {tabs.map(({ name, route, Icon }) => {
            const focused = current === route || (name === 'index' && current === '');
            return (
              <TouchableOpacity
                key={name}
                onPress={() => router.push(route)}
                activeOpacity={0.8}
                style={styles.tabButton}
              >
                <Icon
                  color={focused ? '#000000' : '#ffffff'}
                  size={22}
                  weight="light"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const _Layout = () => {
  return (
    <Tabs
      tabBar={() => <CustomTabBar />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="lists" />
      <Tabs.Screen name="friends" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="recommendation" />
    </Tabs>
  );
};

export default _Layout;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#121212',
  },
  outerWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  innerBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
});
