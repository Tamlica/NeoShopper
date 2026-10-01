import { useStore } from '@/store/useStore';

export type Lang = 'en' | 'id';

const en = {
  locale: 'en',
  // Tabs
  tabLists: 'Lists',
  tabSettings: 'Settings',
  // Lists
  shoppingLists: 'Shopping lists',
  newList: 'New list',
  noLists: 'No lists yet.',
  noListsHint: 'Start one for your next shop — tap New list above.',
  empty: 'Empty',
  listSummary: (title: string, done: number, total: number) => `${title}, ${done} of ${total} done`,
  // New list
  name: 'Name',
  listNamePlaceholder: 'Weekly groceries',
  listName: 'List name',
  cancel: 'Cancel',
  createList: 'Create list',
  // List detail
  listNotFound: 'List not found',
  backToLists: 'Back to lists',
  addItemPlaceholder: 'Add an item…',
  newItem: 'New item',
  quickAdd: 'Quick add',
  addNamed: (name: string) => `Add ${name}`,
  addItem: 'Add item',
  deleteList: 'Delete list',
  deleted: (name: string) => `Deleted “${name}”`,
  undo: 'Undo',
  // Settings
  settings: 'Settings',
  categories: 'Categories',
  deleteNamed: (name: string) => `Delete ${name}`,
  categoryName: 'Category name',
  colour: 'Colour',
  colourNamed: (swatch: string) => `Colour ${swatch}`,
  icon: 'Icon',
  add: 'Add',
  addCategory: 'Add category',
  quickAddItems: 'Quick add items',
  itemName: 'Item name',
  addQuickItem: 'Add quick item',
  language: 'Language',
  supportPrefix: 'Like NeoShopper? Support it on ',
  // Not found
  notFound: 'Not found',
  nothingHere: 'Nothing here.',
  screenMissing: 'This screen doesn’t exist.',
};

const id: typeof en = {
  locale: 'id',
  tabLists: 'Daftar',
  tabSettings: 'Pengaturan',
  shoppingLists: 'Daftar belanja',
  newList: 'Daftar baru',
  noLists: 'Belum ada daftar.',
  noListsHint: 'Buat satu untuk belanja berikutnya — ketuk Daftar baru di atas.',
  empty: 'Kosong',
  listSummary: (title, done, total) => `${title}, ${done} dari ${total} selesai`,
  name: 'Nama',
  listNamePlaceholder: 'Belanja mingguan',
  listName: 'Nama daftar',
  cancel: 'Batal',
  createList: 'Buat daftar',
  listNotFound: 'Daftar tidak ditemukan',
  backToLists: 'Kembali ke daftar',
  addItemPlaceholder: 'Tambah barang…',
  newItem: 'Barang baru',
  quickAdd: 'Tambah cepat',
  addNamed: (name) => `Tambah ${name}`,
  addItem: 'Tambah barang',
  deleteList: 'Hapus daftar',
  deleted: (name) => `“${name}” dihapus`,
  undo: 'Urungkan',
  settings: 'Pengaturan',
  categories: 'Kategori',
  deleteNamed: (name) => `Hapus ${name}`,
  categoryName: 'Nama kategori',
  colour: 'Warna',
  colourNamed: (swatch) => `Warna ${swatch}`,
  icon: 'Ikon',
  add: 'Tambah',
  addCategory: 'Tambah kategori',
  quickAddItems: 'Barang tambah cepat',
  itemName: 'Nama barang',
  addQuickItem: 'Tambah barang cepat',
  language: 'Bahasa',
  supportPrefix: 'Suka NeoShopper? Dukung lewat ',
  notFound: 'Tidak ditemukan',
  nothingHere: 'Tidak ada apa-apa.',
  screenMissing: 'Halaman ini tidak ada.',
};

export const strings: Record<Lang, typeof en> = { en, id };

// Each language names itself, so the picker reads right before a choice is made.
export const languageNames: Record<Lang, string> = { id: 'Bahasa Indonesia', en: 'English' };

export const useT = () => strings[useStore((s) => s.language) ?? 'en'];
