import { useBills } from '@/bff/queries/bill'
import { BillResponse } from '@/bff/schemas/bill'
import { groupBy, map } from 'lodash'
import { SafeAreaView, SectionList, View } from 'react-native'
import { BillItem } from './BillItem'
import LoaderScreen from '@Components/LoaderScreen'
import { Divider, Text } from 'react-native-paper'
import theme from '@/constants/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import InputSearch from '@Components/Form/InputSearch'
import { useLocalSearchParams } from 'expo-router'

export function BillListSection() {
  const { search } = useLocalSearchParams<{ search: string }>()
  const { data, error, isLoading, isRefetching, refetch, } = useBills({ search })

  const insets = useSafeAreaInsets();
  const organizeDataByDateWithLodash = (data: BillResponse[]) => {
    // Agrupar os itens pela data de criação usando _.groupBy do Lodash
    const groupedData = groupBy(data, (item) => Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(item.createdAt)));

    // Converter o objeto agrupado em um array de seções
    const sectionsArray = map(groupedData, (value, key) => ({
      title: key,
      data: value,
    })).reverse();

    return [...sectionsArray, ...sectionsArray, ...sectionsArray];
  };

  if (error) {
    return <Text>{`[${error.name}] - ${error.message}`}</Text>
  }


  return (
    <SectionList
      sections={organizeDataByDateWithLodash(data || [])}
      ListHeaderComponent={() => <InputSearch value={search} />}
      refreshing={isRefetching}
      onRefresh={refetch}
      keyExtractor={(key, index) => key.id + index}
      contentContainerStyle={{ gap: 10, padding: 20, paddingBottom: 0 }}
      scrollIndicatorInsets={insets}
      renderSectionHeader={({ section }) => (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingBottom: 5 }}>
          <Text variant='titleMedium'>{section.title}</Text>
        </View>
      )}
      renderItem={({ item, index }) => <BillItem key={item.id + index} item={item} />}
    />
  )
}