import { Platform, Pressable, StyleSheet, Text, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  color?: string
  text: string
}

export default function HeaderButton({ color, text, ...props }: Props) {
  return (
    <Pressable {...props} style={{ ...styles.button }} >
      <Text style={{ ...styles.text, color }}>{text}</Text>
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