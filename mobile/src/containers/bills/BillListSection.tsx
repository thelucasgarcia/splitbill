import { useBills } from '@/bff/queries/bill'
import { BillResponse } from '@/bff/schemas/bill'
import { groupBy, map } from 'lodash'
import { SectionList } from 'react-native'
import { BillItem } from './BillItem'
import LoaderScreen from '@Components/LoaderScreen'
import { Text } from 'react-native-paper'

interface BillListSectionProps {
  search?: string 
}
export function BillListSection({ search} : BillListSectionProps) {
  const { data, error, isLoading, isRefetching, refetch } = useBills({ search })

  const organizeDataByDateWithLodash = (data: BillResponse[]) => {
    // Agrupar os itens pela data de criação usando _.groupBy do Lodash
    const groupedData = groupBy(data, (item) => Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(item.createdAt)));

    // Converter o objeto agrupado em um array de seções
    const sectionsArray = map(groupedData, (value, key) => ({
      title: key,
      data: value,
    }));

    return sectionsArray;
  };

  if (isLoading) {
    return <LoaderScreen message='Carregando Despesas...' />
  }

  if (error) {
    return <Text>{`[${error.name}] - ${error.message}`}</Text>
  }

  if (data) {
    return (
      <SectionList
        sections={organizeDataByDateWithLodash(data)}
        refreshing={isRefetching}
        onRefresh={refetch}
        contentContainerStyle={{ gap: 10 }}
        stickyHeaderHiddenOnScroll={false}
        renderSectionHeader={({ section }) => <Text variant='titleMedium'>{section.title}</Text>}

        keyExtractor={(key, index) => key.id + index}
        renderItem={({ item, index }) => <BillItem key={item.id + index} item={item} />}
      />
    )
  }
}