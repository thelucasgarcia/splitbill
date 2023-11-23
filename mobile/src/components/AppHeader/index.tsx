import { useSession } from '@/auth/context';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar, Colors, Icon, LoaderScreen, Text, TouchableOpacity, View } from 'react-native-ui-lib';

const AVATAR_DEFAULT = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'

export default function AppHeader() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <LoaderScreen message='Carregando ...'/>
  }

  if (user) {
    const { email, name } = user
    return (
      <View backgroundColor={Colors.$backgroundPrimaryHeavy}>
        <View row centerV spread margin-20 marginB-10 useSafeArea >
          <View row centerV style={{ gap: 10 }}>
            <Avatar source={{ uri: AVATAR_DEFAULT }} />
            <View>
              <Text text70BO white>{name}</Text>
              <Text white>{email}</Text>
            </View>
          </View>
          <View row style={{ gap: 10 }}>
            <TouchableOpacity>
              <FontAwesome name='search' size={25} color='white' />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name='bell' size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return null
}