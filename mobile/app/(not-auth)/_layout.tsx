import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="sign-in" options={{ title: 'Login' }} />
        <Stack.Screen name="sign-up" options={{ title: 'Register' }} />
      </Stack>
  );
}
