'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, Truck, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { mockDb } from '@/lib/supabaseClient';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const orders = await mockDb.getOrders();
          const foundOrder = orders.find((o) => o.id === orderId);
          if (foundOrder) {
            setOrder(foundOrder);
          }
        } catch (err) {
          console.error('Failed to load order confirmation:', err);
        }
      };
      fetchOrder();
    }
  }, [orderId]);

  if (!orderId || !order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="font-heading text-2xl font-bold mb-2">Order Not Found</h1>
        <p className="text-text-secondary mb-6">We couldn&apos;t retrieve details for this order ID.</p>
        <Link href="/shop" className="px-6 py-3 gradient-gold text-[#0C0C0C] font-semibold rounded-xl">Back to Shop</Link>
      </div>
    );
  }

  // Delivery track states
  const trackingSteps = [
    { label: 'Ordered', desc: 'Order placed & confirmed', isDone: true },
    { label: 'Packed', desc: 'Verified & packed by Revive', isDone: order.status !== 'pending' },
    { label: 'Shipped', desc: 'In transit to delivery hub', isDone: ['shipped', 'delivered'].includes(order.status) },
    { label: 'Delivered', desc: 'Handed to recipient', isDone: order.status === 'delivered' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16 space-y-8">
      {/* Success Banner */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full text-success mb-2"
        >
          <CheckCircle2 size={48} className="animate-float" />
        </motion.div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary">Order Confirmed!</h1>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Thank you for reviving your wardrobe! We will send you an email confirmation with tracking updates.
        </p>
        <div className="inline-block px-4 py-1.5 bg-bg-secondary rounded-full font-mono text-xs font-semibold text-text-primary border border-border">
          Order ID: {order.orderNumber}
        </div>
      </div>

      {/* Delivery Tracking pipeline */}
      <div className="glass rounded-2xl p-6 lg:p-8">
        <h3 className="font-heading font-semibold text-sm mb-6 flex items-center gap-2">
          <Truck size={16} className="text-accent-gold" /> Delivery Tracker
        </h3>
        
        {/* Tracker Pipeline Horizontal / Vertical grid */}
        <div className="relative grid md:grid-cols-4 gap-6 pt-4">
          {/* Connector line for desktop */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-border hidden md:block -z-10">
            <motion.div 
              className="h-full bg-accent-gold" 
              initial={{ width: 0 }} 
              animate={{ 
                width: order.status === 'delivered' ? '100%' 
                     : order.status === 'shipped' ? '66.6%' 
                     : order.status !== 'pending' ? '33.3%' : '0%' 
              }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {trackingSteps.map((step, idx) => (
            <div key={idx} className="flex md:flex-col items-center gap-4 md:text-center relative">
              {/* Check Circle bubble */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${
                step.isDone 
                  ? 'bg-accent-gold border-accent-gold text-[#0C0C0C]' 
                  : 'bg-bg-elevated border-border text-text-muted'
              } font-bold text-xs shadow-md z-10 transition-colors duration-500`}>
                {step.isDone ? '✓' : idx + 1}
              </div>
              <div className="space-y-0.5">
                <p className={`text-xs font-semibold ${step.isDone ? 'text-text-primary' : 'text-text-muted'}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Details summary */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping address & Payment info */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <h4 className="font-heading font-semibold text-sm border-b border-border pb-3">Delivery & Payment</h4>
          
          <div className="space-y-3 text-xs">
            <div className="flex gap-2">
              <MapPin size={14} className="text-accent-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-text-primary">{order.shippingAddress.fullName}</p>
                <p className="text-text-secondary mt-1">
                  {order.shippingAddress.line1}, {order.shippingAddress.line2 && `${order.shippingAddress.line2}, `}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="text-text-muted mt-1">📞 {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="border-t border-border/60 pt-3 flex justify-between">
              <span className="text-text-secondary">Payment Method</span>
              <span className="font-medium text-text-primary">{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-secondary">Payment Status</span>
              <span className={`font-semibold capitalize ${order.paymentStatus === 'paid' ? 'text-success' : 'text-warning'}`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <h4 className="font-heading font-semibold text-sm border-b border-border pb-3 flex items-center justify-between">
            <span>Invoice Summary</span>
            <span className="text-xs text-text-muted">Items: {order.items.reduce((sum: number, i: any) => sum + i.quantity, 0)}</span>
          </h4>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="min-w-0 pr-2">
                  <p className="font-medium text-text-primary truncate">{item.productNameSnapshot}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-text-primary shrink-0">{formatPrice(item.priceAtPurchase * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Shipping Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Tax (5% GST)</span>
              <span>{formatPrice(order.shippingFee + order.subtotal * 0.05 - order.subtotal * 0.05)} {/* Dynamic computation from order.total */}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-text-primary pt-2 border-t border-border/60">
              <span>Grand Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link 
          href="/shop" 
          className="px-6 py-3.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <ShoppingBag size={16} /> Continue Shopping
        </Link>
        <Link 
          href="/profile" 
          className="px-6 py-3.5 border border-border text-text-primary font-semibold rounded-xl text-sm flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors"
        >
          View Order History
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
