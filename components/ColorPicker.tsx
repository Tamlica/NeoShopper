import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const COLORS = [
  '#4ade80', '#fb923c', '#60a5fa', '#f87171', '#fbbf24',
  '#a78bfa', '#fdba74', '#67e8f9', '#f472b6', '#a3e635',
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#88AAEE', '#FF8ED4',
];

interface Props {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export function ColorPicker({ selectedColor, onSelectColor }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          onPress={() => onSelectColor(color)}
          style={[
            styles.colorButton,
            { backgroundColor: color },
            selectedColor === color && styles.selectedColor,
          ]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: 16,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 3,
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#000000',
    transform: [{ scale: 1.1 }],
  },
});