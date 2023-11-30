import theme from '@/constants/theme';
import { Text } from 'react-native';
import { Platform, Pressable, StyleSheet, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  color?: string
  text?: string
  icon?: React.ReactNode
}

export default function HeaderButton({ color, text, icon, ...props }: Props) {
  return (
    <Pressable {...props} style={{ ...styles.button }} >
      {text && (
        <Text style={{ ...styles.text, color: props.disabled ? theme.colors.outline : color }}>{text}</Text>
      )}
      {icon && icon}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: Platform.OS === 'web' ? 11 : 0
  },
  text: {
    fontSize: 16
  }
})