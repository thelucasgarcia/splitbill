import { SessionProvider } from '@/auth/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Colors, ThemeManager } from 'react-native-ui-lib';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Platform, View } from 'react-native';
import { queryClient } from '@/config/query-client';
require('react-native-ui-lib/config').setConfig({ appScheme: 'default' });

Colors.loadColors({
  error: '#ff2442',
  success: '#00CD8B',
  text: '#00CD8B',
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

ThemeManager
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



function MainLayout() {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar backgroundColor={Colors.$backgroundPrimaryHeavy} style='light' animated />
        <Slot />
        {Platform.OS === 'web' && (
          <ReactQueryDevtools client={queryClient} position='right' buttonPosition='bottom-right' />
          )}
      </QueryClientProvider>
    </SessionProvider>
  );
}
