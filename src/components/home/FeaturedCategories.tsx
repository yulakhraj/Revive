'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTopCategories } from '@/data/mockCategories';

export default function FeaturedCategories() {
  const categories = getTopCategories();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-accent-gold text-xs font-semibold uppercase tracking-widest mb-2">
            Browse by
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-2xl lg:text-3xl font-bold">
            Shop Categories
          </motion.h2>
        </div>
        <Link href="/shop" className="hidden sm:flex items-center gap-1 text-sm text-accent-gold hover:underline font-medium">
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/category/${cat.slug}`} className="group block relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-heading font-bold text-lg mb-1">{cat.name}</h3>
                <p className="text-white/70 text-xs">{cat.productCount}+ items</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <ArrowRight size={16} className="text-white" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
