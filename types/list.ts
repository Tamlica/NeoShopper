export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  notes?: string;
  completed: boolean;
  createdAt: number;
}

export interface ShoppingList {
  id: string;
  title: string;
  createdAt: number;
  items: ShoppingItem[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface QuickAddItem {
  id: string;
  name: string;
  category: string;
}