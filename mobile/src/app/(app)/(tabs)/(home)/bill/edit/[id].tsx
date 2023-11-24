import { useBill } from '@/bff/queries/bill';
import HeaderButton from '@Components/HeaderButton';
import ScreenContent from '@Components/ScreenContent';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useFormik } from 'formik';
import { Switch as SwitchRN } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { Card, Colors, LoaderScreen, Text, View } from 'react-native-ui-lib';
const GAP = 20
export default function BillDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, isSuccess, error } = useBill({ id })

  if (isLoading) {
    return <LoaderScreen />
  }
  
  const { handleChange, setFieldValue, handleBlur, values, isValid, isSubmitting, dirty } = useFormik({
    initialValues: {
      inviteMembers: data?.inviteMembers,
      editValues: data?.editValues
    },
    onSubmit: () => {

    }
  })

  if (isSuccess) {
    return (
      <ScreenContent>
        <Stack.Screen options={{
          headerRight: ({ tintColor }) => (
            <HeaderButton color={tintColor} text='Salvar' disabled={!dirty && isValid} onPress={() => { }}/>
          )
        }} />
        <View style={{ gap: GAP }}>
          <Card padding-10 style={{ gap: GAP }}>
            <View row centerV spread>
              <Text text70 grey10>Adicionar Participantes</Text>

              <SwitchRN value={values.inviteMembers} onValueChange={(value) => {
                setFieldValue('inviteMembers', value)
              }} />
            </View>
            <View row centerV spread>
              <Text text70>Editar configurações do grupo</Text>
              <Switch value={values.editValues} onValueChange={(value) => {
                setFieldValue('editValues', value)
              }} />
            </View>
          </Card>
          <Card padding-10 style={{ gap: GAP }}>
            <View row centerV spread>
              <Text text70>Autorizar novos participantes</Text>
              <Switch value={false} onValueChange={() => console.log('value changed')} />
            </View>
          </Card>
          <Card padding-10 style={{ gap: GAP }}>
            <View row centerV spread>
              <View centerV spread>
                <Text text70>Admins do grupo</Text>
                <Text text90 grey40>{data.user.name}</Text>
              </View>
              <FontAwesome name='chevron-right' size={15} color={Colors.$textNeutralLight} />
            </View>
          </Card>
        </View>
      </ScreenContent>
    )
  }

  return JSON.stringify(error?.message)
}