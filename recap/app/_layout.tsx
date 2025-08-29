import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="src/views/(tabs)" options={{ headerShown: false }} />
  </Stack>
}
