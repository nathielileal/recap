import { Tabs } from 'expo-router';
import React from 'react';
import { TabBar } from '../../src/components/Tab/TabBar';

const _Layout = () => {
  return (
    <Tabs tabBar={() => <TabBar />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="lists" />
      <Tabs.Screen name="friends" />
      <Tabs.Screen name="config" />
      <Tabs.Screen name="recommendation" />
    </Tabs>
  );
};

export default _Layout;


