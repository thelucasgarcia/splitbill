import { Platform, Pressable, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Colors, Text } from 'react-native-ui-lib';

interface Props extends TouchableOpacityProps {
  color?: string
  text: string
}

export default function HeaderButton({ color, text, ...props }: Props) {
  return (
    <Pressable {...props} style={{ ...styles.button }} >
      <Text style={{ ...styles.text, color: props.disabled ? Colors.$textDisabled : color }}>{text}</Text>
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