'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent-gold/3 rounded-full blur-3xl" />
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold-light border border-accent-gold/20 rounded-full text-accent-gold text-xs font-semibold mb-6"
            >
              <Sparkles size={14} /> Sustainable Fashion Marketplace
            </motion.div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
              <span className="block">Fashion</span>
              <span className="block">Deserves a</span>
              <span className="text-gradient-gold block">Second Life</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
              Discover pre-loved, verified fashion at up to 70% off retail. 
              From streetwear to luxury — style sustainably, shop smartly.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/shop"
                className="group flex items-center gap-2 px-8 py-4 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-all text-sm"
              >
                Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/category/premium"
                className="flex items-center gap-2 px-8 py-4 border border-border text-text-primary font-semibold rounded-xl hover:border-accent-gold hover:text-accent-gold transition-all text-sm"
              >
                Premium Collection
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-xs text-text-secondary">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-accent-gold" /> Verified Products</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-accent-gold" /> Free Shipping ₹999+</span>
              <span className="flex items-center gap-2"><Sparkles size={16} className="text-accent-gold" /> 10K+ Happy Buyers</span>
            </div>
          </motion.div>

          {/* Right: Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-2xl overflow-hidden aspect-[3/4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=530&fit=crop"
                  alt="Fashion model"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="rounded-2xl overflow-hidden aspect-square"
              >
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop"
                  alt="Premium fashion"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="rounded-2xl overflow-hidden aspect-square"
              >
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop"
                  alt="Style inspiration"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                className="rounded-2xl overflow-hidden aspect-[3/4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=530&fit=crop"
                  alt="Trending fashion"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 right-0 glass rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center text-[#0C0C0C] text-lg">🔥</div>
                <div>
                  <p className="text-xs text-text-muted">Trending Now</p>
                  <p className="text-sm font-semibold">2,500+ Items Added</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
