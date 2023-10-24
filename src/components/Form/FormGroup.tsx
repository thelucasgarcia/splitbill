'use client'

import { Input, useInput } from '@nextui-org/react'
import { get } from 'lodash'
import { ChangeEvent, ComponentPropsWithoutRef, ElementType } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface FormGroupProps<T extends ElementType> {
  id?: string
  name: string
  component?: T
  registerOptions?: RegisterOptions
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
}

type Props<T extends ElementType = typeof Input> = FormGroupProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FormGroupProps<T>>

const FormGroup = <T extends ElementType = typeof Input>({
  id,
  name,
  component,
  registerOptions = {},
  onChange,
  required,
  disabled,
  ...props
}: Props<T>) => {
  const { register } = useFormContext()
  const Component = component || Input
  const { formState } = useFormContext()
  const formItemError = get(formState.errors, name)
  return (
    <>
      <Component
        id={id || name}
        errorMessage={formItemError?.message}
        radius={'sm'}
        isRequired={required}
        isDisabled={disabled}
        labelPlacement="outside"
        placeholder=" "
        {...props}
        {...register(name, { onChange, required: { message: "Campo obrigatório", value: !!required }, ...registerOptions })}
      />
    </>
  )
}

export default FormGroup

const dictionary = {
  en: {
    invalidGenericError: 'Invalid field',
    required: 'Required field',
  },
  pt: {
    invalidGenericError: 'Campo inválido',
    required: 'Campo obrigatório',
  },
} as const
