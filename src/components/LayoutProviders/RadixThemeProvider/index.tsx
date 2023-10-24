import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import React, { PropsWithChildren } from 'react';

const RadixTheme: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Theme>
      {children}
    </Theme>
  );
}

export default RadixTheme;