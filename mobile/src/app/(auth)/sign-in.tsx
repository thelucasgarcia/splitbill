
import { useSession } from '@/auth/context';
import { useSignIn } from '@/bff/queries/auth';
import ScreenContainer from '@/components/ScreenContainer/index';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Alert } from 'react-native';

import { Button, Colors, Text, TextField, View } from 'react-native-ui-lib';

export default function SignInScreen() {
  const [passVisibility, setPassVisibility] = useState(true)
  const { mutateAsync } = useSignIn()
  const { signIn } = useSession()

  const { handleChange, handleBlur, handleSubmit, isSubmitting, isValid, values } = useFormik({
    initialValues: {
      email: 'lucas@gmail.com',
      password: '123456'
    },
    onSubmit: (values) => {
      return mutateAsync(values).then((response) => {
        signIn(response)
      }).catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }
  })

  return (
    <ScreenContainer centerV>
      <View>

        <Text text50 $textPrimary marginV-s3 >Login</Text>

        <TextField
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          label='E-mail'
          placeholder={'email@email.com'}
          enableErrors
          validate={['required', 'email', (value: any) => value.length > 6]}
          validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
          showCharCounter
          leadingAccessory={<FontAwesome name={'envelope'} size={20} color={Colors.$iconPrimary} style={{ marginRight: 5 }} />}
        />
        <TextField
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          label="Senha"
          keyboardType='visible-password'
          secureTextEntry={passVisibility}
          trailingAccessory={<FontAwesome name={passVisibility ? 'eye' : 'eye-slash'} size={20} onPress={() => setPassVisibility(state => !state)} color={Colors.$iconPrimaryLight} />}
          bottomAccessory={<Link href={'/(auth)/sign-up'}>Esqueci minha senha</Link>}
          enableErrors
          showCharCounter
          validate={['required', (value: any) => value.length > 6]}
          validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
          leadingAccessory={<FontAwesome name={'lock'} size={25} color={Colors.$iconPrimary} style={{ marginRight: 5 }} />}
        />

        <Button
          marginT-20
          onPress={() => handleSubmit()}
          label={isSubmitting ? "Loading ..." : "Submit"}
          fullWidth
          disabled={!isValid}
        />


        <View center style={{ paddingVertical: 20 }}>
          <Text>New to the app? <Link style={{ fontWeight: 'bold' }} href={'/(auth)/sign-up'}>Register</Link></Text>
        </View>

      </View>
    </ScreenContainer>
  );
}
