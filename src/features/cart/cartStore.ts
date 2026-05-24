import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

export interface CartItemState {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItemState[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === product.id && item.size === size
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { productId: product.id, product, size, quantity }],
          };
        });
      },
      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.size === size)
          ),
        }));
      },
      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    { name: 'revive-cart' }
  )
);
