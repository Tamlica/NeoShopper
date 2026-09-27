import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { CategoryIcon, iconNames } from './CategoryIcon';
import { border, color, radius, shadow, space } from '@/constants/theme';

interface Props {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  color?: string;
}

export function IconPicker({ selectedIcon, onSelectIcon, color: fill = color.primary }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {iconNames.map((icon) => {
        const selected = selectedIcon === icon;
        return (
          <Pressable
            key={icon}
            onPress={() => onSelectIcon(icon)}
            accessibilityRole="radio"
            accessibilityLabel={icon}
            accessibilityState={{ selected }}
            style={[
              styles.tile,
              selected ? [styles.selected, { backgroundColor: fill }] : styles.raised,
            ]}>
            <CategoryIcon name={icon} size={24} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 0, marginBottom: space.lg, paddingBottom: space.xs },
  tile: {
    width: 48,
    height: 48,
    marginRight: space.sm,
    borderRadius: radius.md,
    borderWidth: border.light,
    borderColor: color.ink,
    backgroundColor: color.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raised: { boxShadow: shadow.small },
  selected: { borderWidth: border.heavy, transform: [{ translateX: 2 }, { translateY: 2 }] },
});
