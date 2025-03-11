import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { CategoryIcon } from '@/components/CategoryIcon';
import { Check, ChevronLeft, Plus, Trash2, Zap } from 'lucide-react-native';

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { lists, updateList, deleteList, categories, quickAddItems } = useStore();
  const list = lists.find((l) => l.id === id);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>List not found</Text>
        <NeoBrutalButton
          title="Go Back"
          onPress={() => router.back()}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  const addItem = (name: string, categoryId: string) => {
    if (!name.trim()) return;

    const updatedList = {
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
    };

    updateList(updatedList);
    setNewItem('');
  };

  const toggleItem = (itemId: string) => {
    const updatedList = {
      ...list,
      items: list.items.map((item) =>
        item.id === itemId
          ? { ...item, completed: !item.completed }
          : item
      ),
    };

    updateList(updatedList);
  };

  const handleDelete = () => {
    deleteList(list.id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <ChevronLeft size={24} color="#000000" />
          <Text style={styles.backText}>Items List</Text>
        </TouchableOpacity>
        <NeoBrutalButton
          title="Delete List"
          onPress={handleDelete}
          variant="danger"
          style={styles.deleteButton}
        />
      </View>

      <Text style={styles.title}>{list.title}</Text>

      <View style={styles.addItemContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Add new item..."
            placeholderTextColor="#666666"
          />
          <TouchableOpacity
            onPress={() => setShowQuickAdd(!showQuickAdd)}
            style={[
              styles.quickAddButton,
              { backgroundColor: showQuickAdd ? '#4ECDC4' : '#FFE66D' },
            ]}>
            <Zap size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {showQuickAdd ? (
          <ScrollView
            style={styles.quickAddContainer}
            showsVerticalScrollIndicator={false}>
            {quickAddItems.map((item) => {
              const category = categories.find((c) => c.id === item.category);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.quickAddItem}
                  onPress={() => addItem(item.name, item.category)}>
                  <View style={styles.quickAddContent}>
                    <View
                      style={[
                        styles.categoryIcon,
                        { backgroundColor: category?.color },
                      ]}>
                      <CategoryIcon
                        name={category?.icon || ''}
                        size={16}
                        color="#000000"
                      />
                    </View>
                    <Text style={styles.quickAddText}>{item.name}</Text>
                  </View>
                  <Plus size={16} color="#000000" />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: category.color,
                      borderColor:
                        selectedCategory === category.id
                          ? '#000000'
                          : 'transparent',
                    },
                  ]}>
                  <CategoryIcon
                    name={category.icon}
                    size={16}
                    color="#000000"
                  />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <NeoBrutalButton
              title="Add Item"
              onPress={() => addItem(newItem, selectedCategory)}
              style={styles.addButton}
            />
          </>
        )}
      </View>

      <ScrollView style={styles.itemList}>
        {list.items.map((item) => {
          const category = categories.find((c) => c.id === item.category);
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleItem(item.id)}
              style={[
                styles.itemCard,
                item.completed && styles.completedItem,
              ]}>
              <View style={styles.itemContent}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category?.color },
                  ]}>
                  <CategoryIcon
                    name={category?.icon || ''}
                    size={16}
                    color="#000000"
                  />
                </View>
                <Text
                  style={[
                    styles.itemText,
                    item.completed && styles.completedText,
                  ]}>
                  {item.name}
                </Text>
              </View>
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkedBox,
                ]}>
                {item.completed && (
                  <Check size={16} color="#000000" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE5F2',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#000000',
    marginLeft: 4,
  },
  deleteButton: {
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#000000',
    marginBottom: 24,
  },
  addItemContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#000000',
  },
  quickAddButton: {
    width: 48,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  quickAddContainer: {
    maxHeight: 200,
    marginTop: 8,
  },
  quickAddItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9FC',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  quickAddContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickAddText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 14,
    color: '#000000',
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 3,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#000000',
  },
  addButton: {
    marginTop: 8,
  },
  itemList: {
    flex: 1,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedItem: {
    backgroundColor: '#F0F0F0',
    borderStyle: 'dashed',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  itemText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4ECDC4',
  },
});