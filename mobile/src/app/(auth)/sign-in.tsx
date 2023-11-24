
import { useSession } from '@/auth/context';
import { useSignIn } from '@/bff/queries/auth';
import theme from '@/constants/theme';
import ScreenContent from '@Components/ScreenContent';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useFormik } from 'formik';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Alert, Image, KeyboardAvoidingView } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';

import { Colors, TextField, View } from 'react-native-ui-lib';

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
    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: theme.colors.scrim }}>
      <View style={{ flex: 1 }}>
        <Image source={require('@Assets/svg/login2.svg')} style={{ resizeMode: 'contain', flex: 1, marginHorizontal: 'auto'}}  />
      </View>

      <Card>
        <Card.Content>
          <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', gap: 20, padding: 20, paddingBottom: 50 }}>
            <Text variant='headlineMedium' style={{ color: useTheme().colors.primary }}>Login</Text>

            <TextInput
              mode='outlined'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              label='E-mail'
              placeholder={'email@email.com'}
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              mode='outlined'
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              label="Senha"
              keyboardType='visible-password'
              secureTextEntry={passVisibility}
              right={<TextInput.Icon icon={passVisibility ? "eye" : "eye-off"} onPress={() => setPassVisibility(state => !state)} />}

              left={<TextInput.Icon icon="lock" />}
            />

            <Button
              mode='contained'
              onPress={() => handleSubmit()}
              loading={isSubmitting}
              disabled={!isValid}
            >{isSubmitting ? "Loading ..." : "Submit"}</Button>


            <View center style={{ paddingVertical: 20 }}>
              <Text>New to the app? <Link style={{ fontWeight: 'bold' }} href={'/(auth)/sign-up'}>Register</Link></Text>
            </View>

          </KeyboardAvoidingView>
        </Card.Content>
      </Card>
    </View>
  );
}
