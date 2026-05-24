'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { mockReviews } from '@/data/mockReviews';

export default function CustomerReviews() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center mb-12">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-accent-gold text-xs font-semibold uppercase tracking-widest mb-2">
          Loved by Thousands
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-2xl lg:text-3xl font-bold mb-3">
          What Our Buyers Say
        </motion.h2>
        <div className="flex items-center justify-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={18} className="text-accent-gold fill-accent-gold" />
          ))}
        </div>
        <p className="text-sm text-text-secondary">4.8 average from 2,000+ reviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReviews.slice(0, 6).map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-bg-secondary border border-border rounded-2xl p-6 hover:border-accent-gold/20 transition-colors"
          >
            <Quote size={20} className="text-accent-gold/30 mb-3" />
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{review.comment}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={review.user?.avatarUrl} alt={review.user?.fullName} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{review.user?.fullName}</p>
                  {review.isVerifiedPurchase && (
                    <p className="text-[10px] text-success font-medium">✓ Verified Purchase</p>
                  )}
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-accent-gold fill-accent-gold" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
