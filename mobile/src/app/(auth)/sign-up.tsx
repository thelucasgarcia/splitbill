
import { useSession } from '@/auth/context';
import { useAuthAttempt, useSignIn, useSignUp } from '@/bff/queries/auth';
import { queryClient } from '@/config/query-client';
import theme from '@/constants/theme';
import { useDebounce } from '@/hooks/debounce';
import Input, { InputPassword } from '@Components/Form/Input';
import ScreenContent from '@Components/ScreenContent';
import { Link } from 'expo-router';
import { FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Crie uma senha com pelo menos 6 caracteres.')
    .required('Password is required'),
  name: yup.string().trim().min(3).max(60).required(),
  username: yup.string().trim().min(1).max(30).required()
});

type ValidationSchema = yup.InferType<typeof validationSchema>

export default function SignUpScreen() {

  const { mutateAsync: register } = useSignUp()

  const { signIn } = useSession()
  const { mutateAsync: attempt } = useAuthAttempt()
  const formik = useFormik<ValidationSchema>({
    validationSchema: validationSchema,
    initialValues: {
      email: 'lucas@gmail.com',
      password: '123456',
      name: 'Bento',
      username: 'bentin'
    },
    validateOnBlur: true,
    onSubmit: (values) => {
      return register(values).then(signIn).catch(error => {
        Alert.alert(error.response.data.code, error.response.data.details)
      })
    }
  })

  const usernameDebouce = useDebounce(formik.values.username)

  useEffect(() => {
    if (usernameDebouce) {
      attempt({ username: usernameDebouce }).then((res) => {
        if (res.username) {
          formik.setFieldError('username', 'Esse nome de usuário não está disponivel. Tente outro nome');
        }
      }).catch(res => res);
    }
  }, [usernameDebouce])

  return (
    <ScreenContent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('@Assets/images/login-rafiki.png')} style={{ resizeMode: 'contain', flex: 1 }} />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Card>
            <Card.Title title="Cadastre-se" titleVariant='titleLarge' />
            <Card.Content>
              <FormikProvider value={formik}>
                <Input
                  name='email'
                  label='E-mail'
                  placeholder={'email@email.com'}
                  left={<TextInput.Icon icon="email" />}
                />

                <Input
                  name='name'
                  label='Nome completo'
                  left={<TextInput.Icon icon="account" />}
                />

                <Input
                  name='username'
                  label='Nome de usuário'
                  left={<TextInput.Icon icon="account-check" />}
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
                  Registrar
                </Button>
              </FormikProvider>


              <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text>Já tem uma conta? <Link style={{ fontWeight: 'bold' }} href={'/(auth)/sign-in'}>Fazer login</Link></Text>
              </View>

            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
   
    </ScreenContent>
  );
}
