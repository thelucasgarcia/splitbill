import { useBills } from '@/bff/queries/bill'
import { useRouter } from 'expo-router'
import { FlatList } from 'react-native'
import { Card, Colors, ListItem, LoaderScreen, Text, View } from 'react-native-ui-lib'

export function BillList() {
  const { data, error, isLoading, isRefetching, refetch } = useBills({})
  const router = useRouter();

  if (isLoading) {
    return <LoaderScreen message='Carregando Despesas...' />
  }

  if (error) {
    return <Text $textDanger>{`[${error.name}] - ${error.message}`}</Text>
  }

  return (
    <FlatList
      data={data}
      refreshing={isRefetching}
      onRefresh={refetch}
      contentContainerStyle={{ gap: 10 }}
      stickyHeaderHiddenOnScroll={false}
      ListHeaderComponent={() => <Text text50BL marginB-10 white>Bills</Text>}
      renderItem={({ item, index }) => (
        <Card key={item.id + index} enableShadow={false} backgroundColor={Colors.$backgroundNeutralHeavy} elevation={4} >
          <ListItem padding-10 onPress={() => { router.push(`/bill/${item.id}`) }} spread>
            <ListItem.Part middle column containerStyle={{ justifyContent: 'space-evenly' }}>
              <ListItem.Part >
                <Text text70BO white>{item.name}</Text>
                <Text text70 white>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total || 0)}</Text>
              </ListItem.Part>

              <ListItem.Part>
                <Text
                  text90L
                  grey10
                  numberOfLines={1}
                >{Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.createdAt))}</Text>

                <Text text90L grey10 numberOfLines={1}>
                  {item.members.length} participantes
                </Text>
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Card>
      )}
    />
  )
}