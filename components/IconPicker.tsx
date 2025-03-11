import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import { CategoryIcon } from './CategoryIcon';

const ICONS = [
  'Apple', 'Beef', 'Carrot', 'Coffee', 'Container',
  'Cookie', 'Croissant', 'Milk', 'Shower', 'Spray',
];

interface Props {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  color?: string;
}

export function IconPicker({ selectedIcon, onSelectIcon, color = '#4ade80' }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {ICONS.map((icon) => (
        <TouchableOpacity
          key={icon}
          onPress={() => onSelectIcon(icon)}
          style={[
            styles.iconButton,
            { backgroundColor: color },
            selectedIcon === icon && styles.selectedIcon,
          ]}>
          <CategoryIcon name={icon} size={24} color="#000000" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: 16,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 3,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  selectedIcon: {
    borderWidth: 3,
    borderColor: '#000000',
    transform: [{ scale: 1.1 }],
  },
});