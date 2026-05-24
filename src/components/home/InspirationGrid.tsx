'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const inspirationImages = [
  { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&auto=format&q=72', span: 'row-span-2', tilt: '-rotate-1' },
  { url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop&auto=format&q=72', span: '', tilt: 'rotate-1' },
  { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&auto=format&q=72', span: '', tilt: '-rotate-1' },
  { url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop&auto=format&q=72', span: 'row-span-2', tilt: 'rotate-1' },
  { url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=300&fit=crop&auto=format&q=72', span: '', tilt: 'rotate-1' },
  { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop&auto=format&q=72', span: '', tilt: '-rotate-1' },
];

export default function InspirationGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, rotate: -6 }}
          whileInView={{ opacity: 1, rotate: -2 }}
          viewport={{ once: true }}
          className="sticker mb-4 bg-accent-coral text-white"
        >
          @ausphotic.style
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl lg:text-6xl font-black mb-3 tracking-tight"
        >
          Style <span className="headline-italic text-gradient-sunset">inspo</span>
        </motion.h2>
        <p className="text-text-secondary text-base font-medium">Real fits from the community ✦</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {inspirationImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className={`relative rounded-3xl overflow-hidden group cursor-pointer border-[1.5px] border-accent-ink shadow-pop-sm ${img.span} ${img.tilt}`}
          >
            <img src={img.url} alt={`Inspiration ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-accent-ink/0 group-hover:bg-accent-ink/40 transition-colors duration-300 flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-bg-primary border-[1.5px] border-accent-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                <Heart size={18} className="text-accent-coral fill-accent-coral" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
