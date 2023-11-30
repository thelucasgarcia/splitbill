import theme from '@/constants/theme'
import { useDebounce } from '@/hooks/debounce'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper'

interface InputSearchProps {
  value?: string
}
function InputSearch({ value }: InputSearchProps) {
  const { search } = useLocalSearchParams<{ search: string }>()
  return (
    <Searchbar
      value={search}
      onChangeText={text => router.setParams({ search: text })}
      mode='bar'
      placeholder='Pesquisar'
      style={{ backgroundColor: theme.colors.elevation.level1 }}
      enablesReturnKeyAutomatically
    />
  )
}

export default InputSearch