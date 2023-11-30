import { useBill } from '@/bff/queries/bill';
import InputSwitch from '@Components/Form/InputSwitch';
import HeaderButton from '@Components/HeaderButton';
import LoaderScreen from '@Components/LoaderScreen';
import ScreenContent from '@Components/ScreenContent';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { Alert, View } from 'react-native';

import { Button, Card, Text } from 'react-native-paper';
const GAP = 20

export default function BillDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, isSuccess, error } = useBill({ id })

  if (isLoading) {
    return <LoaderScreen />
  }

  if (isSuccess) {

    const formik = useFormik({
      initialValues: {
        inviteMembers: data.inviteMembers,
        editValues: data.editValues
      },
      onSubmit: () => {
        Alert.alert('Successo !', 'Sua despesa foi salvo com sucesso')
        formik.resetForm(formik)
        if (router.canGoBack()) {
          router.back()
        }
      }
    })

    return (
      <ScreenContent>
        <Stack.Screen options={{
          headerRight: ({ tintColor }) => (
            <HeaderButton color={tintColor} text='Salvar' disabled={!formik.dirty && formik.isValid} onPress={formik.submitForm} />
          )
        }} />

        <FormikProvider value={formik}>
          <View style={{ gap: GAP }}>
            <Card>
              <Card.Title
                title="Adicionar Participantes"
                right={({ size }) => (
                  <Card.Actions>
                    <InputSwitch name="inviteMembers" />
                  </Card.Actions>
                )} />
              <Card.Title title="Editar configurações do grupo"
                right={() => (
                  <Card.Actions>
                    <InputSwitch name="editValues" />
                  </Card.Actions>
                )} />
            </Card>
            <Card>
              <Card.Title title="Autorizar novos participantes"
                right={() => (
                  <Card.Actions>
                    <InputSwitch name="editValues" />
                  </Card.Actions>
                )} />
            </Card>

            <Card>
              <Card.Title title="Admin do grupo" subtitle={data.user.name} />
            </Card>
          </View>
        </FormikProvider>

      </ScreenContent>
    )
  }

  return JSON.stringify(error?.message)
}