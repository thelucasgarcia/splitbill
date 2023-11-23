import { useBill } from '@/bff/queries/bill';
import ScreenContainer from '@Components/ScreenContainer';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import { Stack, router, useGlobalSearchParams, useLocalSearchParams, useSearchParams } from 'expo-router';
import { Button } from 'react-native';
import { Card, ListItem, Text, View } from 'react-native-ui-lib';
import { Text as TextRn } from 'react-native'
import HeaderButton from '@Components/HeaderButton';
import { ScreenStackHeaderBackButtonImage, ScreenStackHeaderRightView, ScreenStackHeaderSubview } from 'react-native-screens';

export default function BillDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const navigation = useNavigation();
  const { data, isLoading, isSuccess, error } = useBill({ id })
  if (isLoading) {
    <View>Loading ...</View>
  }

  if (isSuccess) {
    return (
      <ScreenContainer>
        <Stack.Screen options={{
          headerRight: ({ tintColor }) => (
            <HeaderButton color={tintColor} text='Editar' onPress={() => router.push(`/(app)/bill/edit/${data.id}`)} />
          )
        }} />

        <Card >
          <ListItem padding-10 spread>
            <ListItem.Part middle column containerStyle={{ justifyContent: 'space-evenly' }}>
              <ListItem.Part >
                <Text text70BO>{data.name}</Text>
                <Text text70>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.total || 0)}</Text>
              </ListItem.Part>

              <ListItem.Part>
                <Text
                  text90L
                  grey40
                  numberOfLines={1}
                >{Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(data.createdAt))}</Text>

                <Text text90L grey40 numberOfLines={1}>
                  {data.members.length} participantes
                </Text>
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Card>
        <Text>{data?.name || '123'}</Text>
        <Text>{data?.description || '123'}</Text>
        <Text>{data?.total || '123'}</Text>
        <Text>{data?.user.name || '123'}</Text>
        <Text>{data?.createdAt || '123'}</Text>
        <Text onPress={() => router.back()}>voltar</Text>
      </ScreenContainer>
    )
  }

  return JSON.stringify(error?.message)
}