import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';
import { border, color, font, radius, space, text } from '@/constants/theme';
import { TAB_BAR_HEIGHT } from './TabBar';

interface UndoState {
  message: string | null;
  undo: (() => void) | null;
  show: (message: string, undo: () => void) => void;
  clear: () => void;
}

// Deletes happen immediately; this is the way back. No confirmation dialogs.
export const useUndo = create<UndoState>((set) => ({
  message: null,
  undo: null,
  show: (message, undo) => set({ message, undo }),
  clear: () => set({ message: null, undo: null }),
}));


export function UndoSnackbar() {
  const { message, undo, clear } = useUndo();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(clear, 6000);
    return () => clearTimeout(t);
  }, [message, clear]);

  if (!message) return null;

  return (
    <View
      accessibilityLiveRegion="polite"
      style={[styles.bar, { bottom: insets.bottom + TAB_BAR_HEIGHT + space.md }]}>
      <Text style={styles.message} numberOfLines={1}>{message}</Text>
      <Pressable
        onPress={() => {
          undo?.();
          clear();
        }}
        accessibilityRole="button"
        hitSlop={8}
        style={styles.action}>
        <Text style={styles.actionText}>Undo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: space.lg,
    right: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: space.lg,
    backgroundColor: color.ink,
    borderRadius: radius.md,
    borderWidth: border.heavy,
    borderColor: color.ink,
  },
  message: { flex: 1, fontFamily: font.regular, fontSize: text.md, color: color.surface },
  action: { minHeight: 44, paddingHorizontal: space.lg, justifyContent: 'center' },
  actionText: { fontFamily: font.bold, fontSize: text.md, color: color.primary },
});
