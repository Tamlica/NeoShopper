import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList, Category, QuickAddItem } from '@/types/list';

interface StoreState {
  lists: ShoppingList[];
  categories: Category[];
  quickAddItems: QuickAddItem[];
  addList: (list: ShoppingList) => void;
  updateList: (list: ShoppingList) => void;
  deleteList: (id: string) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addQuickAddItem: (item: QuickAddItem) => void;
  deleteQuickAddItem: (id: string) => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Vegetables', color: '#4ade80', icon: 'Carrot' },
  { id: '2', name: 'Fruits', color: '#fb923c', icon: 'Apple' },
  { id: '3', name: 'Dairy', color: '#60a5fa', icon: 'Milk' },
  { id: '4', name: 'Meat', color: '#f87171', icon: 'Beef' },
  { id: '5', name: 'Snacks', color: '#fbbf24', icon: 'Cookie' },
  { id: '6', name: 'Beverages', color: '#a78bfa', icon: 'Soda' },
  { id: '7', name: 'Bakery', color: '#fdba74', icon: 'Croissant' },
  { id: '8', name: 'Cleaning', color: '#67e8f9', icon: 'Spray' },
  { id: '9', name: 'Personal Care', color: '#f472b6', icon: 'Shower' },
  { id: '10', name: 'Clothes', color: '#a3e635', icon: 'Shirt' },
  { id: '11', name: 'Others', color: '#60a5fa', icon: 'PocketKnife' },
];

const defaultQuickAddItems: QuickAddItem[] = [
  { id: '1', name: 'Milk', category: '3' },
  { id: '2', name: 'Bread', category: '7' },
  { id: '3', name: 'Shampoo', category: '9' },
  { id: '4', name: 'Bananas', category: '2' },
  { id: '5', name: 'Detergent', category: '8' },
  { id: '6', name: 'Soda', category: '6' },
  { id: '7', name: 'Perfume', category: '9' },
  { id: '8', name: 'Chips', category: '5' },
  { id: '9', name: 'Soap', category: '9' },
  { id: '10', name: 'Rice', category: '10' },
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      lists: [],
      categories: defaultCategories,
      quickAddItems: defaultQuickAddItems,
      addList: (list) =>
        set((state) => ({ lists: [...state.lists, list] })),
      updateList: (list) =>
        set((state) => ({
          lists: state.lists.map((l) => (l.id === list.id ? list : l)),
        })),
      deleteList: (id) =>
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      addQuickAddItem: (item) =>
        set((state) => ({
          quickAddItems: [...state.quickAddItems, item],
        })),
      deleteQuickAddItem: (id) =>
        set((state) => ({
          quickAddItems: state.quickAddItems.filter((i) => i.id !== id),
        })),
    }),
    {
      name: 'shopping-list-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);