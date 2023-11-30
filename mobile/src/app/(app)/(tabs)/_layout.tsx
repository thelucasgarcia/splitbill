import theme from '@/constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function AppLayout() {
   // This layout can be deferred because it's not the root layout.
  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarShowLabel: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onBackground,
      tabBarLabelPosition: 'below-icon',
      headerShadowVisible: true,
      tabBarHideOnKeyboard: true,
      headerTitleAlign: 'center',
      headerLeftLabelVisible: true,
      tabBarStyle: {
        backgroundColor: theme.colors.elevation.level1,
        borderWidth: 0,
        borderTopWidth: 0,
      },
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
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
      <Tabs.Screen name='(settings)' options={{ 
        title: 'Configurações',
        headerShown: false,
        tabBarIcon: (props) => <FontAwesome name='cog' { ...props } />
      }} />
    </Tabs>
  );
}
