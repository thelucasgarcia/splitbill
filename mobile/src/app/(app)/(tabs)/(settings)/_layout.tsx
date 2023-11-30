import { useSession } from '@/auth/context';
import { AVATAR_DEFAULT } from '@/constants/defaults';
import theme from '@/constants/theme';
import AppHeader from '@Components/AppHeader';
import HeaderButton from '@Components/HeaderButton';
import { Stack, router } from 'expo-router';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

export default function RootLayout() {
  const { user } = useSession()
  return (
    <Stack screenOptions={{
      headerShown: true,
      headerBackTitle: 'Voltar',
      headerTintColor: theme.colors.scrim,
      headerLeft: (({ canGoBack, label, tintColor }) => {
        if (canGoBack) {
          return <HeaderButton color={tintColor} text={label || "Voltar"} onPress={() => router.back()} />
        }
      }),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      statusBarTranslucent: true,
      headerLargeTitle: true,
    }}>
      <Stack.Screen name="index" options={{
        title: `Configurações`,
      }} />

      <Stack.Screen name="personalData" options={{
        title: `Dados Pessoais`,
      }} />


    </Stack>
  );
}
