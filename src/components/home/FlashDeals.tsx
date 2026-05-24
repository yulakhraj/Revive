'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Clock } from 'lucide-react';
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
          <span className="w-11 h-11 bg-accent-ink text-bg-primary border-[1.5px] border-accent-ink rounded-xl flex items-center justify-center font-heading font-black text-base">
            {String(t.val).padStart(2, '0')}
          </span>
          {i < 2 && <span className="text-accent-coral font-black text-lg">:</span>}
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
    setEndTime(new Date(Date.now() + 6 * 60 * 60 * 1000));
  }, []);

  if (products.length === 0) return null;
  if (!endTime) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
      <div className="relative rounded-[2rem] border-[1.5px] border-accent-ink p-6 lg:p-10 overflow-hidden shadow-pop bg-bg-elevated">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent-coral/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent-butter/30 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: -4 }}
              viewport={{ once: true }}
              className="sticker mb-4 bg-accent-coral text-white"
            >
              <Zap size={14} className="animate-pulse" /> FLASH DEALS
            </motion.span>
            <h2 className="font-heading text-3xl lg:text-5xl font-black tracking-tight">
              Today&apos;s <span className="headline-italic text-gradient-sunset">hot drops</span>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] text-text-muted font-bold uppercase tracking-widest">
              <Clock size={12} /> Ends in
            </span>
            <CountdownTimer endTime={endTime} />
          </div>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex gap-4 bg-bg-primary border-[1.5px] border-accent-ink rounded-2xl p-4 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--accent-coral)] transition-all duration-300"
            >
              <Link href={`/product/${product.slug}`} className="shrink-0 w-24 h-28 rounded-xl overflow-hidden border-[1.5px] border-accent-ink">
                <img src={product.images[0]?.url} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </Link>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-[0.18em] font-bold">{product.brand}</p>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-accent-coral transition-colors">{product.name}</h3>
                  </Link>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-base font-black">{formatPrice(product.price)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
                      <span className="text-[10px] text-accent-coral font-black">{formatDiscount(product.discountPercent)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product, product.sizeAvailable[0] || 'M')}
                    className="px-3 py-1.5 bg-accent-ink text-bg-primary text-[11px] font-black rounded-full border-[1.5px] border-accent-ink hover:bg-accent-coral hover:text-white transition-colors uppercase tracking-wider"
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
