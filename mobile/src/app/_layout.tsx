import { SessionProvider } from '@/auth/context';
import { queryClient } from '@/config/query-client';
import theme from '@/constants/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';



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



function MainLayout() {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <ActionSheetProvider>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <Slot />
              <StatusBar backgroundColor={theme.colors.primary} networkActivityIndicatorVisible hideTransitionAnimation='fade' translucent={false} style='dark' animated />
              {Platform.OS === 'web' && (
                <ReactQueryDevtools client={queryClient} position='right' buttonPosition='bottom-right' />
              )}
            </SafeAreaProvider>
          </ActionSheetProvider>
        </PaperProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
