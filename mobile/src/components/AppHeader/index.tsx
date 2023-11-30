import { useSession } from '@/auth/context';
import { AVATAR_DEFAULT } from '@/constants/defaults';
import theme from '@/constants/theme';
import LoaderScreen from '@Components/LoaderScreen';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface AppHeaderProps {
  color?: string
}
export default function AppHeader({ color }: AppHeaderProps) {
  const { user, isLoading } = useSession();
  const { top, left, right, bottom } = useSafeAreaInsets();
  console.log(useSafeAreaInsets())
  if (isLoading) {
    return <LoaderScreen />
  }

  if (user) {
    const { name } = user
    return (
      <>

        {/* <Appbar.Header style={{ backgroundColor: theme.colors.primary }} mode='small'>
            <Appbar.Content/>
            <Appbar.Action icon={() => <Avatar.Image size={45} source={{ uri: AVATAR_DEFAULT }} />}onPress={() => {}} />
          </Appbar.Header>
         */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: top,
          paddingBottom: bottom,
          paddingHorizontal: Math.max(left, right, 20),
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View>
              <Text variant='bodySmall' style={{ color: color || 'black' }}>Bem vindo,</Text>
              <Text variant='headlineMedium' style={{ color: color || 'black', fontWeight: 'bold' }}>{name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Avatar.Image size={45} source={{ uri: AVATAR_DEFAULT }} />
          </View>
        </View>
      </>
    )
  }

  return null
}