import { useSession } from '@/auth/context';
import { FontAwesome } from '@expo/vector-icons';
import { Redirect, Stack, Tabs } from 'expo-router';

import { Text } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export default function AppLayout() {
   // This layout can be deferred because it's not the root layout.
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.$iconPrimary,
      tabBarInactiveTintColor: Colors.$iconPrimaryLight,
    }}>
      <Tabs.Screen name='index' options={{ 
        title: 'Home',
        tabBarIcon: (props) => <FontAwesome name='home'{ ...props } />
      }} />
      <Tabs.Screen name='settings' options={{ 
        tabBarIcon: (props) => <FontAwesome name='cog'{ ...props } />
      }} />
    </Tabs>
  );
}
