import { useSession } from '@/auth/context';
import HeaderButton from '@Components/HeaderButton';
import LoaderScreen from '@Components/LoaderScreen';
import { Redirect, Stack, router } from 'expo-router';

export default function BillLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <LoaderScreen message='Carregando ...' />
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

  return (
      <Stack screenOptions={{
        headerShown: true,
        headerBackTitle: 'Voltar',
        headerLeft: (({ canGoBack, label, tintColor }) => {
          if (canGoBack) {
            return <HeaderButton color={tintColor} text="Voltar" onPress={() => router.back()} />
          }
        }),
        headerLargeTitle: true, 
      }}>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false,
        }} />
      </Stack>
  );
}
