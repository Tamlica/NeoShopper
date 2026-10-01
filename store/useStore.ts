import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList, Category, QuickAddItem } from '@/types/list';
import type { Lang } from '@/constants/i18n';

interface StoreState {
  lists: ShoppingList[];
  categories: Category[];
  quickAddItems: QuickAddItem[];
  language: Lang | null; // null until chosen on first launch
  setLanguage: (language: Lang) => void;
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
  { id: '10', name: 'Rice', category: '11' },
];

// Indonesian names for the defaults above, keyed by id.
const idNames = {
  categories: {
    '1': 'Sayuran', '2': 'Buah', '3': 'Produk Susu', '4': 'Daging', '5': 'Camilan',
    '6': 'Minuman', '7': 'Roti & Kue', '8': 'Kebersihan', '9': 'Perawatan Diri',
    '10': 'Pakaian', '11': 'Lainnya',
  } as Record<string, string>,
  quickAddItems: {
    '1': 'Susu', '2': 'Roti', '3': 'Sampo', '4': 'Pisang', '5': 'Deterjen',
    '6': 'Soda', '7': 'Parfum', '8': 'Keripik', '9': 'Sabun', '10': 'Beras',
  } as Record<string, string>,
};

// Swap a default's name to the chosen language, unless the user renamed it.
const localize = <T extends { id: string; name: string }>(
  items: T[],
  defaults: T[],
  ids: Record<string, string>,
  language: Lang
) =>
  items.map((item) => {
    const en = defaults.find((d) => d.id === item.id)?.name;
    if (!en || (item.name !== en && item.name !== ids[item.id])) return item;
    return { ...item, name: language === 'id' ? ids[item.id] : en };
  });

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      lists: [],
      categories: defaultCategories,
      quickAddItems: defaultQuickAddItems,
      language: null,
      setLanguage: (language) =>
        set((state) => ({
          language,
          categories: localize(state.categories, defaultCategories, idNames.categories, language),
          quickAddItems: localize(state.quickAddItems, defaultQuickAddItems, idNames.quickAddItems, language),
        })),
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
      version: 1,
      // v0 shipped the default Rice quick item under Clothes; move it to Others.
      migrate: (persisted, version) => {
        const state = persisted as StoreState;
        if (version === 0) {
          state.quickAddItems = state.quickAddItems?.map((i) =>
            i.id === '10' && i.name === 'Rice' && i.category === '10' ? { ...i, category: '11' } : i
          );
        }
        return state;
      },
    }
  )
);