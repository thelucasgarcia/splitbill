import { useBills } from '@/bff/queries/bill'
import { Link } from 'expo-router'
import { FlatList, View } from 'react-native'

import { BillItem } from './BillItem'
import LoaderScreen from '@Components/LoaderScreen'
import { Text } from 'react-native-paper'

export function BillList() {
  const { data, error, isLoading, isRefetching, refetch } = useBills({})

  if (isLoading) {
    return <LoaderScreen message='Carregando Despesas...' />
  }

  if (error) {
    return <Text>{`[${error.name}] - ${error.message}`}</Text>
  }

  return (
    <FlatList
      data={data}
      refreshing={isRefetching}
      onRefresh={refetch}
      contentContainerStyle={{ gap: 10 }}
      stickyHeaderHiddenOnScroll={false}
      ListHeaderComponent={() => {
        return (
          <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Text variant='titleLarge'>Bills</Text>
            <Link href={'/(app)/(tabs)/bill'}>
              <Text>ver mais</Text>
            </Link>
          </View>
        )
      }}
      renderItem={({ item, index }) => <BillItem key={item.id + index} item={item} />}
    />
  )
}