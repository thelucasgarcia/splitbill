import { useSession } from '@/auth/context';
import { useUser } from '@/bff/queries/user';
import { AVATAR_DEFAULT } from '@/constants/defaults';
import theme from '@/constants/theme';
import Row from '@Components/Grid/Row';
import LoaderScreen from '@Components/LoaderScreen';
import ScreenContent from '@Components/ScreenContent';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Stack, router } from 'expo-router';
import { RefreshControl, ScrollView } from 'react-native';
import { Avatar, Button, Divider, List, Text } from 'react-native-paper';

export default function Settings() {
  const { signOut, user } = useSession();
  const { data, isLoading, refetch, isRefetching} = useUser({ id: user?.sub || '' })

  const { showActionSheetWithOptions } = useActionSheet();

  if (isLoading) {
    return <LoaderScreen />
  }

  if (data) {
    return (
      <ScreenContent style={{ paddingHorizontal: 0 }} >
        <Stack.Screen  options={{ headerLargeTitle: true, freezeOnBlur: true }}/>
        <ScrollView contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
          <List.Section style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Image source={AVATAR_DEFAULT} />
            <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>@{data?.username}</Text>
            <Text>{data?.name}</Text>
          </List.Section>
          <List.Section>
            <List.Subheader>Minha Conta</List.Subheader>
            <List.Item
              onPress={() => router.push('/(app)/(tabs)/(home)')}
              title={() => renderItem('Nome de usuário', `@${data?.username}`)}
              {...chevronIcon}
            />

            <List.Item
              onPress={() => router.push('/(app)/(tabs)/(home)')}
              title={() => renderItem('Meu número', data?.phone )}
              {...chevronIcon}
            />

            <List.Item
              onPress={() => router.push('/(app)/(tabs)/(home)')}
              title={() => renderItem('Meu email', data?.email)}
              {...chevronIcon}
            />

            <List.Item
              onPress={() => router.push('/(app)/(tabs)/(settings)/personalData')}
              title="Dados Pessoais"
              {...chevronIcon}
            />

          </List.Section>

          <List.Section>
            <List.Subheader>Segurança</List.Subheader>
            <List.Item
              onPress={() => router.push('/(app)/(tabs)/(home)')}
              title="Alterar senha"
              {...chevronIcon}
            />
          </List.Section>
          <Divider />

          <List.Section>
            <List.Subheader>Sobre o App</List.Subheader>
            <List.Item
              onPress={() => router.push('/(app)/(tabs)/(home)')}
              title="Política de Privacidade"
              {...chevronIcon}
            />
          </List.Section>


          <List.Section>
            <List.Item
              onPress={() => {
                showActionSheetWithOptions({
                  options: ['Cancelar', 'Sair da sua conta'],
                  cancelButtonIndex: 0,
                  destructiveButtonIndex: 1
                }, (selectedIndex) => {
                  switch(selectedIndex) {
                    case 1:
                      signOut()
                  }
                })
              }}
              title="Sair"
              titleStyle={{ color: 'red' }}
              {...chevronIcon}
            />
          </List.Section>

          {/* Dados pessoais
        senha de acesso

        sair


        politica de privacidade */}
        </ScrollView>
      </ScreenContent>
    );
  }
}


const chevronIcon = {
  right: (props: any) => <List.Icon {...props} icon={'chevron-right'} />
}

const renderItem = (label: string, value?: string | null) => {
  return (
    <Row>
      <Row.Title>{label}</Row.Title>
      {value && (
        <Row.Description>{value}</Row.Description>
      )}
    </Row>
  )
}
