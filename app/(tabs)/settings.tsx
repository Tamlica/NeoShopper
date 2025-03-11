import { View, Text, StyleSheet, ScrollView, Linking, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { CategoryIcon } from '@/components/CategoryIcon';
import { ColorPicker } from '@/components/ColorPicker';
import { IconPicker } from '@/components/IconPicker';
import { useState } from 'react';
import { Plus, X } from 'lucide-react-native';

export default function SettingsScreen() {
  const { categories, quickAddItems, addCategory, deleteCategory, addQuickAddItem, deleteQuickAddItem } = useStore();
  const [newCategory, setNewCategory] = useState({ name: '', color: '#4ade80', icon: 'Apple' });
  const [newQuickItem, setNewQuickItem] = useState({ name: '', category: categories[0].id });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddQuickItem, setShowAddQuickItem] = useState(false);

  const handleSupportLink = () => {
    Linking.openURL('https://sociabuzz.com/chicakelite/tribe').catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      addCategory({
        id: Date.now().toString(),
        ...newCategory,
      });
      setNewCategory({ name: '', color: '#4ade80', icon: 'Apple' });
      setShowAddCategory(false);
    }
  };

  const handleAddQuickItem = () => {
    if (newQuickItem.name.trim()) {
      addQuickAddItem({
        id: Date.now().toString(),
        ...newQuickItem,
      });
      setNewQuickItem({ name: '', category: categories[0].id });
      setShowAddQuickItem(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <View key={category.id} style={styles.categoryWrapper}>
                <View style={[styles.categoryItem, { backgroundColor: category.color }]}>
                  <CategoryIcon name={category.icon} size={20} color="#000000" />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteCategory(category.id)}
                  style={styles.deleteButton}>
                  <X size={16} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
          {showAddCategory ? (
            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                value={newCategory.name}
                onChangeText={(text) => setNewCategory({ ...newCategory, name: text })}
                placeholder="Category name"
                placeholderTextColor="#666666"
              />
              <Text style={styles.label}>Select Color</Text>
              <ColorPicker
                selectedColor={newCategory.color}
                onSelectColor={(color) => setNewCategory({ ...newCategory, color })}
              />
              <Text style={styles.label}>Select Icon</Text>
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
                  title="Add Category"
                  onPress={handleAddCategory}
                  style={styles.buttonHalf}
                  color="#FF6B6B"
                />
              </View>
            </View>
          ) : (
            <NeoBrutalButton
              title="Add New Category"
              onPress={() => setShowAddCategory(true)}
              style={styles.button}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Add Items</Text>
          <View style={styles.quickItemsList}>
            {quickAddItems.map((item) => {
              const category = categories.find((c) => c.id === item.category);
              return (
                <View key={item.id} style={styles.quickItemWrapper}>
                  <View style={styles.quickItem}>
                    <View style={[styles.categoryDot, { backgroundColor: category?.color }]} />
                    <Text style={styles.quickItemName}>{item.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteQuickAddItem(item.id)}
                    style={styles.deleteButton}>
                    <X size={16} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {showAddQuickItem ? (
            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                value={newQuickItem.name}
                onChangeText={(text) => setNewQuickItem({ ...newQuickItem, name: text })}
                placeholder="Item name"
                placeholderTextColor="#666666"
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setNewQuickItem({ ...newQuickItem, category: category.id })}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: category.color,
                        borderColor:
                          newQuickItem.category === category.id
                            ? '#000000'
                            : 'transparent',
                      },
                    ]}>
                    <CategoryIcon name={category.icon} size={16} color="#000000" />
                    <Text style={styles.categoryChipText}>{category.name}</Text>
                  </TouchableOpacity>
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
                  title="Add Quick Item"
                  onPress={handleAddQuickItem}
                  style={styles.buttonHalf}
                  color="#FF6B6B"
                />
              </View>
            </View>
          ) : (
            <NeoBrutalButton
              title="Add Quick Item"
              onPress={() => setShowAddQuickItem(true)}
              style={styles.button}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            NeoShopper App v1.0.0
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support!</Text>
          <Pressable onPress={handleSupportLink}>
            <Text style={styles.aboutText}>
              If you like the NeoShopper App, support me on{' '}
              <Text style={styles.linkText}>Sociabuzz</Text>
            </Text>
          </Pressable>
        </View>
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
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#000000',
    marginTop: 48,
    marginBottom: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000000',
  },
  categoryName: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#000000',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 4,
  },
  button: {
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  addForm: {
    backgroundColor: '#88AAEE',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
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
  categoryChipText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#000000',
  },
  quickItemsList: {
    marginBottom: 16,
  },
  quickItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 8,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#000000',
  },
  quickItemName: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  aboutText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  linkText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});