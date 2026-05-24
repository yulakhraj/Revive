'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Crown } from 'lucide-react';
import { getPremiumProducts } from '@/data/mockProducts';
import { formatPrice } from '@/lib/utils';

export default function PremiumCollection() {
  const products = getPremiumProducts();

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510] via-[#0C0C0C] to-[#1a1510]" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A96E 0%, transparent 50%), radial-gradient(circle at 70% 50%, #C9A96E 0%, transparent 50%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 border border-accent-gold/30 rounded-full text-accent-gold text-xs font-semibold mb-4">
            <Crown size={14} /> Curated Luxury
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading text-3xl lg:text-4xl font-bold text-white mb-3">
            Premium <span className="text-gradient-gold">Collection</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/50 text-sm max-w-md mx-auto">
            Designer wear, luxury vintage, and limited edition pieces — authenticated and verified.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link href={`/product/${product.slug}`} className="group block relative rounded-2xl overflow-hidden border border-accent-gold/20 hover:border-accent-gold/40 transition-colors bg-white/5">
                <div className="aspect-[4/5] relative">
                  <img src={product.images[0]?.url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 gradient-gold text-[#0C0C0C] text-[10px] font-bold rounded-lg uppercase">Premium</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">{product.brand}</p>
                  <h3 className="text-white font-medium text-sm mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-gold font-bold">{formatPrice(product.price)}</span>
                      <span className="text-white/40 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight size={14} className="text-white" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/category/premium" className="inline-flex items-center gap-2 px-8 py-3.5 border border-accent-gold text-accent-gold font-semibold rounded-xl hover:bg-accent-gold hover:text-[#0C0C0C] transition-all text-sm">
            Explore Premium <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
