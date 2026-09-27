import { View, Text, StyleSheet, ScrollView, Linking, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { CategoryIcon } from '@/components/CategoryIcon';
import { CategoryChip } from '@/components/CategoryChip';
import { ColorPicker } from '@/components/ColorPicker';
import { IconPicker } from '@/components/IconPicker';
import { useUndo } from '@/components/UndoSnackbar';
import { useState } from 'react';
import { Category, QuickAddItem } from '@/types/list';
import { X } from 'lucide-react-native';
import { border, color, font, radius, space, swatches, text } from '@/constants/theme';

const blankCategory = { name: '', color: swatches[0] as string, icon: 'Apple' };

const insertAt = <T,>(arr: T[], index: number, item: T) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index),
];

export default function SettingsScreen() {
  const { categories, quickAddItems, addCategory, deleteCategory, addQuickAddItem, deleteQuickAddItem } =
    useStore();
  const showUndo = useUndo((s) => s.show);

  const removeCategory = (category: Category) => {
    const index = categories.indexOf(category);
    deleteCategory(category.id);
    showUndo(`Deleted “${category.name}”`, () =>
      useStore.setState((s) => ({ categories: insertAt(s.categories, index, category) }))
    );
  };

  const removeQuickItem = (item: QuickAddItem) => {
    const index = quickAddItems.indexOf(item);
    deleteQuickAddItem(item.id);
    showUndo(`Deleted “${item.name}”`, () =>
      useStore.setState((s) => ({ quickAddItems: insertAt(s.quickAddItems, index, item) }))
    );
  };
  const insets = useSafeAreaInsets();
  const [newCategory, setNewCategory] = useState(blankCategory);
  const [newQuickItem, setNewQuickItem] = useState({ name: '', category: categories[0]?.id ?? '' });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddQuickItem, setShowAddQuickItem] = useState(false);

  const handleSupportLink = () => {
    Linking.openURL('https://sociabuzz.com/chicakelite/tribe').catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;
    addCategory({ id: Date.now().toString(), ...newCategory, name: newCategory.name.trim() });
    setNewCategory(blankCategory);
    setShowAddCategory(false);
  };

  const handleAddQuickItem = () => {
    if (!newQuickItem.name.trim()) return;
    addQuickAddItem({ id: Date.now().toString(), ...newQuickItem, name: newQuickItem.name.trim() });
    setNewQuickItem({ name: '', category: categories[0]?.id ?? '' });
    setShowAddQuickItem(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.xl }]}>
      <Text style={styles.title}>Settings</Text>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <View key={category.id} style={[styles.categoryTag, { backgroundColor: category.color }]}>
                <CategoryIcon name={category.icon} size={18} />
                <Text style={styles.categoryName}>{category.name}</Text>
                <Pressable
                  onPress={() => removeCategory(category)}
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${category.name}`}
                  hitSlop={12}
                  style={styles.tagDelete}>
                  <X size={16} color={color.ink} strokeWidth={3} />
                </Pressable>
              </View>
            ))}
          </View>

          {showAddCategory ? (
            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                value={newCategory.name}
                onChangeText={(name) => setNewCategory({ ...newCategory, name })}
                placeholder="Category name"
                placeholderTextColor={color.inkMuted}
                accessibilityLabel="Category name"
                autoFocus
              />
              <Text style={styles.label}>Colour</Text>
              <ColorPicker
                selectedColor={newCategory.color}
                onSelectColor={(c) => setNewCategory({ ...newCategory, color: c })}
              />
              <Text style={styles.label}>Icon</Text>
              <IconPicker
                selectedIcon={newCategory.icon}
                onSelectIcon={(icon) => setNewCategory({ ...newCategory, icon })}
                color={newCategory.color}
              />
              <View style={styles.buttonRow}>
                <NeoBrutalButton
                  title="Cancel"
                  onPress={() => setShowAddCategory(false)}
                  variant="secondary"
                  style={styles.buttonHalf}
                />
                <NeoBrutalButton
                  title="Add"
                  onPress={handleAddCategory}
                  disabled={!newCategory.name.trim()}
                  style={styles.buttonHalf}
                />
              </View>
            </View>
          ) : (
            <NeoBrutalButton
              title="Add category"
              onPress={() => setShowAddCategory(true)}
              variant="secondary"
              style={styles.selfStart}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick add items</Text>
          <View style={styles.quickItemsList}>
            {quickAddItems.map((item) => {
              const category = categories.find((c) => c.id === item.category);
              return (
                <View key={item.id} style={styles.quickItem}>
                  <View style={[styles.categoryDot, { backgroundColor: category?.color }]} />
                  <Text style={styles.quickItemName}>{item.name}</Text>
                  <Pressable
                    onPress={() => removeQuickItem(item)}
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${item.name}`}
                    style={styles.rowDelete}>
                    <X size={18} color={color.ink} strokeWidth={3} />
                  </Pressable>
                </View>
              );
            })}
          </View>

          {showAddQuickItem ? (
            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                value={newQuickItem.name}
                onChangeText={(name) => setNewQuickItem({ ...newQuickItem, name })}
                placeholder="Item name"
                placeholderTextColor={color.inkMuted}
                accessibilityLabel="Item name"
                autoFocus
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
                {categories.map((category) => (
                  <CategoryChip
                    key={category.id}
                    category={category}
                    selected={newQuickItem.category === category.id}
                    onPress={() => setNewQuickItem({ ...newQuickItem, category: category.id })}
                  />
                ))}
              </ScrollView>
              <View style={styles.buttonRow}>
                <NeoBrutalButton
                  title="Cancel"
                  onPress={() => setShowAddQuickItem(false)}
                  variant="secondary"
                  style={styles.buttonHalf}
                />
                <NeoBrutalButton
                  title="Add"
                  onPress={handleAddQuickItem}
                  disabled={!newQuickItem.name.trim()}
                  style={styles.buttonHalf}
                />
              </View>
            </View>
          ) : (
            <NeoBrutalButton
              title="Add quick item"
              onPress={() => setShowAddQuickItem(true)}
              variant="secondary"
              style={styles.selfStart}
            />
          )}
        </View>

        <View style={styles.colophon}>
          <Pressable onPress={handleSupportLink} accessibilityRole="link">
            <Text style={styles.aboutText}>
              Like NeoShopper? Support it on <Text style={styles.linkText}>Sociabuzz</Text>.
            </Text>
          </Pressable>
          <Text style={styles.version}>NeoShopper v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.paper,
    paddingHorizontal: space.lg,
  },
  title: {
    fontFamily: font.bold,
    fontSize: text.display,
    color: color.ink,
    marginBottom: space.xl,
  },
  content: { flex: 1 },
  contentInner: { paddingBottom: space.xxl },
  section: { marginBottom: space.xxl },
  sectionTitle: {
    fontFamily: font.bold,
    fontSize: text.lg,
    color: color.ink,
    marginBottom: space.lg,
  },
  label: {
    fontFamily: font.bold,
    fontSize: text.sm,
    color: color.ink,
    marginBottom: space.sm,
  },
  selfStart: { alignSelf: 'flex-start' },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
    marginBottom: space.lg,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs + 2,
    minHeight: 36,
    paddingLeft: space.sm,
    borderRadius: radius.md,
    borderWidth: border.light,
    borderColor: color.ink,
  },
  categoryName: { fontFamily: font.bold, fontSize: text.sm, color: color.ink },
  tagDelete: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: space.sm,
    borderLeftWidth: border.light,
    borderLeftColor: color.ink,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: space.sm,
    marginTop: space.md,
  },
  buttonHalf: { flex: 1 },
  // Inline form: a light-bordered surface, no second shadow layer.
  addForm: {
    backgroundColor: color.surface,
    borderWidth: border.light,
    borderColor: color.ink,
    borderRadius: radius.lg,
    padding: space.lg,
  },
  input: {
    backgroundColor: color.paper,
    borderWidth: border.light,
    borderColor: color.ink,
    borderRadius: radius.md,
    padding: space.md,
    marginBottom: space.lg,
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.ink,
  },
  chipRow: { flexGrow: 0 },
  quickItemsList: {
    marginBottom: space.lg,
    borderTopWidth: border.light,
    borderTopColor: color.ink,
  },
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: color.inkMuted,
  },
  categoryDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: space.md,
    borderWidth: border.light,
    borderColor: color.ink,
  },
  quickItemName: {
    flex: 1,
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.ink,
  },
  rowDelete: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colophon: { gap: space.sm },
  aboutText: {
    fontFamily: font.regular,
    fontSize: text.md,
    lineHeight: 24,
    color: color.inkMuted,
  },
  linkText: {
    fontFamily: font.bold,
    color: color.ink,
    textDecorationLine: 'underline',
  },
  version: {
    fontFamily: font.regular,
    fontSize: text.sm,
    color: color.inkMuted,
  },
});
