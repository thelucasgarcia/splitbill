import { useCreateBill } from '@/bff/queries/bill';
import ScreenContent from '@Components/ScreenContent';
import { useFormik } from 'formik';
import { Alert } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export default function Friends() {
  const { mutateAsync } = useCreateBill()
  const { handleChange, handleBlur, handleSubmit, isSubmitting, isValid, values } = useFormik({
    initialValues: {
      name: '',
      description: '',
      tags: []
    },
    onSubmit: (values) => {
      return mutateAsync(values).catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }
  })
 
  return (
    <ScreenContent center>
      <View>
        <Text white>Convidar amigos</Text>
      </View>
    </ScreenContent>
  );
}
