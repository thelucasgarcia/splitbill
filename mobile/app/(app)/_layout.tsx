import { useSession } from '@/auth/context';
import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native-ui-lib';

export default function BillLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }
  return (
      <Stack screenOptions={{
        headerShown: false,
        headerBackTitle: 'Voltar',
      }}>
        <Stack.Screen name="bill/[id]" options={{
          title: 'Detalhes da despesa',
          headerShown: true,
          autoHideHomeIndicator: true
        }} />
        <Stack.Screen name="bill/edit/[id]" options={{
          title: 'Editar despesa',
          headerShown: true,
          presentation: 'modal'
        }} />
      </Stack>
  );
}
