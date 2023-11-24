import { useSession } from '@/auth/context';
import ScreenContent from '@Components/ScreenContent';
import { Button, Text, View } from 'react-native-ui-lib';

export default function Settings() {
  const { session, signOut, user} = useSession();
  
  return (
    <ScreenContent center>
      <View>
        <Text>{user?.name}</Text>
        <Button onPress={signOut} label='Sign out' fullWidth />
      </View>
    </ScreenContent>
  );
}
