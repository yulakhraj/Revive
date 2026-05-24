import { create } from 'zustand';
import type { Product } from '@/types';

interface QuickViewStore {
  isOpen: boolean;
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

export const useQuickViewStore = create<QuickViewStore>((set) => ({
  isOpen: false,
  product: null,
  open: (product) => set({ isOpen: true, product }),
  close: () => set({ isOpen: false, product: null }),
}));
