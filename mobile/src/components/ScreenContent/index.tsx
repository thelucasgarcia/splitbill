import theme from '@/constants/theme';
import React, { PropsWithChildren } from 'react';
import { SafeAreaView, View, ViewProps } from 'react-native';

const ScreenContent = (({ children, ...props }: PropsWithChildren<ViewProps>) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} >
      <View {...props} style={[{ flex: 1, padding: 10, paddingTop: 20, paddingBottom: 0 }, props.style]} >
        {children}
      </View>
    </SafeAreaView>
  );
})

export default ScreenContent;