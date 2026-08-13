import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          items.push({ ...product, quantity });
        }

        set({ items });
        get().calculateTotal();
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
        get().calculateTotal();
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items;
        const item = items.find((item) => item.id === productId);
        if (item) {
          item.quantity = quantity;
          if (item.quantity <= 0) {
            set({ items: items.filter((item) => item.id !== productId) });
          } else {
            set({ items });
          }
        }
        get().calculateTotal();
      },

      clearCart: () => set({ items: [], total: 0 }),

      calculateTotal: () => {
        const total = get().items.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
        set({ total });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
