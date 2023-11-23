import AppHeader from '@Components/AppHeader';
import HeaderButton from '@Components/HeaderButton';
import { Stack, router } from 'expo-router';
import { Colors } from 'react-native-ui-lib';

export default function BillLayout() {
  return (
    <Stack screenOptions={{
      headerShown: true,
      headerBackTitle: 'Voltar',
      headerLeft: (({ canGoBack, label, tintColor }) => {
        if (canGoBack) {
          return <HeaderButton color={tintColor} text={label || "Voltar"} onPress={() => router.back()} />
        }
      }),
      headerStyle: {
        backgroundColor: Colors.$backgroundPrimaryHeavy
      },
      headerTintColor: 'white'
    }}>
      <Stack.Screen name="index" options={{
        header: () => <AppHeader />,
      }} />
      <Stack.Screen name="bill/[id]" options={{
        title: 'Detalhe da despesa',
      }} />
      <Stack.Screen name="bill/edit/[id]" options={{
        title: 'Editar despesa',
        presentation: 'modal'
      }} />
    </Stack>
  );
}
