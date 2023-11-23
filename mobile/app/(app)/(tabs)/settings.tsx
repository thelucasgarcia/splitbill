import { useSession } from '@/auth/context';
import ScreenContainer from '@Components/ScreenContainer';
import { Button, Text, View } from 'react-native-ui-lib';

export default function Settings() {
  const { session, signOut, user} = useSession();
  
  return (
    <ScreenContainer center>
      <View>
        <Text>{user?.name}</Text>
        <Button onPress={signOut} label='Sign out' fullWidth />
      </View>
    </ScreenContainer>
  );
}
