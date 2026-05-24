'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Star } from 'lucide-react';

const marqueeWords = [
  'pre-loved ✦',
  'sustainable ✦',
  'vintage ✦',
  'verified ✦',
  'designer ✦',
  'one-of-one ✦',
  'streetwear ✦',
  'archive ✦',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Aurora background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-accent-coral/25 blur-3xl animate-blob" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[36rem] h-[36rem] rounded-full bg-accent-lilac/25 blur-3xl animate-blob" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[30%] left-[40%] w-[28rem] h-[28rem] rounded-full bg-accent-butter/20 blur-3xl animate-blob" style={{ animationDelay: '-8s' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ delay: 0.15, type: 'spring' }}
              className="sticker inline-flex mb-6"
            >
              <Sparkles size={14} className="text-accent-coral" />
              <span>NEW DROP · MAY '26</span>
            </motion.div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[6rem] font-black leading-[0.92] tracking-tight mb-6">
              <span className="block">Fashion</span>
              <span className="block">deserves a</span>
              <span className="block headline-italic text-gradient-sunset">second life.</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg max-w-md mb-8 leading-relaxed">
              Pre-loved, verified, certified gorgeous. Snag designer fits at up to{' '}
              <span className="font-bold text-text-primary">70% off</span> — because the planet (and your wallet) said thanks.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-accent-ink text-bg-primary font-bold rounded-full hover:gap-3 transition-all text-sm border-[1.5px] border-accent-ink shadow-pop-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_var(--accent-coral)]"
              >
                Shop the drop
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/category/premium"
                className="inline-flex items-center gap-2 px-7 py-4 border-[1.5px] border-accent-ink text-text-primary font-bold rounded-full bg-bg-elevated hover:bg-accent-butter transition-all text-sm shadow-pop-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                Browse premium
              </Link>
            </div>

            {/* Trust badges as stickers */}
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-mint-soft border border-accent-mint/30 font-semibold">
                <ShieldCheck size={14} /> Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-butter-soft border border-accent-butter/40 font-semibold">
                <Truck size={14} /> Free ship ₹999+
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-lilac-soft border border-accent-lilac/30 font-semibold">
                <Star size={14} /> 10K+ buyers
              </span>
            </div>
          </motion.div>

          {/* Right: Bento image grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[34rem]">
              {/* Big left image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="col-span-3 row-span-4 rounded-3xl overflow-hidden border-[1.5px] border-accent-ink shadow-pop"
              >
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&auto=format&q=75"
                  alt="Fashion model"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>

              {/* Top-right image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="col-span-3 row-span-3 rounded-3xl overflow-hidden border-[1.5px] border-accent-ink shadow-pop-coral"
              >
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=400&fit=crop&auto=format&q=72"
                  alt="Premium fashion"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>

              {/* Mid-left small */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="col-span-3 row-span-2 rounded-3xl overflow-hidden border-[1.5px] border-accent-ink shadow-pop-lilac"
              >
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=300&fit=crop&auto=format&q=72"
                  alt="Style inspiration"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>

              {/* Bottom-right image */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="col-span-3 row-span-3 rounded-3xl overflow-hidden border-[1.5px] border-accent-ink shadow-pop"
              >
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=400&fit=crop&auto=format&q=72"
                  alt="Trending fashion"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>

              {/* Floating stat sticker */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -top-4 -left-6 z-10 bg-accent-butter border-[1.5px] border-accent-ink rounded-full px-4 py-2 shadow-pop-sm font-black text-xs flex items-center gap-2"
              >
                <span className="animate-spin-slow inline-block">✦</span>
                <span>2,500+ fresh drops</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, rotate: 8 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -bottom-4 -right-4 z-10 bg-accent-coral text-white border-[1.5px] border-accent-ink rounded-full px-4 py-2 shadow-pop-sm font-black text-xs"
              >
                up to 70% off 🔥
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip — gen-z signature */}
      <div className="border-y-[1.5px] border-accent-ink bg-accent-ink text-bg-primary overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3 font-heading font-black text-lg uppercase tracking-wider">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6">
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
