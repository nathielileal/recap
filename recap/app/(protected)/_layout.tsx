import { Stack, Tabs } from 'expo-router';
import React from 'react';

const _Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
};

export default _Layout;


