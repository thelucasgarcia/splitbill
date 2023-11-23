import { FontAwesome } from '@expo/vector-icons';
import { Avatar, Colors, Icon, Text, TouchableOpacity, View } from 'react-native-ui-lib';

interface Props {
  name: string
  email: string,
  avatar?: string
}
const AVATAR_DEFAULT = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'

export default function AppHeader({ email, name, avatar }: Props) {
  return (
    <View row centerV spread marginV-20 >
      <View row centerV style={{ gap: 10 }}>
        <Avatar source={{ uri: avatar || AVATAR_DEFAULT }} />
        <View>
          <Text text70BO $textPrimary>{name}</Text>
          <Text $textNeutralLight>{email}</Text>
        </View>
      </View>
      <View row style={{ gap: 10 }}>
        <TouchableOpacity>
          <FontAwesome name='search' size={25} color={Colors.$iconPrimary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name='bell' size={25}  color={Colors.$iconPrimary}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}