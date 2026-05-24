'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Crown } from 'lucide-react';
import { getPremiumProducts } from '@/data/mockProducts';
import { formatPrice } from '@/lib/utils';

export default function PremiumCollection() {
  const products = getPremiumProducts();

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Dark background with vibrant blobs */}
      <div className="absolute inset-0 bg-accent-ink" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-coral/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-lilac/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '-6s' }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent-butter/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '-3s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-butter text-accent-ink text-xs font-black uppercase tracking-wider rounded-full border-[1.5px] border-bg-primary shadow-pop-sm mb-5"
          >
            <Crown size={14} /> Curated Luxury
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl lg:text-6xl font-black text-bg-primary mb-3 tracking-tight"
          >
            Premium <span className="headline-italic text-gradient-butter">collection</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-bg-primary/60 text-sm max-w-md mx-auto"
          >
            Designer wear, luxury vintage, and limited edition pieces — authenticated, verified, ridiculously good.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/product/${product.slug}`}
                className="group block relative rounded-3xl overflow-hidden border-[1.5px] border-bg-primary/20 bg-white/5 backdrop-blur-sm hover:border-accent-butter transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/5] relative">
                  <img src={product.images[0]?.url} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-ink via-accent-ink/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-accent-butter text-accent-ink text-[10px] font-black rounded-full uppercase border-[1.5px] border-accent-ink shadow-pop-sm -rotate-3">✦ Premium</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-bg-primary/50 text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">{product.brand}</p>
                  <h3 className="text-bg-primary font-semibold text-base mb-3 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-accent-butter font-black text-lg">{formatPrice(product.price)}</span>
                      <span className="text-bg-primary/40 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-bg-primary text-accent-ink border-[1.5px] border-accent-ink flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/category/premium"
            className="inline-flex items-center gap-2 px-7 py-4 bg-accent-butter text-accent-ink font-black rounded-full text-sm border-[1.5px] border-accent-ink shadow-pop-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--accent-coral)] transition-all"
          >
            Explore premium <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
