import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

const ScreenContainer = ({ children }: PropsWithChildren) => {
  return <View useSafeArea style={style.container}>{children}</View>;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
})
export default ScreenContainer;