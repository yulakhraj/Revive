'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '@/features/cart/cartStore';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getSubtotal();
  const discount = couponApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal >= 999 ? 0 : 79;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <ShoppingBag size={64} className="mx-auto mb-6 text-text-muted" strokeWidth={1} />
          <h1 className="font-heading text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-text-secondary text-sm mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-bold mb-8">
        Shopping Cart <span className="text-text-muted text-lg font-normal">({items.length} items)</span>
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={`${item.productId}-${item.size}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 bg-bg-secondary border border-border rounded-2xl p-4"
            >
              <Link href={`/product/${item.product.slug}`} className="shrink-0 w-24 h-28 rounded-xl overflow-hidden">
                <Image src={item.product.images[0]?.url} alt={item.product.name} width={96} height={112} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">{item.product.brand}</p>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="text-sm font-medium line-clamp-1 hover:text-accent-gold transition-colors">{item.product.name}</h3>
                      </Link>
                    </div>
                    <button onClick={() => removeItem(item.productId, item.size)} className="p-1 hover:bg-bg-primary rounded-lg transition-colors text-text-muted hover:text-error">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-text-muted mt-1">Size: {item.size}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} className="p-1.5 hover:bg-bg-primary rounded-l-lg transition-colors"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} className="p-1.5 hover:bg-bg-primary rounded-r-lg transition-colors"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                    {item.product.originalPrice > item.product.price && (
                      <p className="text-xs text-text-muted line-through">{formatPrice(item.product.originalPrice * item.quantity)}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-bg-secondary border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="font-heading font-semibold text-lg mb-5">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="w-full pl-9 pr-3 py-2.5 bg-bg-primary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <button
                  onClick={() => { if (coupon === 'AUSPHOTIC20') setCouponApplied(true); }}
                  className="px-4 py-2.5 border border-accent-gold text-accent-gold text-sm font-semibold rounded-xl hover:bg-accent-gold hover:text-[#0C0C0C] transition-all"
                >
                  Apply
                </button>
              </div>
              {couponApplied && <p className="text-xs text-success mt-2">🎉 AUSPHOTIC20 applied — 20% off!</p>}
              <p className="text-[10px] text-text-muted mt-1">Try: AUSPHOTIC20</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-text-secondary">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {couponApplied && <div className="flex justify-between text-success"><span>Discount (20%)</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-text-secondary">Shipping</span><span>{shipping === 0 ? <span className="text-success">Free</span> : formatPrice(shipping)}</span></div>
              {shipping > 0 && <p className="text-[10px] text-text-muted">Free shipping on orders above ₹999</p>}
              <div className="border-t border-border pt-3 mt-3 flex justify-between text-base font-bold">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="flex items-center justify-center gap-2 w-full py-4 mt-6 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Checkout <ArrowRight size={16} />
            </Link>

            <Link href="/shop" className="block text-center text-sm text-text-secondary hover:text-accent-gold mt-4 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
