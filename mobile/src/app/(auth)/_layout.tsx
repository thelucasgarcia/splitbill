import { useSession } from '@/auth/context';
import LoaderScreen from '@Components/LoaderScreen';
import { Redirect, Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  const { isLoading, session } = useSession()
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <LoaderScreen />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(app)/(tabs)/(home)" />;
  }

  return (
      <Stack screenOptions={{
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name="index" options={{ title: 'SplitBill logo', headerTransparent: true}} />
        <Stack.Screen name="sign-in" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ title: '', headerTransparent: true, headerTintColor: 'white'}} />
      </Stack>
  );
}
