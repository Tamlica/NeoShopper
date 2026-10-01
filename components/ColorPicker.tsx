import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';
import { border, color, radius, shadow, space, swatches } from '@/constants/theme';
import { useT } from '@/constants/i18n';

interface Props {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export function ColorPicker({ selectedColor, onSelectColor }: Props) {
  const t = useT();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {swatches.map((swatch) => {
        const selected = selectedColor === swatch;
        return (
          <Pressable
            key={swatch}
            onPress={() => onSelectColor(swatch)}
            accessibilityRole="radio"
            accessibilityLabel={t.colourNamed(swatch)}
            accessibilityState={{ selected }}
            style={[styles.swatch, { backgroundColor: swatch }, selected ? styles.selected : styles.raised]}>
            {selected && <Check size={20} color={color.ink} strokeWidth={3} />}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 0, marginBottom: space.lg, paddingBottom: space.xs },
  swatch: {
    width: 44,
    height: 44,
    marginRight: space.sm,
    borderRadius: radius.md,
    borderWidth: border.light,
    borderColor: color.ink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raised: { boxShadow: shadow.small },
  // Pressed-in: drops into its shadow, heavier border, check mark.
  selected: { borderWidth: border.heavy, transform: [{ translateX: 2 }, { translateY: 2 }] },
});
