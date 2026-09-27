import { Pressable, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { border, color, font, radius, shadow, space, text } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'danger';

interface Props {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  variant?: Variant;
  disabled?: boolean;
}

const fill: Record<Variant, string> = {
  primary: color.primary,
  secondary: color.surface,
  danger: color.danger,
};

export function NeoBrutalButton({ onPress, title, style, variant = 'primary', disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: disabled ? color.paper : fill[variant] },
        disabled ? styles.disabled : pressed ? styles.pressed : styles.raised,
        style,
      ]}>
      <Text numberOfLines={1} style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: space.sm,
    paddingHorizontal: space.lg,
    borderWidth: border.heavy,
    borderColor: color.ink,
    borderRadius: radius.md,
  },
  raised: { boxShadow: shadow.hard },
  // The press: button drops into its own shadow.
  pressed: { transform: [{ translateX: 4 }, { translateY: 4 }] },
  disabled: { borderColor: color.inkMuted, borderStyle: 'dashed' },
  text: {
    fontFamily: font.bold,
    fontSize: text.md,
    color: color.ink,
    textAlign: 'center',
  },
  textDisabled: { color: color.inkMuted },
});
