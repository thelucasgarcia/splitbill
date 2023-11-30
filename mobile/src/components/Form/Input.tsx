import theme from '@/constants/theme';
import { useField } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, Text, TextInput, TextInputProps } from 'react-native-paper';

interface InputProps extends TextInputProps {
  name: string
  hint?: string
}

export default function Input({ name, hint, ...props }: InputProps) {
  const [field, meta] = useField(name)
  const isError = !!meta.error && !!meta.touched
  return (
    <View>
      <TextInput
        mode='outlined'
        value={field.value}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
        error={isError}
        keyboardAppearance='dark'
        {...props}
      />
      {!!hint && (
        <HelperText type='info'>{hint}</HelperText>
      )}
      <HelperText type='error' visible={isError}>{meta.error || ''}</HelperText>
    </View>
  )
}

export function InputPassword(props: InputProps) {
  const [passVisibility, setPassVisibility] = React.useState(true)
  return (
    <Input
      {...props}
      keyboardType={passVisibility ? 'visible-password' : 'default' }
      secureTextEntry={passVisibility}
      right={<TextInput.Icon icon={passVisibility ? "eye" : "eye-off"} onPress={() => setPassVisibility(state => !state)} />}
    />
  )
}

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
    marginTop: 5
  }
})