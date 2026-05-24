'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, ShoppingBag, LogOut, ShieldCheck, Plus, Trash2, Home, Briefcase, Heart, CreditCard, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/features/auth/authStore';
import { mockDb } from '@/lib/supabaseClient';
import { formatPrice } from '@/lib/utils';
import { ORDER_STATUSES } from '@/lib/constants';
import Link from 'next/link';

type Tab = 'profile' | 'addresses' | 'orders';

export default function ProfilePage() {
  const router = useRouter();
  const { user, addresses, logout, updateProfile, saveAddress, deleteAddress, setDefaultAddress, initialize } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [orders, setOrders] = useState<any[]>([]);

  // Profile Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addrLabel, setAddrLabel] = useState<'home' | 'work' | 'other'>('home');
  const [addrFullName, setAddrFullName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrDefault, setAddrDefault] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (user) {
      setName(user.fullName);
      setPhone(user.phone || '');
      // Load orders
      const fetchOrders = async () => {
        try {
          const userOrders = await mockDb.getOrders(user.id);
          setOrders(userOrders);
        } catch (err) {
          console.error('Failed to load orders:', err);
        }
      };
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🔒</p>
        <h1 className="font-heading text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-text-secondary mb-6">Please log in to view your profile page.</p>
        <button onClick={() => router.push('/login')} className="px-6 py-3 gradient-gold text-[#0C0C0C] font-semibold rounded-xl">Go to Login</button>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const success = await updateProfile({ fullName: name, phone });
    setIsUpdating(false);
    if (success) {
      alert('Profile updated successfully!');
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrFullName || !addrPhone || !addrLine1 || !addrCity || !addrState || !addrPincode) {
      alert('Please fill out all required fields');
      return;
    }

    saveAddress({
      id: editingAddressId || undefined,
      label: addrLabel,
      fullName: addrFullName,
      phone: addrPhone,
      line1: addrLine1,
      line2: addrLine2,
      city: addrCity,
      state: addrState,
      pincode: addrPincode,
      isDefault: addrDefault,
    } as any);

    // Reset Address form
    setShowAddressForm(false);
    setEditingAddressId(null);
    setAddrFullName('');
    setAddrPhone('');
    setAddrLine1('');
    setAddrLine2('');
    setAddrCity('');
    setAddrState('');
    setAddrPincode('');
    setAddrDefault(false);
  };

  const handleEditAddress = (addr: any) => {
    setEditingAddressId(addr.id);
    setAddrLabel(addr.label);
    setAddrFullName(addr.fullName);
    setAddrPhone(addr.phone);
    setAddrLine1(addr.line1);
    setAddrLine2(addr.line2);
    setAddrCity(addr.city);
    setAddrState(addr.state);
    setAddrPincode(addr.pincode);
    setAddrDefault(addr.isDefault);
    setShowAddressForm(true);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left: Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
          {/* User Card */}
          <div className="glass rounded-2xl p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-gold rounded-full blur-3xl opacity-10" />
            <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-accent-gold">
              <img loading="lazy" decoding="async" src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
            </div>
            <h2 className="font-heading text-lg font-bold text-text-primary flex items-center justify-center gap-1.5">
              {user.fullName}
              {user.isAdmin && <ShieldCheck size={16} className="text-accent-gold fill-accent-gold-light" />}
            </h2>
            <p className="text-xs text-text-secondary mt-1">{user.email}</p>
            {user.isAdmin && (
              <button onClick={() => router.push('/admin')} className="mt-4 w-full py-2 bg-accent-gold-light border border-accent-gold/20 hover:border-accent-gold text-accent-gold text-xs font-semibold rounded-xl transition-all">
                Admin Panel
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="glass rounded-2xl p-2 space-y-1">
            {[
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'addresses', label: 'Addresses', icon: MapPin },
              { id: 'orders', label: 'Order History', icon: ShoppingBag },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'gradient-gold text-[#0C0C0C]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={14} className={activeTab === item.id ? 'opacity-90' : 'opacity-40'} />
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-error hover:bg-error/10 rounded-xl transition-all"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Right: Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* Tab: Profile Info */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="glass rounded-2xl p-6 lg:p-8"
              >
                <h3 className="font-heading text-xl font-bold mb-6">Profile Settings</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">Email Address</label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm opacity-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-3 gradient-gold text-[#0C0C0C] font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isUpdating ? 'Saving Changes...' : 'Save Settings'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Tab: Addresses */}
            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold">Manage Addresses</h3>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-accent-gold text-accent-gold text-xs font-semibold rounded-xl hover:bg-accent-gold-light transition-all"
                    >
                      <Plus size={14} /> Add Address
                    </button>
                  )}
                </div>

                {/* Address Form */}
                {showAddressForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="glass rounded-2xl p-6 border-accent-gold/45"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-heading font-semibold text-sm">
                        {editingAddressId ? 'Edit Address' : 'New Address'}
                      </h4>
                      <button
                        onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }}
                        className="text-xs text-text-muted hover:underline"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleAddressSubmit} className="space-y-4 max-w-2xl">
                      {/* Label Toggle */}
                      <div>
                        <span className="block text-xs font-medium text-text-secondary mb-2">Address Type</span>
                        <div className="flex gap-2">
                          {(['home', 'work', 'other'] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setAddrLabel(type)}
                              className={`px-3 py-1.5 border rounded-lg text-xs font-medium capitalize transition-all ${
                                addrLabel === type
                                  ? 'border-accent-gold bg-accent-gold-light text-accent-gold'
                                  : 'border-border hover:border-border-hover'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-text-secondary mb-1.5">Recipient Name *</label>
                          <input
                            type="text"
                            required
                            value={addrFullName}
                            onChange={(e) => setAddrFullName(e.target.value)}
                            placeholder="Full name"
                            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-secondary mb-1.5">Phone Number *</label>
                          <input
                            type="text"
                            required
                            value={addrPhone}
                            onChange={(e) => setAddrPhone(e.target.value)}
                            placeholder="Phone number"
                            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">Address Line 1 *</label>
                        <input
                          type="text"
                          required
                          value={addrLine1}
                          onChange={(e) => setAddrLine1(e.target.value)}
                          placeholder="Flat, House no., Building, Company"
                          className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          value={addrLine2}
                          onChange={(e) => setAddrLine2(e.target.value)}
                          placeholder="Area, Street, Sector, Village"
                          className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold transition-colors"
                        />
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-text-secondary mb-1.5">City *</label>
                          <input
                            type="text"
                            required
                            value={addrCity}
                            onChange={(e) => setAddrCity(e.target.value)}
                            placeholder="City"
                            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-secondary mb-1.5">State *</label>
                          <input
                            type="text"
                            required
                            value={addrState}
                            onChange={(e) => setAddrState(e.target.value)}
                            placeholder="State"
                            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-secondary mb-1.5">Pincode *</label>
                          <input
                            type="text"
                            required
                            value={addrPincode}
                            onChange={(e) => setAddrPincode(e.target.value)}
                            placeholder="6 digits"
                            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="default_addr"
                          checked={addrDefault}
                          onChange={(e) => setAddrDefault(e.target.checked)}
                          className="rounded border-border text-accent-gold focus:ring-accent-gold"
                        />
                        <label htmlFor="default_addr" className="text-xs text-text-secondary select-none">
                          Set as default shipping address
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity"
                      >
                        {editingAddressId ? 'Save Address' : 'Add Address'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Addresses List */}
                <div className="grid md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`glass rounded-2xl p-5 border relative flex flex-col justify-between ${addr.isDefault ? 'border-accent-gold/50' : 'border-border'}`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 bg-bg-secondary border border-border rounded-lg text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                            {addr.label === 'home' ? '🏠 Home' : addr.label === 'work' ? '💼 Work' : '📍 Other'}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] text-accent-gold font-bold uppercase tracking-wider">
                              ★ Default
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading font-semibold text-sm text-text-primary mb-1">{addr.fullName}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {addr.line1}, {addr.line2 && `${addr.line2}, `}
                          <br />
                          {addr.city}, {addr.state} - <strong className="font-medium text-text-primary">{addr.pincode}</strong>
                        </p>
                        <p className="text-xs text-text-muted mt-2">📞 {addr.phone}</p>
                      </div>

                      <div className="flex gap-3 mt-5 pt-3 border-t border-border/60">
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-xs text-accent-gold hover:underline font-medium"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="text-xs text-text-secondary hover:text-text-primary font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-xs text-error hover:underline font-medium ml-auto flex items-center gap-1"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {addresses.length === 0 && (
                    <div className="col-span-2 text-center py-12 glass rounded-2xl">
                      <p className="text-3xl mb-2">📍</p>
                      <h4 className="font-heading font-semibold text-sm mb-1">No Addresses Saved</h4>
                      <p className="text-text-muted text-xs mb-4">Please add a shipping address for faster checkouts.</p>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="px-4 py-2 bg-accent-gold-light border border-accent-gold/20 hover:border-accent-gold text-accent-gold text-xs font-semibold rounded-xl"
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-6"
              >
                <h3 className="font-heading text-xl font-bold">Your Orders</h3>
                
                <div className="space-y-4">
                  {orders.map((order) => {
                    const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES] || { label: order.status, color: '#9A9A9A' };
                    return (
                      <div key={order.id} className="glass rounded-2xl overflow-hidden border border-border">
                        {/* Order Header */}
                        <div className="bg-bg-secondary/40 border-b border-border/60 px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-text-muted">Order Placed</span>
                            <p className="font-medium text-text-primary mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <div>
                            <span className="text-text-muted">Order Number</span>
                            <p className="font-mono font-medium text-text-primary mt-0.5">{order.orderNumber}</p>
                          </div>
                          <div>
                            <span className="text-text-muted">Total Amount</span>
                            <p className="font-bold text-text-primary mt-0.5">{formatPrice(order.total)}</p>
                          </div>
                          <div>
                            <span className="text-text-muted">Status</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }} />
                              <span className="font-semibold" style={{ color: status.color }}>{status.label}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-5 divide-y divide-border/60">
                          {order.items.map((item: any) => (
                            <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                              <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-bg-secondary shrink-0">
                                <img loading="lazy" decoding="async" src={item.productImageSnapshot} alt={item.productNameSnapshot} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-text-primary truncate">{item.productNameSnapshot}</h4>
                                <p className="text-xs text-text-secondary mt-1">Size: <strong className="font-medium">{item.size}</strong> • Qty: <strong className="font-medium">{item.quantity}</strong></p>
                                <p className="text-xs font-bold text-text-primary mt-2">{formatPrice(item.priceAtPurchase)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer / Tracking */}
                        {order.trackingNumber && (
                          <div className="bg-bg-secondary/20 border-t border-border/50 px-5 py-3 flex items-center justify-between text-xs">
                            <span className="text-text-secondary">Tracking: <strong className="font-mono">{order.trackingNumber}</strong></span>
                            <span className="text-accent-gold font-medium">Est. Delivery: 4-5 Days</span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {orders.length === 0 && (
                    <div className="text-center py-16 glass rounded-2xl">
                      <p className="text-4xl mb-3">🛍️</p>
                      <h4 className="font-heading font-semibold text-sm mb-1">No Orders Placed Yet</h4>
                      <p className="text-text-muted text-xs mb-6">Discover the premium vintage collections and place your first order.</p>
                      <Link href="/shop" className="px-5 py-2.5 gradient-gold text-[#0C0C0C] text-xs font-semibold rounded-xl">
                        Shop Now
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
