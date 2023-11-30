import Row from '@Components/Grid/Row';
import ScreenContent from '@Components/ScreenContent';
import { Link, Stack } from 'expo-router';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function NotFoundScreen() {
  return (
    <ScreenContent>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Row justifyContent='center' alignItems='center' flexDirection='column'>
        <Image source={require('@Assets/images/404.png')} style={{ resizeMode: 'contain', width: 400, height: 400 }} />
        <Row flexDirection='column' gap={20}>

          <Text variant='displayMedium' style={{ fontWeight: 'bold' }}>404</Text>
          <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>Oops, Página não encontrada</Text>
          <Text style={{ textAlign: 'center' }}>Lamentamos, mas a página que você solicitou não foi encontrada. Por favor, Volte para a página inicial!</Text>
          <Link href="/" asChild>
            <Button mode='contained-tonal'>Ir para o ínicio</Button>
          </Link>
        </Row>
      </Row>
    </ScreenContent>
  );
}
