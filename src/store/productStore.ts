import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  setProducts: (products) => set({ products }),
}));
