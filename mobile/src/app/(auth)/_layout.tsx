import { useSession } from '@/auth/context';
import { Redirect, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native-ui-lib';

export default function RootLayout() {
  const { isLoading, session } = useSession()
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

  return (
      <Stack>
        <Stack.Screen name="sign-in" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ title: 'Register' }} />
      </Stack>
  );
}
