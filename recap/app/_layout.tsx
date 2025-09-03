import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    {/* <Stack.Screen name="src/views/(tabs)" options={{ headerShown: false }} /> */}
    <Stack.Screen name="src/views/(auth)" options={{ headerShown: false }} />
  </Stack>
}
