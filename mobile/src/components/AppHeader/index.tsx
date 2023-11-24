import { useSession } from '@/auth/context';
import theme from '@/constants/theme';
import LoaderScreen from '@Components/LoaderScreen';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const AVATAR_DEFAULT = 'https://api.dicebear.com/avatar.svg'

interface AppHeaderProps {
  color?: string
}
export default function AppHeader({ color } : AppHeaderProps) {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <LoaderScreen />
  }

  if (user) {
    const { email, name } = user
    return (
      <View style={{ backgroundColor: theme.colors.primary }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20, marginBottom: 10 }} >
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
      </View>
    )
  }

  return null
}