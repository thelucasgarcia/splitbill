import { useField } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Switch as SwitchPaper, SwitchProps } from 'react-native-paper';

interface InputProps extends SwitchProps {
  name: string
}

export default function InputSwitch({ name, ...props }: InputProps) {
  const [field, _meta, helper] = useField(name)
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <SwitchPaper
        value={field.value}
        onValueChange={e => { helper.setValue(e) }}
        {...props}
      />
    </View>
  )
}
