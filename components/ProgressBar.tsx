import { View, StyleSheet } from 'react-native';
import { border, color, radius } from '@/constants/theme';

interface Props {
  progress: number;
}

export function ProgressBar({ progress }: Props) {
  const value = Math.min(Math.max(progress, 0), 100);
  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value) }}>
      <View style={[styles.fill, { width: `${value}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 16,
    backgroundColor: color.surface,
    borderWidth: border.light,
    borderColor: color.ink,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: color.done },
});
