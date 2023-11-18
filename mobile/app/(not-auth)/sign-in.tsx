import axios from 'axios';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import { Button, Text, TextInput, View } from 'react-native';
export default function SignInScreen() {
  return (
    <View className='flex-1 justify-center p-10 items-center'>
      <Text className='font-bold text-3xl'>Bem vindo de volta</Text>
      <Text className='font-thin'>Como deseja fazer login?</Text>
      <Formik
        initialValues={{
          email: "lucas@gmail.com",
          password: "123456"
      }}
        onSubmit={values => {

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View className='w-full'>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType='phone-pad'
              className='px-5 py-3 w-full bg-slate-400 text-white border-blue-950 border-2 rounded-xl'
            />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              keyboardType='visible-password'
              className='px-5 py-3 w-full bg-slate-400 text-white border-blue-950 border-2 rounded-xl'
              secureTextEntry
            />
            <Button onPress={() => handleSubmit()} title={"Loading ..." || "Submit"} />
          </View>
        )}
      </Formik>
      <Link href={'/(not-auth)/sign-up'}>Register screen</Link>
    </View>
  );
}
