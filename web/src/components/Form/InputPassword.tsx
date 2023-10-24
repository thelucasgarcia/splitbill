'use client'

import React, { useState } from 'react';
import { Button, Input, InputProps } from '@nextui-org/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(function InputPassword(props, ref) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const Icon = isVisible ? FaEyeSlash : FaEye;
  return (
    <Input
      {...props}
      ref={ref}
      endContent={
        <Button isIconOnly variant='light' onClick={toggleVisibility}>
          <Icon />
        </Button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
})

export default InputPassword;