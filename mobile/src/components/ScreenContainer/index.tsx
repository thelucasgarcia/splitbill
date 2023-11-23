import React, { PropsWithChildren } from 'react';
import { Colors, View, ViewProps } from 'react-native-ui-lib';

const ScreenContainer = (({ children, ...props }: PropsWithChildren<ViewProps>) => {
  return (
    <View flex backgroundColor={Colors.$background}>
      <View useSafeArea flex margin-20 {...props}>
        {children}
      </View>
    </View>
  );
})

export default ScreenContainer;