'use client';

import { motion } from 'framer-motion';

const inspirationImages = [
  { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop', span: 'row-span-2' },
  { url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop', span: '' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop', span: '' },
  { url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop', span: 'row-span-2' },
  { url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=300&fit=crop', span: '' },
  { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop', span: '' },
];

export default function InspirationGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center mb-10">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-accent-gold text-xs font-semibold uppercase tracking-widest mb-2">
          @revive.style
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-2xl lg:text-3xl font-bold mb-2">
          Style Inspiration
        </motion.h2>
        <p className="text-text-secondary text-sm">Get inspired by our community&apos;s looks</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
        {inspirationImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`relative rounded-xl overflow-hidden group cursor-pointer ${img.span}`}
          >
            <img src={img.url} alt={`Inspiration ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">♡</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
