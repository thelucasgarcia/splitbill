import theme from '@/constants/theme';
import { FlexStyle, View } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

function Row({ children, ...props }: React.PropsWithChildren<FlexStyle>) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...props }}>
      {children}
    </View>
  )
}

function Title(props: TextProps<never>) {
  return <Text variant='bodyLarge' {...props} />
}

function Description(props: TextProps<never>) {
  return <Text variant='bodySmall' {...props} style={[{ color: theme.colors.outline }, props.style]} />
}

Row.Title = Title
Row.Description = Description

export default Row