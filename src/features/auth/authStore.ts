import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address } from '@/types';
import { mockAuth, mockDb } from '@/lib/supabaseClient';

interface AuthState {
  user: User | null;
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  
  initialize: () => Promise<void>;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (fullName: string, email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  
  fetchAddresses: () => Promise<void>;
  saveAddress: (address: Omit<Address, 'userId' | 'id'> & { id?: string }) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      addresses: [],
      isLoading: false,
      error: null,

      initialize: async () => {
        set({ isLoading: true });
        try {
          const { data } = await mockAuth.getSessionUser();
          if (data?.user) {
            set({ user: data.user });
            // Fetch addresses
            const userAddresses = await mockDb.getAddresses(data.user.id);
            set({ addresses: userAddresses });
          }
        } catch (err) {
          console.error('Initialization error:', err);
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (email: string, password?: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await mockAuth.signIn(email, password);
          if (error) throw error;
          if (data?.user) {
            set({ user: data.user });
            // Fetch addresses
            const userAddresses = await mockDb.getAddresses(data.user.id);
            set({ addresses: userAddresses });
            return true;
          }
          return false;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed';
          set({ error: message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (fullName: string, email: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await mockAuth.signUp(email, fullName);
          if (error) throw error;
          if (data?.user) {
            set({ user: data.user });
            set({ addresses: [] });
            return true;
          }
          return false;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Registration failed';
          set({ error: message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await mockAuth.signOut();
          set({ user: null, addresses: [] });
        } catch (err) {
          console.error('Logout error:', err);
        } finally {
          set({ isLoading: false });
        }
      },

      updateProfile: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return false;
        set({ isLoading: true });
        try {
          const { data } = await mockAuth.updateProfile(user.id, updates);
          if (data?.user) {
            set({ user: data.user });
            return true;
          }
          return false;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to update profile';
          set({ error: message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchAddresses: async () => {
        const { user } = get();
        if (!user) return;
        try {
          const userAddresses = await mockDb.getAddresses(user.id);
          set({ addresses: userAddresses });
        } catch (err) {
          console.error(err);
        }
      },

      saveAddress: async (addressData) => {
        const { user } = get();
        if (!user) return;
        try {
          const userAddresses = await mockDb.saveAddress(user.id, addressData);
          set({ addresses: userAddresses });
        } catch (err) {
          console.error(err);
        }
      },

      deleteAddress: async (addressId) => {
        const { user } = get();
        if (!user) return;
        try {
          const userAddresses = await mockDb.deleteAddress(user.id, addressId);
          set({ addresses: userAddresses });
        } catch (err) {
          console.error(err);
        }
      },

      setDefaultAddress: async (addressId) => {
        const { user } = get();
        if (!user) return;
        try {
          const userAddresses = await mockDb.saveAddress(user.id, { id: addressId, isDefault: true });
          set({ addresses: userAddresses });
        } catch (err) {
          console.error(err);
        }
      },
    }),
    {
      name: 'revive-auth',
      partialize: (state) => ({ user: state.user, addresses: state.addresses }),
    }
  )
);
