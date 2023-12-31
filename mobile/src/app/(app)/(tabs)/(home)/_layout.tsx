import { useSession } from '@/auth/context';
import { AVATAR_DEFAULT } from '@/constants/defaults';
import theme from '@/constants/theme';
import AppHeader from '@Components/AppHeader';
import HeaderButton from '@Components/HeaderButton';
import { Stack, router } from 'expo-router';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

export default function BillLayout() {
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
    }}>
      <Stack.Screen name="index" options={{
        title: `Home`,
        headerRight: () => (
          <HeaderButton
            icon={<Avatar.Image size={40} source={AVATAR_DEFAULT} />}
            onPress={() => router.push('/(app)/(tabs)/(settings)')}
          />),
        headerTitle(props) {
          return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text variant='titleLarge' style={{ color: props.tintColor }}>
                Olá,{" "}
                <Text style={{ color: props.tintColor, fontWeight: 'bold' }}>
                  {user?.name}
                </Text>
              </Text>
            </View>
          )
        },
      }} />
      <Stack.Screen name="bill/index" options={{ title: "Despesas" }} />
      <Stack.Screen name="bill/[id]" options={{ title: 'Detalhe da despesa' }} />
      <Stack.Screen name="bill/edit/[id]" options={{
        title: 'Editar despesa',
        presentation: 'modal'
      }} />
    </Stack>
  );
}
