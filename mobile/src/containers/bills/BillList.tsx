import { useBills } from '@/bff/queries/bill'
import { Link } from 'expo-router'
import { FlatList, RefreshControl, View } from 'react-native'

import { BillItem } from './BillItem'
import LoaderScreen from '@Components/LoaderScreen'
import { Button, Text } from 'react-native-paper'
import Row from '@Components/Grid/Row'

export function BillList() {
  const { data, error, isLoading, isRefetching, refetch } = useBills()

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
      ListHeaderComponent={() => {
        return (
          <Row>
            <Row.Title variant='titleLarge'>Bills</Row.Title>
            <Link href={'/(app)/(tabs)/bill'} asChild><Button>ver mais</Button></Link>
          </Row>
        )
      }}
      renderItem={({ item, index }) => <BillItem key={item.id + index} item={item} />}
    />
  )
}