import { SessionProvider } from '@/auth/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Colors } from 'react-native-ui-lib';
require('react-native-ui-lib/config').setConfig({appScheme: 'dark'});
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
const [loaded, error] = useFonts({});

// Expo Router uses Error Boundaries to catch errors in the navigation tree.
useEffect(() => {
  if (error) throw error;
}, [error]);

useEffect(() => {
  if (loaded) {
    SplashScreen.hideAsync();
  }
}, [loaded]);

if (!loaded) {
  return null;
}


return <MainLayout />;
}


export const queryClient = new QueryClient()

function MainLayout() {

  return (
    <SessionProvider>
      <StatusBar backgroundColor={Colors.$backgroundPrimaryHeavy} style='dark' translucent />
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </SessionProvider>
  );
}
