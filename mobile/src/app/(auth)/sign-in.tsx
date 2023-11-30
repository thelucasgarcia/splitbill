
import { useSession } from '@/auth/context';
import { useSignIn } from '@/bff/queries/auth';
import theme from '@/constants/theme';
import Input, { InputPassword } from '@Components/Form/Input';
import ScreenContent from '@Components/ScreenContent';
import { Link, router } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { useRef } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

type ValidationSchema = yup.InferType<typeof validationSchema>

export default function SignInScreen() {

  const { mutateAsync } = useSignIn()
  const { signIn } = useSession()

  const formik = useFormik<ValidationSchema>({
    validationSchema: validationSchema,
    validateOnBlur: true,
    initialValues: {
      email: 'lucas@gmail.com',
      password: '123456'
    },
    onSubmit: (values) => {
      return mutateAsync(values).then(res => {
        signIn(res)
        router.replace('/(app)/(tabs)/(home)/')
      }).catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }
  })

  return (
    <ScreenContent>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('@Assets/images/login-pana.png')} style={{ resizeMode: 'contain', height: 400 }} />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Card>
            <Card.Title
              title={'Entrar'}
              titleVariant='titleLarge'
              subtitle="Acesse sua conta para começar a controlar sua grana"
            />
            <Card.Content>
              <FormikProvider value={formik}>

                <Input
                  name='email'
                  label='E-mail'
                  placeholder={'email@email.com'}
                  left={<TextInput.Icon icon="email" />}
                  keyboardType='email-address'
                />

                <InputPassword
                  name='password'
                  label="Senha"
                  left={<TextInput.Icon icon="lock" />}
                />

                <Button
                  mode='contained'
                  onPress={() => formik.handleSubmit()}
                  loading={formik.isSubmitting}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Continuar
                </Button>


                <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                  <Text>Não tem uma conta? <Link style={{ fontWeight: 'bold' }} href={'/(auth)/sign-up'}>Criar conta</Link></Text>
                </View>

              </FormikProvider>
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
      </View>
    </ScreenContent>
  );
}
