'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/features/wishlist/wishlistStore';
import { mockProducts } from '@/data/mockProducts';
import ProductCard from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const wishlistedProducts = mockProducts.filter(p => items.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Heart size={64} className="mx-auto mb-6 text-text-muted" strokeWidth={1} />
          <h1 className="font-heading text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
          <p className="text-text-secondary text-sm mb-8">Save items you love for later.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 gradient-gold text-[#0C0C0C] font-semibold rounded-xl">
            Explore Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-bold mb-2">
        My Wishlist
      </motion.h1>
      <p className="text-text-secondary text-sm mb-8">{wishlistedProducts.length} saved items</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {wishlistedProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
