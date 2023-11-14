import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text>Tab Two</Text>
      <Link href={'/(not-auth)/sign-in'}>Login screen</Link>
    </View>
  );
}
