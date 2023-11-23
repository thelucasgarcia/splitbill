import signIn from '@/app/(auth)/sign-in';
import { useSession } from '@/auth/context';
import { useCreateBill } from '@/bff/queries/bill';
import ScreenContainer from '@Components/ScreenContainer';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { useFormik } from 'formik';
import { Alert } from 'react-native';
import { Button, Colors, LoaderScreen, Text, TextField, View } from 'react-native-ui-lib';

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
    <ScreenContainer center>
      <View>
        <Text white>Convidar amigos</Text>
      </View>
    </ScreenContainer>
  );
}
