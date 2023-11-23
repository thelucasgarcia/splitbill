import AppHeader from '@Components/AppHeader';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Colors } from 'react-native-ui-lib';

export default function AppLayout() {
   // This layout can be deferred because it's not the root layout.
  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.$iconDefaultLight,
      tabBarInactiveTintColor: Colors.$iconPrimaryLight,
      tabBarLabelPosition: 'below-icon',
      headerShadowVisible: true,
      tabBarHideOnKeyboard: true,
      headerTitleAlign: 'center',
      tabBarStyle: {
        backgroundColor: Colors.$backgroundPrimaryHeavy
      },
      headerStyle: {
        backgroundColor: Colors.$backgroundPrimaryHeavy
      },
      headerTintColor: 'white'
    }}>
      <Tabs.Screen name='(home)' options={{ 
        title: 'Home',
        headerShown: false,
        tabBarIcon: (props) => <FontAwesome name='home' { ...props } />,
      }} />
      <Tabs.Screen name='friends' options={{ 
        title: 'ADICIONAR AMIGOS',
        tabBarIcon: (props) => <FontAwesome name='address-book' { ...props } />,
      }} />
      <Tabs.Screen name='bill' options={{ 
        title: 'Criar Despesa',
        tabBarIcon: (props) => <FontAwesome name='plus' { ...props } />,
      }} />
      <Tabs.Screen name='calculator' options={{ 
        title: 'Criar Despesa',
        tabBarIcon: (props) => <FontAwesome name='calculator' { ...props } />,
      }} />
      <Tabs.Screen name='settings' options={{ 
        tabBarIcon: (props) => <FontAwesome name='cog' { ...props } />
      }} />
    </Tabs>
  );
}
