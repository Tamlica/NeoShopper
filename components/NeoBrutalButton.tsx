import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'danger';
  color?: string;
}

export function NeoBrutalButton({
  onPress,
  title,
  style,
  textStyle,
  variant = 'primary',
  color,
}: Props) {
  const getBackgroundColor = () => {
    if (color) return color;
    switch (variant) {
      case 'primary':
        return '#88AAEE';
      case 'secondary':
        return '#4ECDC4';
      case 'danger':
        return '#FF6B6B';
      default:
        return '#FFE66D';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  text: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});