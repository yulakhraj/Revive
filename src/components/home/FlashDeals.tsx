'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Clock } from 'lucide-react';
import { getFlashDeals } from '@/data/mockProducts';
import { formatPrice, formatDiscount } from '@/lib/utils';
import { useCartStore } from '@/features/cart/cartStore';

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1.5">
      {[
        { val: timeLeft.hours, label: 'H' },
        { val: timeLeft.minutes, label: 'M' },
        { val: timeLeft.seconds, label: 'S' },
      ].map((t, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className="w-10 h-10 bg-bg-primary border border-border rounded-lg flex items-center justify-center font-heading font-bold text-sm">
            {String(t.val).padStart(2, '0')}
          </span>
          {i < 2 && <span className="text-text-muted font-bold">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function FlashDeals() {
  const products = getFlashDeals();
  const addToCart = useCartStore((s) => s.addItem);
  const [endTime, setEndTime] = useState<Date | null>(null);

  useEffect(() => {
    setEndTime(new Date(Date.now() + 6 * 60 * 60 * 1000)); // 6 hours from now
  }, []);

  if (products.length === 0) return null;
  if (!endTime) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="bg-bg-secondary border border-border rounded-2xl p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-error text-xs font-semibold uppercase tracking-widest mb-2">
              <Zap size={14} className="animate-pulse" /> Flash Deals
            </div>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold">
              Today&apos;s <span className="text-gradient-gold">Hot Drops</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-text-muted" />
            <span className="text-xs text-text-muted mr-1">Ends in</span>
            <CountdownTimer endTime={endTime} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex gap-4 bg-bg-primary border border-border rounded-xl p-4 hover:border-accent-gold/30 transition-all"
            >
              <Link href={`/product/${product.slug}`} className="shrink-0 w-24 h-28 rounded-lg overflow-hidden">
                <img src={product.images[0]?.url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </Link>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">{product.brand}</p>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-accent-gold transition-colors">{product.name}</h3>
                  </Link>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-base font-bold">{formatPrice(product.price)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
                      <span className="text-[10px] text-error font-bold">{formatDiscount(product.discountPercent)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product, product.sizeAvailable[0] || 'M')}
                    className="px-3 py-1.5 gradient-gold text-[#0C0C0C] text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
