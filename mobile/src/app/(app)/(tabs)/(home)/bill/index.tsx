import { BillList } from '@/containers/bills/BillList';
import { BillListSection } from '@/containers/bills/BillListSection';
import { useDebounce } from '@/hooks/debounce';
import HeaderButton from '@Components/HeaderButton';
import ScreenContent from '@Components/ScreenContent';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import { debounce } from 'lodash';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Searchbar, Text } from 'react-native-paper';
import { TextField, View } from 'react-native-ui-lib';

export default function BillsList() {
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1500)

  return (
    <ScreenContent>
      <View style={{ marginBottom: 20 }}>
        <Searchbar value={search} onChangeText={e => {
          setSearch(e)
        }} mode='bar' placeholder='Pesquisar' />
      </View>
      <BillListSection search={debouncedSearch} />
    </ScreenContent>
  )
}