import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, ViewProps } from 'react-native-ui-lib';

const ScreenContent = (({ children }: PropsWithChildren) => {
  const theme = useTheme()
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.scrim }}>
        <View style={{ flex: 1, padding: 20 }}>
          {children}
        </View>
      </View>
    </SafeAreaProvider>
  );
})

export default ScreenContent;