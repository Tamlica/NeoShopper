import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { border, color, font, radius, space, text } from '@/constants/theme';

// Height above the safe-area inset; UndoSnackbar sits on top of this.
export const TAB_BAR_HEIGHT = 48 + space.sm * 2 + border.heavy;

// Icon + label on one line, active tab is a solid block. Sized by its content,
// so the label can never be clipped by a fixed bar height.
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + space.sm }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        const label = options.title ?? route.name;
        const tint = focused ? color.ink : color.inkMuted;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={label}
            style={[styles.tab, focused && styles.tabActive]}>
            {options.tabBarIcon?.({ focused, color: tint, size: 20 })}
            <Text numberOfLines={1} style={[styles.label, { color: tint }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    gap: space.sm,
    paddingTop: space.sm,
    paddingHorizontal: space.lg,
    backgroundColor: color.surface,
    borderTopWidth: border.heavy,
    borderTopColor: color.ink,
  },
  tab: {
    flex: 1,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    borderRadius: radius.md,
    borderWidth: border.heavy,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: color.primary,
    borderColor: color.ink,
  },
  label: { fontFamily: font.bold, fontSize: text.md },
});
