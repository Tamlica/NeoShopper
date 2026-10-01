import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { CategoryIcon } from '@/components/CategoryIcon';
import { CategoryChip } from '@/components/CategoryChip';
import { useUndo } from '@/components/UndoSnackbar';
import { useT } from '@/constants/i18n';
import { Check, ChevronLeft, Plus, Zap } from 'lucide-react-native';
import { border, color, font, radius, shadow, space, tabular, text } from '@/constants/theme';

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const { lists, updateList, deleteList, categories, quickAddItems } = useStore();
  const showUndo = useUndo((s) => s.show);
  const list = lists.find((l) => l.id === id);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id ?? '');
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const containerStyle = [styles.container, { paddingTop: insets.top + space.md }];

  if (!list) {
    return (
      <View style={containerStyle}>
        <Text style={styles.title}>{t.listNotFound}</Text>
        <NeoBrutalButton title={t.backToLists} onPress={() => router.back()} style={styles.selfStart} />
      </View>
    );
  }

  const addItem = (name: string, categoryId: string) => {
    if (!name.trim()) return;

    updateList({
      ...list,
      items: [
        ...list.items,
        {
          id: Date.now().toString(),
          name: name.trim(),
          quantity: '1',
          category: categoryId,
          completed: false,
          createdAt: Date.now(),
        },
      ],
    });
    setNewItem('');
  };

  const toggleItem = (itemId: string) => {
    updateList({
      ...list,
      items: list.items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    });
  };

  const handleDelete = () => {
    const index = lists.findIndex((l) => l.id === list.id);
    deleteList(list.id);
    showUndo(t.deleted(list.title), () =>
      useStore.setState((s) => ({
        lists: [...s.lists.slice(0, index), list, ...s.lists.slice(index)],
      }))
    );
    router.back();
  };

  const done = list.items.filter((i) => i.completed).length;

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        hitSlop={8}
        style={styles.backButton}>
        <ChevronLeft size={24} color={color.ink} />
        <Text style={styles.backText}>{t.tabLists}</Text>
      </Pressable>

      <View style={styles.titleRow}>
        <Text style={styles.title}>{list.title}</Text>
        {list.items.length > 0 && (
          <Text style={styles.count}>{done}/{list.items.length}</Text>
        )}
      </View>

      <View style={styles.addPanel}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
            onSubmitEditing={() => addItem(newItem, selectedCategory)}
            returnKeyType="done"
            placeholder={t.addItemPlaceholder}
            placeholderTextColor={color.inkMuted}
            accessibilityLabel={t.newItem}
          />
          <Pressable
            onPress={() => setShowQuickAdd(!showQuickAdd)}
            accessibilityRole="button"
            accessibilityLabel={t.quickAdd}
            accessibilityState={{ selected: showQuickAdd }}
            style={[styles.quickAddToggle, showQuickAdd && styles.quickAddToggleOn]}>
            <Zap size={20} color={color.ink} fill={showQuickAdd ? color.ink : 'none'} />
          </Pressable>
        </View>

        {showQuickAdd ? (
          <ScrollView style={styles.quickAddList} showsVerticalScrollIndicator={false}>
            {quickAddItems.map((item) => {
              const category = categories.find((c) => c.id === item.category);
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  accessibilityLabel={t.addNamed(item.name)}
                  style={({ pressed }) => [styles.quickAddRow, pressed && styles.rowPressed]}
                  onPress={() => addItem(item.name, item.category)}>
                  <View style={[styles.categorySquare, { backgroundColor: category?.color }]}>
                    <CategoryIcon name={category?.icon ?? ''} size={16} />
                  </View>
                  <Text style={styles.quickAddText}>{item.name}</Text>
                  <Plus size={18} color={color.ink} />
                </Pressable>
              );
            })}
          </ScrollView>
        ) : (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
              {categories.map((category) => (
                <CategoryChip
                  key={category.id}
                  category={category}
                  selected={selectedCategory === category.id}
                  onPress={() => setSelectedCategory(category.id)}
                />
              ))}
            </ScrollView>
            <NeoBrutalButton
              title={t.addItem}
              onPress={() => addItem(newItem, selectedCategory)}
              disabled={!newItem.trim()}
            />
          </>
        )}
      </View>

      <ScrollView style={styles.itemList} contentContainerStyle={styles.itemListContent}>
        {list.items.map((item) => {
          const category = categories.find((c) => c.id === item.category);
          return (
            <Pressable
              key={item.id}
              onPress={() => toggleItem(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.completed }}
              style={[styles.itemRow, item.completed && styles.itemRowDone]}>
              <View style={[styles.categorySquare, { backgroundColor: category?.color }]}>
                <CategoryIcon name={category?.icon ?? ''} size={16} />
              </View>
              <Text style={[styles.itemText, item.completed && styles.itemTextDone]}>
                {item.name}
              </Text>
              <View style={[styles.checkbox, item.completed && styles.checkboxOn]}>
                {item.completed && <Check size={16} color={color.ink} strokeWidth={3} />}
              </View>
            </Pressable>
          );
        })}

        <NeoBrutalButton
          title={t.deleteList}
          onPress={handleDelete}
          variant="danger"
          style={styles.deleteButton}
        />
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
  selfStart: { alignSelf: 'flex-start', marginTop: space.lg },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    minHeight: 44,
    marginLeft: -space.xs,
  },
  backText: {
    fontFamily: font.bold,
    fontSize: text.md,
    color: color.ink,
    marginLeft: space.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: space.md,
    marginTop: space.sm,
    marginBottom: space.xl,
  },
  title: {
    flexShrink: 1,
    fontFamily: font.bold,
    fontSize: text.display,
    color: color.ink,
  },
  count: {
    fontFamily: font.bold,
    fontSize: text.lg,
    color: color.inkMuted,
    ...tabular,
  },
  addPanel: {
    backgroundColor: color.surface,
    borderWidth: border.heavy,
    borderColor: color.ink,
    borderRadius: radius.lg,
    padding: space.lg,
    marginBottom: space.xl,
    boxShadow: shadow.hard,
  },
  inputRow: {
    flexDirection: 'row',
    gap: space.sm,
    marginBottom: space.md,
  },
  input: {
    flex: 1,
    backgroundColor: color.paper,
    borderWidth: border.light,
    borderColor: color.ink,
    borderRadius: radius.md,
    padding: space.md,
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.ink,
  },
  quickAddToggle: {
    width: 48,
    aspectRatio: 1,
    borderWidth: border.light,
    borderColor: color.ink,
    borderRadius: radius.md,
    backgroundColor: color.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddToggleOn: { backgroundColor: color.highlight, borderWidth: border.heavy },
  quickAddList: { maxHeight: 220 },
  // Flat rows with a hairline — no boxes inside the panel.
  quickAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: color.inkMuted,
  },
  rowPressed: { backgroundColor: color.paper },
  quickAddText: {
    flex: 1,
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.ink,
  },
  chipRow: { marginBottom: space.md, flexGrow: 0 },
  categorySquare: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemList: { flex: 1 },
  itemListContent: { paddingBottom: space.xxl },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: 56,
    backgroundColor: color.surface,
    borderWidth: border.light,
    borderColor: color.ink,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    marginBottom: space.sm,
  },
  itemRowDone: {
    backgroundColor: color.paper,
    borderStyle: 'dashed',
    borderColor: color.inkMuted,
  },
  itemText: {
    flex: 1,
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.ink,
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: color.inkMuted,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: border.heavy,
    borderColor: color.ink,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOn: { backgroundColor: color.done },
  deleteButton: { alignSelf: 'flex-start', marginTop: space.xl },
});
