import React from 'react'
import { Tabs } from 'expo-router'
import { HouseIcon, ListDashesIcon, MagnifyingGlassIcon, PersonIcon, UserCircleGearIcon, UserGearIcon, UsersThreeIcon } from 'phosphor-react-native';
import { styles } from '../../styles/tabs-style';
import { TabIcon } from '../../components/Tab/tab-icon-component';

const _Layout = () => {
    return (
        <Tabs screenOptions={{ tabBarShowLabel: false, tabBarStyle: styles.tab, headerShown: false }}>
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={<HouseIcon color={focused ? "#000000" : '#ffffff'} size={20} weight="light"></HouseIcon>} title="Filmes" />
                )
            }} />
            <Tabs.Screen name="lists" options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={<ListDashesIcon color={focused ? "#000000" : '#ffffff'} size={20} weight="light"></ListDashesIcon>} title="Listas" />
                )
            }} />
            <Tabs.Screen name="friends" options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={<UsersThreeIcon color={focused ? "#000000" : '#ffffff'} size={20} weight="light"></UsersThreeIcon>} title="Amigos" />
                )
            }} />
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={<UserCircleGearIcon color={focused ? "#000000" : '#ffffff'} size={20} weight="light"></UserCircleGearIcon>} title="Perfil" />
                )
            }} />
        </Tabs>
    );
}

export default _Layout