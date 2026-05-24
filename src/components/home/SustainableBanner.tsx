'use client';

import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Globe } from 'lucide-react';

export default function SustainableBanner() {
  const stats = [
    { icon: Recycle, value: '50K+', label: 'Items Revived' },
    { icon: Leaf, value: '12 Tons', label: 'CO₂ Saved' },
    { icon: Heart, value: '10K+', label: 'Happy Buyers' },
    { icon: Globe, value: '100+', label: 'Cities Reached' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a2e1a] via-[#0C0C0C] to-[#1a1a0c] p-8 lg:p-14">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent-gold/5 rounded-full blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 border border-green-500/30 rounded-full text-green-400 text-xs font-semibold mb-5">
              <Leaf size={12} /> Sustainable Fashion
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Every Purchase<br />
              <span className="text-gradient-gold">Saves the Planet</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/50 text-sm leading-relaxed max-w-md">
              By choosing pre-loved fashion, you&apos;re reducing textile waste, saving water, and lowering carbon emissions. Join the circular fashion movement with Revive.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:border-accent-gold/30 transition-colors"
              >
                <stat.icon size={22} className="mx-auto mb-2 text-accent-gold" />
                <p className="font-heading text-xl font-bold text-white">{stat.value}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
