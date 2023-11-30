import { useBill } from '@/bff/queries/bill';
import { formatCurrency, formatDate } from '@/hooks/useFormat';
import HeaderButton from '@Components/HeaderButton';
import LoaderScreen from '@Components/LoaderScreen';
import ScreenContent from '@Components/ScreenContent';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, Divider, List, Text } from 'react-native-paper';

export default function BillDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, isSuccess, error, isRefetching, refetch } = useBill({ id })

  if (isLoading) {
    return <LoaderScreen message='Carregando Despesa' />
  }

  if (isSuccess) {
    return (
      <ScreenContent>
        <Stack.Screen options={{
          headerRight: ({ tintColor }) => (
            <HeaderButton color={tintColor} text='Editar' onPress={() => router.push(`/bill/edit/${data.id}`)} />
          )
        }} />

        <ScrollView
          indicatorStyle='default'

          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
          <Card>
            <Card.Title
              title={data.name}
              titleVariant='headlineSmall'

              subtitle={formatDate(data.createdAt)}
              subtitleVariant='bodySmall'
              right={({ size }) => <Text style={{ paddingHorizontal: size / 2 }} variant='headlineMedium'>{formatCurrency(data.total)}</Text>}
            />
            <Divider />
            <Card.Content>
              <View style={{ paddingVertical: 10 }}>
                <Text>{data.description}</Text>
              </View>
            </Card.Content>

          </Card>
          {data.members && (
            <List.Section>
              <List.Subheader>Participantes</List.Subheader>
              {data.members.map(item => (
                <List.Item
                  key={item.id}
                  title={`${item.member.name}`}
                />
              ))}
            </List.Section>
          )}
          {data.items && (
            <List.Section>
              <List.Subheader>Despesas</List.Subheader>
              {data.items.map(item => (
                <List.Item
                  key={item.id}
                  title={`${item.name} x ${item.quantity}`}
                  description={`${formatCurrency(item.price)} und`}
                  right={({ style }) => (
                    <View style={{ ...style }}>
                      <Text style={{ textAlign: 'right' }}>{formatCurrency(item.price * item.quantity)}</Text>
                    </View>
                  )}
                />
              ))}
            </List.Section>
          )}
        </ScrollView>
      </ScreenContent>
    )
  }

  return JSON.stringify(error?.message)
}