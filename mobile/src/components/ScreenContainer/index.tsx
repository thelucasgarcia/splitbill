import React, { PropsWithChildren } from 'react';
import { Colors, View, ViewProps } from 'react-native-ui-lib';

const ScreenContainer = (({ children, ...props }: PropsWithChildren<ViewProps>) => {
  return (
    <View flex backgroundColor={Colors.$backgroundDark} >
      <View flex margin-20 bg-primary {...props}>
        {children}
      </View>
    </View>
  );
})

export default ScreenContainer;