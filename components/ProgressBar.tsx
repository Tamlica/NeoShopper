import { View, StyleSheet } from 'react-native';

interface Props {
  progress: number;
  color?: string;
}

export function ProgressBar({ progress, color = '#4ECDC4' }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          {
            backgroundColor: color,
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});