
import { useCreatePost } from '@/bff/queries/user';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import { Button, Text, TextField, Toast, View } from 'react-native-ui-lib';
import ScreenContainer from '../../src/components/ScreenContainer/index';
export default function SignInScreen() {

  const { mutateAsync, data, isSuccess} = useCreatePost()
  return (
    <ScreenContainer>
      <Text text30M>Bem vindo de volta</Text>
      <Text>Como deseja fazer login?</Text>
  
      <Formik
        initialValues={{
          email: "lucas@gmail.com",
          password: "123456"
      }}
        onSubmit={values => {
          return mutateAsync({
             userId : 1,
             body: 'teste',
             title: 'teste'
          }).then(() => {

          })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <View  width={5}>
            <TextField
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={'Placeholder'}
              floatingPlaceholder
              enableErrors
              validate={['required', 'email', (value: any) => value.length > 6]}
              validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
              showCharCounter
              maxLength={30}
            />
            <TextField
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              keyboardType='visible-password'
              className='px-5 py-3 w-full bg-slate-400 text-white border-blue-950 border-2 rounded-xl'
              secureTextEntry
            />
            <Button onPress={() => handleSubmit()}>
              <Text>{isSubmitting ? "Loading ..." : "Submit"} </Text>
              </Button>
          </View>
        )}
      </Formik>
      <Link href={'/(not-auth)/sign-up'}>Register screen</Link>

      <Toast
  visible={isSuccess}
  position={'top'}
  message={'Criado com sucesso!'}
  autoDismiss={1000}
></Toast>

    </ScreenContainer>
  );
}
