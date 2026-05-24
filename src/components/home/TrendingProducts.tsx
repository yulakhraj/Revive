'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { getTrendingProducts } from '@/data/mockProducts';

export default function TrendingProducts() {
  const products = getTrendingProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticker mb-4 bg-accent-coral text-white"
            style={{ borderColor: 'var(--accent-ink)' }}
          >
            <TrendingUp size={14} /> HOT RIGHT NOW
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Trending <span className="headline-italic text-gradient-sunset">now</span>
          </motion.h2>
        </div>
        <Link href="/shop?sort=popular" className="link-underline inline-flex items-center gap-1.5 text-sm font-bold w-fit">
          See all <ArrowRight size={14} />
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
