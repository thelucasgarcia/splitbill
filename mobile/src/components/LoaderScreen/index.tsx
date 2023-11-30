import theme from '@/constants/theme';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import { TextStyle, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LoaderScreenProps {

  /**
   * Color of the loading indicator
   */
  loaderColor?: string;
  /**
   * Custom loader
   */
  customLoader?: React.ReactChild;
  /**
   * Color of the loader background (only when passing 'overlay')
   */
  backgroundColor?: string;
  /**
   * loader message
   */
  message?: string;
  /**
   * message style
   */
  messageStyle?: TextStyle;
  /**
   * Show the screen as an absolute overlay
   */
  overlay?: boolean;
  /**
  * Custom container style
  */
  containerStyle?: ViewStyle;
}

export default function LoaderScreen(props: LoaderScreenProps) {
  const theme = useTheme()
  const {
    message,
    messageStyle,
    loaderColor,
    overlay,
    backgroundColor,
    customLoader,
    containerStyle,
    ...others
  } = props;
  return (
    <View style={[overlay ? [styles.overlayContainer, {
      backgroundColor
    }] : styles.container, containerStyle]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {customLoader || <ActivityIndicator size={'large'} animating color={loaderColor || theme.colors.primary} {...others} />}
        {message && <Text style={[styles.message, messageStyle]}>{message}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
    zIndex: 100
  },
  message: {
    marginTop: 18,
    color: theme.colors.primary
  }
});