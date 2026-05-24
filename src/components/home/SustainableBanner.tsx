'use client';

import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Globe } from 'lucide-react';

export default function SustainableBanner() {
  const stats = [
    { icon: Recycle, value: '50K+', label: 'Items revived', bg: 'bg-accent-mint', text: 'text-accent-ink' },
    { icon: Leaf, value: '12 Tons', label: 'CO₂ saved', bg: 'bg-accent-butter', text: 'text-accent-ink' },
    { icon: Heart, value: '10K+', label: 'Happy buyers', bg: 'bg-accent-coral', text: 'text-white' },
    { icon: Globe, value: '100+', label: 'Cities reached', bg: 'bg-accent-lilac', text: 'text-accent-ink' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
      <div className="relative rounded-[2rem] overflow-hidden border-[1.5px] border-accent-ink bg-bg-elevated shadow-pop p-8 lg:p-14">
        {/* Soft sage background blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-mint/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-butter/30 rounded-full blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, rotate: -8 }}
              whileInView={{ opacity: 1, rotate: -3 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-mint border-[1.5px] border-accent-ink text-accent-ink text-xs font-black rounded-full mb-5 shadow-pop-sm uppercase tracking-wider"
            >
              <Leaf size={12} /> Sustainable
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl lg:text-6xl font-black mb-4 leading-[0.95] tracking-tight"
            >
              Every fit<br />
              <span className="headline-italic text-gradient-sunset">saves the planet.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base leading-relaxed max-w-md"
            >
              Pre-loved means less waste, less water, fewer emissions. You shop, the planet wins. It&apos;s giving circular.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring' }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                className={`${stat.bg} ${stat.text} border-[1.5px] border-accent-ink rounded-2xl p-5 text-center shadow-pop-sm`}
              >
                <stat.icon size={24} className="mx-auto mb-2" />
                <p className="font-heading text-2xl font-black">{stat.value}</p>
                <p className="text-xs font-bold opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
