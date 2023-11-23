import { useSession } from '@/auth/context';
import { useBills } from '@/bff/queries/bill';
import { useUsers } from '@/bff/queries/user';
import AppHeader from '@Components/AppHeader';
import ScreenContainer from '@Components/ScreenContainer';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, FlatList } from 'react-native';
import { Avatar, BorderRadiuses, Card, Colors, Dividers, Image, ListItem, Text, View } from 'react-native-ui-lib';

export default function Index() {
  const { session, signOut, user, tokens } = useSession();
  const { data, isFetching, isRefetching, refetch } = useBills({
    token: tokens?.access_token || ''
  })
  const params = useLocalSearchParams()
  const router = useRouter();
  if (user) {
    return (
      <ScreenContainer>
        <AppHeader email={user?.email} name={user.name} />
        <FlatList
          data={data}
          refreshing={isRefetching}
          onRefresh={refetch}
          ItemSeparatorComponent={() => <View marginV-5></View>}
          stickyHeaderHiddenOnScroll={false}
          ListHeaderComponent={() => <Text text50BL marginB-10>Bills</Text>}
          renderItem={({ item, index }) => (
            <Card key={item.id + index} enableShadow={false} >
              <ListItem padding-10 onPress={() => { router.push(`/(app)/bill/${item.id}`) }} spread>
                <ListItem.Part middle column containerStyle={{ justifyContent: 'space-evenly'}}>
                  <ListItem.Part >
                    <Text text70BO>{item.name}</Text>
                    <Text text70>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total || 0)}</Text>
                  </ListItem.Part>

                  <ListItem.Part>
                    <Text
                      text90L
                      grey40
                      numberOfLines={1}
                    >{Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.createdAt))}</Text>

                    <Text text90L grey40 numberOfLines={1}>
                      {item.members.length} participantes
                    </Text>
                  </ListItem.Part>
                </ListItem.Part>
              </ListItem>
            </Card>
          )}
        />

      </ScreenContainer>
    );
  }
  return null
}
