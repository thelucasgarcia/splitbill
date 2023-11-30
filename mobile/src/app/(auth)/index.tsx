
import ScreenContent from '@Components/ScreenContent';
import { Link } from 'expo-router';

import { Image, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export default function WelcomeScreen() {
  return (
    <ScreenContent>
      <View style={{ flex: 1, marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('@Assets/images/login-rafiki.png')} style={{ resizeMode: 'contain', height: 400 }} />
      </View>

      <View style={{ flex: 1, paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='titleLarge'>
          Todas as suas contas num só lugar
        </Text>
        <Text>
          Sinta a statisfação de ter o controle de suas financas
        </Text>
      </View>


      <Card>
        <Card.Content>
          <Link href={'/(auth)/sign-in'} asChild>
            <Button mode='contained'>
              Entrar
            </Button>
          </Link>

          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text>Não tem uma conta? <Link style={{ fontWeight: 'bold' }} href={'/(auth)/sign-up'}>Criar conta</Link></Text>
          </View>
        </Card.Content>
      </Card>


    </ScreenContent>
  );
}
