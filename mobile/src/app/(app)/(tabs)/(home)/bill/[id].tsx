import { useBill } from '@/bff/queries/bill';
import HeaderButton from '@Components/HeaderButton';
import ScreenContent from '@Components/ScreenContent';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Card, Colors, ListItem, LoaderScreen, Text } from 'react-native-ui-lib';

export default function BillDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, isSuccess, error } = useBill({ id })
  if (isLoading) {
    return <LoaderScreen message='Carregando Despesa' backgroundColor={Colors.$backgroundDark} />
  }

  if (isSuccess) {
    return (
      <ScreenContent>
        <Stack.Screen options={{
          headerRight: ({ tintColor }) => (
            <HeaderButton color={tintColor} text='Editar' onPress={() => router.push(`/bill/edit/${data.id}`)} />
          )
        }} />

        <Card disabled>
          <ListItem padding-10 spread>
            <ListItem.Part middle column containerStyle={{ justifyContent: 'space-evenly' }}>
              <ListItem.Part >
                <Text text70BO>{data.name}</Text>
                <Text text70>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.total || 0)}</Text>
              </ListItem.Part>

              <ListItem.Part>
                <Text
                  text90L
                  grey40
                  numberOfLines={1}
                >{Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(data.createdAt))}</Text>

                <Text text90L grey40 numberOfLines={1}>
                  {data.members.length} participantes
                </Text>
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Card>
        <Text>{data?.name || '123'}</Text>
        <Text>{data?.description || '123'}</Text>
        <Text>{data?.total || '123'}</Text>
        <Text>{data?.user.name || '123'}</Text>
        <Text>{data?.createdAt || '123'}</Text>
        <Text onPress={() => router.back()}>voltar</Text>
      </ScreenContent>
    )
  }

  return JSON.stringify(error?.message)
}