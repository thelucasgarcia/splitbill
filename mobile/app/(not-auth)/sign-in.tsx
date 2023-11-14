import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios'
export default function SignInScreen() {
  const loginService = async (values: any): Promise<any> => {
    try {
      const response = await axios.post('https://splitbill-one.vercel.app/v1/auth/signin', values);
      
      return await response.data;
    } catch (error) {
      console.error("Error:", error);
    }
    
  }

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: loginService
  });

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
          mutateAsync(values).then(res => console.log(res))
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
            <Button onPress={() => handleSubmit()} title={isPending ? "Loading ..." : "Submit"} disabled={isPending} />
          </View>
        )}
      </Formik>
      <Link href={'/(not-auth)/sign-up'}>Register screen</Link>
    </View>
  );
}
