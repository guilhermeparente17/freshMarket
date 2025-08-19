import { create } from "zustand";

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  addCategory: (category: Category) => void;
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],

  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),

  setCategories: (categories) => set({ categories }),
}));
