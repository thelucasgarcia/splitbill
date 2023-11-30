import { BillResponse } from '@/bff/schemas/bill';
import { formatCurrency, formatDate } from '@/hooks/useFormat';
import Row from '@Components/Grid/Row';
import { Link } from 'expo-router';
import { Card } from 'react-native-paper';



export function BillItem({ item }: { item: BillResponse }) {
  return (
    <Link key={item.id} href={`/bill/${item.id}`} asChild>
      <Card>
        <Card.Content>
          <Row>
            <Row.Title>{item.name}</Row.Title>
            <Row.Title>{formatCurrency(item.total)}</Row.Title>
          </Row>
          <Row>
            <Row.Description>{formatDate(item.createdAt)}</Row.Description>
            <Row.Description>{`${item.members.length} participantes`}</Row.Description>
          </Row>
        </Card.Content>
      </Card>
    </Link>
  )
}