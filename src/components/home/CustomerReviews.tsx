'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { mockReviews } from '@/data/mockReviews';

const cardColors = [
  { bg: 'bg-accent-butter-soft', accent: 'text-accent-coral' },
  { bg: 'bg-accent-lilac-soft', accent: 'text-accent-lilac' },
  { bg: 'bg-accent-coral-soft', accent: 'text-accent-coral' },
  { bg: 'bg-accent-mint-soft', accent: 'text-accent-mint' },
  { bg: 'bg-accent-butter-soft', accent: 'text-accent-lilac' },
  { bg: 'bg-accent-lilac-soft', accent: 'text-accent-coral' },
];

export default function CustomerReviews() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0, rotate: -6 }}
          whileInView={{ opacity: 1, rotate: -2 }}
          viewport={{ once: true }}
          className="sticker mb-4 bg-accent-lilac text-accent-ink"
        >
          ✦ LOVED BY THOUSANDS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl lg:text-6xl font-black mb-4 tracking-tight"
        >
          What buyers <span className="headline-italic text-gradient-sunset">say</span>
        </motion.h2>
        <div className="flex items-center justify-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={20} className="text-accent-coral fill-accent-coral" />
          ))}
        </div>
        <p className="text-sm text-text-secondary font-medium">4.8 average · 2,000+ reviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReviews.slice(0, 6).map((review, i) => {
          const color = cardColors[i % cardColors.length];
          const rotate = i % 3 === 0 ? '-rotate-1' : i % 3 === 1 ? 'rotate-1' : '-rotate-0';
          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, rotate: 0 }}
              className={`${color.bg} ${rotate} border-[1.5px] border-accent-ink rounded-2xl p-6 shadow-pop-sm transition-transform`}
            >
              <Quote size={26} className={`${color.accent} mb-3`} />
              <p className="text-sm text-text-primary leading-relaxed mb-5 font-medium">&ldquo;{review.comment}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={review.user?.avatarUrl} alt={review.user?.fullName} loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover border-[1.5px] border-accent-ink" />
                  <div>
                    <p className="text-sm font-bold">{review.user?.fullName}</p>
                    {review.isVerifiedPurchase && (
                      <p className="text-[10px] text-success font-bold">✓ Verified Purchase</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-accent-coral fill-accent-coral" />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
