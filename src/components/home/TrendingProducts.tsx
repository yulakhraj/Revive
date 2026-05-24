'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { getTrendingProducts } from '@/data/mockProducts';

export default function TrendingProducts() {
  const products = getTrendingProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-2 text-accent-gold text-xs font-semibold uppercase tracking-widest mb-2">
            <TrendingUp size={14} /> Hot Right Now
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-2xl lg:text-3xl font-bold">
            Trending Products
          </motion.h2>
        </div>
        <Link href="/shop?sort=popular" className="hidden sm:flex items-center gap-1 text-sm text-accent-gold hover:underline font-medium">
          See All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.slice(0, 8).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
