import { createClient } from '@supabase/supabase-js';
import { mockProducts } from '@/data/mockProducts';
import type { Product, User, Address, Order } from '@/types';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}.supabase.co`;
}
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Determine if we should use the real Supabase client
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock database storage keys
const MOCK_STORAGE_KEYS = {
  users: 'revive_mock_users',
  currentUser: 'revive_mock_current_user',
  products: 'revive_mock_products',
  orders: 'revive_mock_orders',
  addresses: 'revive_mock_addresses',
  categories: 'revive_mock_categories',
};

// Helper to get from localstorage
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

// Helper to set in localstorage
const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Mock & Real Auth Wrapper API
export const mockAuth = {
  async signUp(email: string, fullName: string, password?: string) {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password: password || 'defaultpassword123',
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
        
        const user: User = {
          id: data.user?.id || '',
          email: data.user?.email || email,
          fullName: fullName,
          avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(fullName)}`,
          phone: '',
          isAdmin: email.toLowerCase().includes('admin'),
          preferences: {},
          createdAt: data.user?.created_at || new Date().toISOString(),
        };
        return { data: { user, session: data.session }, error: null };
      } catch (err) {
        console.warn('Supabase signUp failed, falling back to mock auth:', err);
      }
    }

    const users = getStorageItem<any[]>(MOCK_STORAGE_KEYS.users, []);
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      fullName,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(fullName)}`,
      phone: '',
      isAdmin: email.toLowerCase().includes('admin'),
      preferences: {},
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    setStorageItem(MOCK_STORAGE_KEYS.users, users);
    setStorageItem(MOCK_STORAGE_KEYS.currentUser, newUser);

    return { data: { user: newUser, session: { access_token: 'mock-token' } }, error: null };
  },

  async signIn(email: string, password?: string) {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password: password || 'defaultpassword123'
        });
        if (error) throw error;
        
        const { data: profile, error: profileErr } = await supabaseClient.from('profiles').select('*').eq('id', data.user?.id).single();
        if (profileErr) throw profileErr;
        const user: User = {
          id: data.user?.id || '',
          email: data.user?.email || email,
          fullName: profile?.full_name || email.split('@')[0],
          avatarUrl: profile?.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${data.user?.id}`,
          phone: profile?.phone || '',
          isAdmin: profile?.is_admin || false,
          preferences: profile?.preferences || {},
          createdAt: data.user?.created_at || new Date().toISOString(),
        };
        return { data: { user, session: data.session }, error: null };
      } catch (err) {
        console.warn('Supabase signIn failed, falling back to mock auth:', err);
      }
    }

    const users = getStorageItem<any[]>(MOCK_STORAGE_KEYS.users, []);
    
    // Migration: Update old default admin email to 'admin'
    let hasMigration = false;
    const adminIdx = users.findIndex(u => u.email === 'admin@revive.com' || u.id === 'admin-id');
    if (adminIdx !== -1 && users[adminIdx].email !== 'admin') {
      users[adminIdx].email = 'admin';
      hasMigration = true;
    }

    if (users.length === 0 || hasMigration) {
      if (users.length === 0) {
        const defaultAdmin = {
          id: 'admin-id',
          email: 'admin',
          fullName: 'System Admin',
          avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin',
          phone: '+91 99999 99999',
          isAdmin: true,
          preferences: {},
          createdAt: new Date().toISOString(),
        };
        const defaultUser = {
          id: 'user-id',
          email: 'user@revive.com',
          fullName: 'Jane Doe',
          avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jane',
          phone: '+91 98765 43210',
          isAdmin: false,
          preferences: {},
          createdAt: new Date().toISOString(),
        };
        users.push(defaultAdmin, defaultUser);
      }
      setStorageItem(MOCK_STORAGE_KEYS.users, users);
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found. Use admin/admin or user@revive.com.');
    }

    if (email === 'admin' && password !== 'admin') {
      throw new Error('Incorrect password. Use "admin" for admin access.');
    }

    setStorageItem(MOCK_STORAGE_KEYS.currentUser, user);
    return { data: { user, session: { access_token: 'mock-token' } }, error: null };
  },

  async signOut() {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        return { error: null };
      } catch (err) {
        console.warn('Supabase signOut failed, falling back to mock auth:', err);
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(MOCK_STORAGE_KEYS.currentUser);
    }
    return { error: null };
  },

  async getSessionUser() {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (session?.user) {
          const { data: profile, error: profileErr } = await supabaseClient.from('profiles').select('*').eq('id', session.user.id).single();
          if (profileErr) throw profileErr;
          const user: User = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: profile?.full_name || '',
            avatarUrl: profile?.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${session.user.id}`,
            phone: profile?.phone || '',
            isAdmin: profile?.is_admin || false,
            preferences: profile?.preferences || {},
            createdAt: session.user.created_at,
          };
          return { data: { user }, error: null };
        }
        return { data: { user: null }, error: null };
      } catch (err) {
        console.warn('Supabase getSessionUser failed, falling back to mock auth:', err);
      }
    }

    const user = getStorageItem<any | null>(MOCK_STORAGE_KEYS.currentUser, null);
    return { data: { user }, error: null };
  },

  async updateProfile(userId: string, updates: any) {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from('profiles')
          .update({ full_name: updates.fullName, phone: updates.phone })
          .eq('id', userId);
        if (error) throw error;
        return { data: { user: { id: userId, ...updates } }, error: null };
      } catch (err) {
        console.warn('Supabase updateProfile failed, falling back to mock auth:', err);
      }
    }

    const users = getStorageItem<any[]>(MOCK_STORAGE_KEYS.users, []);
    const updatedUsers = users.map(u => u.id === userId ? { ...u, ...updates } : u);
    setStorageItem(MOCK_STORAGE_KEYS.users, updatedUsers);

    const currentUser = getStorageItem<any | null>(MOCK_STORAGE_KEYS.currentUser, null);
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, ...updates };
      setStorageItem(MOCK_STORAGE_KEYS.currentUser, updatedUser);
      return { data: { user: updatedUser }, error: null };
    }
    return { data: null, error: null };
  }
};

// Mock & Real Database Wrapper API
export const mockDb = {
  // Addresses CRUD
  async getAddresses(userId: string): Promise<Address[]> {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('addresses')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        if (error) throw error;
        return (data || []).map((a: any) => ({
          id: a.id,
          userId: a.user_id,
          label: a.label,
          fullName: a.full_name,
          phone: a.phone,
          line1: a.line1,
          line2: a.line2,
          city: a.city,
          state: a.state,
          pincode: a.pincode,
          isDefault: a.is_default,
        }));
      } catch (err) {
        console.warn('Supabase getAddresses failed, falling back to mock storage:', err);
      }
    }

    const addresses = getStorageItem<any[]>(MOCK_STORAGE_KEYS.addresses, []);
    if (addresses.length === 0) {
      const defaultAddress = {
        id: 'addr-1',
        userId,
        label: 'home',
        fullName: 'Jane Doe',
        phone: '+91 98765 43210',
        line1: 'Flat 402, Sunset Heights',
        line2: 'Carter Road, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true,
      };
      addresses.push(defaultAddress);
      setStorageItem(MOCK_STORAGE_KEYS.addresses, addresses);
    }
    return addresses.filter(a => a.userId === userId);
  },

  async saveAddress(userId: string, address: any): Promise<Address[]> {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const dbAddress = {
          label: address.label,
          full_name: address.fullName,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          is_default: address.isDefault,
          user_id: userId,
        };
        
        if (address.isDefault) {
          await supabaseClient.from('addresses').update({ is_default: false }).eq('user_id', userId);
        }

        if (address.id) {
          const { error } = await supabaseClient.from('addresses').update(dbAddress).eq('id', address.id);
          if (error) throw error;
        } else {
          const { error } = await supabaseClient.from('addresses').insert(dbAddress);
          if (error) throw error;
        }
        return await this.getAddresses(userId);
      } catch (err) {
        console.warn('Supabase saveAddress failed, falling back to mock storage:', err);
      }
    }

    const addresses = getStorageItem<any[]>(MOCK_STORAGE_KEYS.addresses, []);
    if (address.isDefault) {
      addresses.forEach(a => {
        if (a.userId === userId) a.isDefault = false;
      });
    }

    if (address.id) {
      const index = addresses.findIndex(a => a.id === address.id);
      if (index !== -1) {
        addresses[index] = { ...addresses[index], ...address };
      }
    } else {
      const newAddress = {
        ...address,
        id: Math.random().toString(36).substring(2, 11),
        userId,
      };
      addresses.push(newAddress);
    }

    setStorageItem(MOCK_STORAGE_KEYS.addresses, addresses);
    return addresses.filter(a => a.userId === userId);
  },

  async deleteAddress(userId: string, addressId: string): Promise<Address[]> {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { error } = await supabaseClient.from('addresses').delete().eq('id', addressId).eq('user_id', userId);
        if (error) throw error;
        return await this.getAddresses(userId);
      } catch (err) {
        console.warn('Supabase deleteAddress failed, falling back to mock storage:', err);
      }
    }

    let addresses = getStorageItem<any[]>(MOCK_STORAGE_KEYS.addresses, []);
    addresses = addresses.filter(a => !(a.id === addressId && a.userId === userId));
    
    const userAddresses = addresses.filter(a => a.userId === userId);
    if (userAddresses.length > 0 && !userAddresses.some(a => a.isDefault)) {
      userAddresses[0].isDefault = true;
    }
    
    setStorageItem(MOCK_STORAGE_KEYS.addresses, addresses);
    return userAddresses;
  },

  // Orders CRUD
  async getOrders(userId?: string): Promise<Order[]> {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        let query = supabaseClient.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
        if (userId) {
          query = query.eq('user_id', userId);
        }
        const { data, error } = await query;
        if (error) throw error;
        return (data || []).map((o: any) => ({
          id: o.id,
          orderNumber: o.order_number,
          userId: o.user_id,
          addressId: o.address_id,
          subtotal: Number(o.subtotal),
          discount: Number(o.discount),
          shippingFee: Number(o.shipping_fee),
          total: Number(o.total),
          status: o.status,
          paymentMethod: o.payment_method,
          paymentId: o.payment_id,
          paymentStatus: o.payment_status,
          couponId: o.coupon_id,
          trackingNumber: o.tracking_number,
          trackingUrl: o.tracking_url,
          createdAt: o.created_at,
          updatedAt: o.updated_at,
          items: (o.order_items || []).map((i: any) => ({
            id: i.id,
            orderId: i.order_id,
            productId: i.product_id,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
            priceAtPurchase: Number(i.price_at_purchase),
            productNameSnapshot: i.product_name_snapshot,
            productImageSnapshot: i.product_image_snapshot,
          })),
          shippingAddress: o.shippingAddress || {},
        }));
      } catch (err) {
        console.warn('Supabase getOrders failed, falling back to mock storage:', err);
      }
    }

    const orders = getStorageItem<any[]>(MOCK_STORAGE_KEYS.orders, []);
    if (userId) {
      return orders.filter(o => o.userId === userId);
    }
    return orders;
  },

  async createOrder(orderData: any): Promise<Order> {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { items, shippingAddress, ...order } = orderData;
        const dbOrder = {
          order_number: `REV-${Math.floor(100000 + Math.random() * 900000)}`,
          user_id: order.userId,
          address_id: order.addressId,
          subtotal: order.subtotal,
          discount: order.discount || 0,
          shipping_fee: order.shippingFee,
          total: order.total,
          status: order.status || 'pending',
          payment_method: order.paymentMethod,
          payment_id: order.paymentId,
          payment_status: order.paymentStatus || 'pending',
          tracking_number: order.trackingNumber,
          tracking_url: order.trackingUrl,
        };

        const { data: newOrder, error: orderErr } = await supabaseClient
          .from('orders')
          .insert(dbOrder)
          .select()
          .single();
        
        if (orderErr) throw orderErr;

        if (newOrder && items) {
          const dbItems = items.map((i: any) => ({
            order_id: newOrder.id,
            product_id: i.productId,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
            price_at_purchase: i.priceAtPurchase,
            product_name_snapshot: i.product_name_snapshot,
            product_image_snapshot: i.productImageSnapshot,
          }));
          const { error: itemsErr } = await supabaseClient.from('order_items').insert(dbItems);
          if (itemsErr) throw itemsErr;
        }
        return { ...newOrder, items, shippingAddress } as Order;
      } catch (err) {
        console.warn('Supabase createOrder failed, falling back to mock storage:', err);
      }
    }

    const orders = getStorageItem<any[]>(MOCK_STORAGE_KEYS.orders, []);
    const newOrder = {
      ...orderData,
      id: Math.random().toString(36).substring(2, 11),
      orderNumber: `REV-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    setStorageItem(MOCK_STORAGE_KEYS.orders, orders);
    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('orders')
          .update({ status })
          .eq('id', orderId)
          .select()
          .single();
        if (error) throw error;
        return data as Order;
      } catch (err) {
        console.warn('Supabase updateOrderStatus failed, falling back to mock storage:', err);
      }
    }

    const orders = getStorageItem<any[]>(MOCK_STORAGE_KEYS.orders, []);
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updatedAt = new Date().toISOString();
      setStorageItem(MOCK_STORAGE_KEYS.orders, orders);
      return orders[index];
    }
    return null;
  },

  // Products CRUD
  async getProducts(): Promise<Product[]> {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('products').select('*, product_images(*)').order('created_at', { ascending: false });
        if (error) throw error;
        return (data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: Number(p.price),
          originalPrice: Number(p.original_price),
          discountPercent: Number(p.discount_percent),
          categoryId: p.category_id,
          brand: p.brand,
          condition: p.condition,
          gender: p.gender,
          fabric: p.fabric || '',
          color: p.color || '',
          style: p.style || '',
          sizeAvailable: p.size_available,
          stockQuantity: p.stock_quantity,
          isFeatured: p.is_featured,
          isPremium: p.is_premium,
          isFlashDeal: p.is_flash_deal,
          isVerified: p.is_verified,
          sellerType: p.seller_type,
          sellerId: p.seller_id,
          avgRating: Number(p.avg_rating),
          reviewCount: p.review_count,
          viewCount: p.view_count,
          tags: p.tags,
          images: (p.product_images || []).map((img: any) => ({
            id: img.id,
            productId: img.product_id,
            url: img.url,
            sortOrder: img.sort_order,
            isPrimary: img.is_primary,
          })),
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        }));
      } catch (err) {
        console.warn('Supabase getProducts failed, falling back to mock storage:', err);
      }
    }

    const products = getStorageItem<any[]>(MOCK_STORAGE_KEYS.products, []);
    let hasChanges = false;
    const merged = [...products];
    
    mockProducts.forEach(mp => {
      const existingIdx = merged.findIndex(p => p.id === mp.id);
      if (existingIdx === -1) {
        merged.push(mp);
        hasChanges = true;
      } else {
        const existing = merged[existingIdx];
        const primaryImgUrl = existing.images?.[0]?.url;
        const mpPrimaryImgUrl = mp.images?.[0]?.url;
        
        if (
          existing.categoryId !== mp.categoryId ||
          existing.name !== mp.name ||
          primaryImgUrl !== mpPrimaryImgUrl ||
          JSON.stringify(existing.images) !== JSON.stringify(mp.images)
        ) {
          merged[existingIdx] = {
            ...existing,
            name: mp.name,
            slug: mp.slug,
            description: mp.description,
            price: mp.price,
            originalPrice: mp.originalPrice,
            discountPercent: mp.discountPercent,
            categoryId: mp.categoryId,
            images: mp.images,
          };
          hasChanges = true;
        }
      }
    });

    if (hasChanges || products.length < mockProducts.length) {
      setStorageItem(MOCK_STORAGE_KEYS.products, merged);
      return merged;
    }
    return products;
  },

  async saveProducts(products: any[]) {
    if (isSupabaseConfigured && supabaseClient) {
      try {
        // Bulk insert/upsert to Supabase
        const { error } = await supabaseClient.from('products').upsert(products);
        if (error) throw error;
        return;
      } catch (err) {
        console.warn('Supabase saveProducts failed, falling back to mock storage:', err);
      }
    }
    setStorageItem(MOCK_STORAGE_KEYS.products, products);
  }
};
