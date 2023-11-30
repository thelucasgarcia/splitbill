import { useSession } from '@/auth/context';
import { useUser } from '@/bff/queries/user';
import { formatDate } from '@/hooks/useFormat';
import Row from '@Components/Grid/Row';
import LoaderScreen from '@Components/LoaderScreen';
import ScreenContent from '@Components/ScreenContent';
import { View } from 'react-native';
import { Banner, Card, Text } from 'react-native-paper';

export default function PersonalData() {
  const { user } = useSession();
  const { data, isLoading, refetch, isRefetching } = useUser({ id: user?.sub || '' })

  if (isLoading) {
    return <LoaderScreen />
  }

  return (
    <ScreenContent style={{ gap: 20 }}>

      <Card>
        <Card.Title title="Nome" subtitle={data?.name} />
        <Card.Title title="CPF" subtitle={data?.cpf || 'Cpf não cadastrado'} />
        <Card.Title title="Telefone" subtitle={data?.phone || 'Telefone não cadastrado'} />
        <Card.Title title="Conta criada" subtitle={formatDate(data!.createdAt)} />
      </Card>

      <Banner visible icon={'information-outline'} elevation={1}>
        Se precisar alterar seus dados, entre em contato na central de Ajuda.
      </Banner>
    </ScreenContent>
  );

}
