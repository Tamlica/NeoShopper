import { Pressable, Text, StyleSheet } from 'react-native';
import { CategoryIcon } from './CategoryIcon';
import { border, color, font, radius, space, text } from '@/constants/theme';
import { Category } from '@/types/list';

interface Props {
  category: Category;
  selected: boolean;
  onPress: () => void;
}

// Selected = inverted (ink fill). Colour alone never carries the selection.
export function CategoryChip({ category, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        { backgroundColor: selected ? color.ink : category.color },
      ]}>
      <CategoryIcon name={category.icon} size={16} color={selected ? color.surface : color.ink} />
      <Text style={[styles.label, selected && styles.labelSelected]}>{category.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs + 2,
    minHeight: 36,
    paddingHorizontal: space.md,
    marginRight: space.sm,
    borderRadius: radius.md,
    borderWidth: border.light,
    borderColor: color.ink,
  },
  label: { fontFamily: font.bold, fontSize: text.sm, color: color.ink },
  labelSelected: { color: color.surface },
});
