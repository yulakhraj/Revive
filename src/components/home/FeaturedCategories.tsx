'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getTopCategories } from '@/data/mockCategories';

const stickerColors = [
  'bg-accent-coral text-white',
  'bg-accent-butter text-accent-ink',
  'bg-accent-lilac text-accent-ink',
  'bg-accent-mint text-accent-ink',
];

export default function FeaturedCategories() {
  const categories = getTopCategories();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticker mb-4"
          >
            ✦ Browse by vibe
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Shop <span className="headline-italic text-gradient-sunset">categories</span>
          </motion.h2>
        </div>
        <Link href="/shop" className="link-underline inline-flex items-center gap-1.5 text-sm font-bold w-fit">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/category/${cat.slug}`}
              className="group block relative aspect-[4/5] rounded-3xl overflow-hidden border-[1.5px] border-accent-ink shadow-pop-sm hover:shadow-pop hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent-ink/85 via-accent-ink/20 to-transparent" />

              {/* Color sticker */}
              <span
                className={`absolute top-4 left-4 px-2.5 py-1 ${stickerColors[i % stickerColors.length]} text-[10px] font-black rounded-full border-[1.5px] border-accent-ink uppercase tracking-wider -rotate-3`}
              >
                {cat.productCount}+ items
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-2">
                <h3 className="text-white font-heading font-black text-xl leading-none">{cat.name}</h3>
                <span className="w-10 h-10 rounded-full bg-bg-primary text-text-primary border-[1.5px] border-accent-ink flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
