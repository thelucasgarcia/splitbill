'use client'

import DividerText from '@/components/DividerText';
import FormGroup from '@/components/Form/FormGroup';
import InputPassword from '@/components/Form/InputPassword';
import { Button } from '@nextui-org/react';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useMutation } from 'react-query';

export default function Page() {
  const formMethods = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectParam = searchParams?.get('redirect');
  const [error, setError] = useState(searchParams?.get('error'));
  const params = { callbackUrl: redirectParam || '/', redirect: false };

  const { mutateAsync, isLoading } = useMutation('login', async (data: any) => {
    try {
      const response = await signIn('credentials', { ...data, ...params })
      if (response?.error) {
        setError(response?.error)
      }

      if (response?.url) {
        router.replace(params.callbackUrl);
      }
    } catch (error: any) {
      setError(error?.message)
    }
  })

  return (
    <FormProvider {...formMethods}>
      <Heading size='8' weight='bold' mb="5">Login</Heading>
      <Flex asChild direction="column" gap="4">
        <Form onSubmit={({ data }) => mutateAsync(data)}>
          <FormGroup
            name='username'
            label="Username"
          />
          <FormGroup
            name="password"
            label="Password"
            component={InputPassword}
          />
          <Text className="text-danger-300">{error}</Text>
          <Button
            color='primary'
            variant='shadow'
            type='submit'
            isLoading={isLoading}
            isDisabled={!formMethods.formState.isValid}
          >
            Fazer login
          </Button>

          <DividerText>OR</DividerText>

          <Button
            variant='shadow'
            startContent={<FaGoogle />}
            className='bg-white text-red-400'
            onPress={() => signIn('google', params)}
          >
            Login in with Google
          </Button>
        </Form>
      </Flex>
    </FormProvider>
  )
}
