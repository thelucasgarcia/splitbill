import { BillResponse } from '@/bff/schemas/bill'
import { useRouter } from 'expo-router'
import { Card, List, Text } from 'react-native-paper';
import { ListItem } from 'react-native-ui-lib'


export function BillItem({ item }: { item: BillResponse }) {
  const router = useRouter();

  return (
    <Card onPress={() => { router.push(`/bill/${item.id}`) }}>
      <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
      <List.Item
        title={item.name}
        description={Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.createdAt))}
      />
      <List.Item
        title={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total || 0)}
        description={`${item.members.length} participantes`}
      />
      </Card.Content>
    </Card>
  )
}