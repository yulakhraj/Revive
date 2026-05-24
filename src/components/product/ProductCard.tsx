'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { formatPrice, formatDiscount } from '@/lib/utils';
import { CONDITIONS } from '@/lib/constants';
import { useWishlistStore } from '@/features/wishlist/wishlistStore';
import { useCartStore } from '@/features/cart/cartStore';
import { useQuickViewStore } from '@/features/product/quickViewStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.items.includes(product.id));
  const addToCart = useCartStore((s) => s.addItem);
  const openQuickView = useQuickViewStore((s) => s.open);

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const condition = CONDITIONS[product.condition];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-bg-secondary border-[1.5px] border-accent-ink mb-3 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_var(--accent-ink)]">
          <Image
            src={primaryImage?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges as stickers */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.discountPercent > 0 && (
              <span className="px-2.5 py-1 bg-accent-coral text-white text-[10px] font-black rounded-full uppercase tracking-wide border-[1.5px] border-accent-ink shadow-pop-sm -rotate-3">
                {formatDiscount(product.discountPercent)}
              </span>
            )}
            {product.isPremium && (
              <span className="px-2.5 py-1 bg-accent-butter text-accent-ink text-[10px] font-black rounded-full uppercase tracking-wide border-[1.5px] border-accent-ink shadow-pop-sm rotate-2">
                ✦ Premium
              </span>
            )}
            {product.isVerified && (
              <span className="px-2.5 py-1 bg-accent-mint text-accent-ink text-[10px] font-black rounded-full border-[1.5px] border-accent-ink shadow-pop-sm -rotate-1">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0">
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-[1.5px] border-accent-ink shadow-pop-sm hover:-translate-y-0.5 ${
                isWishlisted
                  ? 'bg-accent-coral text-white'
                  : 'bg-bg-elevated text-text-primary hover:bg-accent-coral-soft'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, product.sizeAvailable[0] || 'M');
              }}
              className="w-10 h-10 rounded-full bg-bg-elevated text-text-primary hover:bg-accent-lilac-soft flex items-center justify-center border-[1.5px] border-accent-ink shadow-pop-sm hover:-translate-y-0.5 transition-all"
              aria-label="Add to cart"
            >
              <ShoppingBag size={16} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                openQuickView(product);
              }}
              className="w-10 h-10 rounded-full bg-bg-elevated text-text-primary hover:bg-accent-butter-soft flex items-center justify-center border-[1.5px] border-accent-ink shadow-pop-sm hover:-translate-y-0.5 transition-all"
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
          </div>

          {/* Condition badge — bottom */}
          <div className="absolute bottom-3 left-3">
            <span
              className="px-2.5 py-1 text-[10px] font-black rounded-full backdrop-blur-md text-white border-[1.5px] border-accent-ink"
              style={{ backgroundColor: `${condition.color}E6` }}
            >
              {condition.icon} {condition.label}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5 px-1">
          <p className="text-[11px] text-text-muted uppercase tracking-[0.18em] font-bold">{product.brand}</p>
          <h3 className="text-sm font-semibold text-text-primary line-clamp-1 group-hover:text-accent-coral transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <div className="flex items-center gap-0.5">
              <Star size={12} className="text-accent-coral fill-accent-coral" />
              <span className="font-semibold">{product.avgRating}</span>
            </div>
            <span className="text-text-muted">·</span>
            <div className="flex items-center gap-0.5">
              <Eye size={11} />
              <span>{product.viewCount}</span>
            </div>
            <span className="text-text-muted">·</span>
            <span className="font-medium">{product.sizeAvailable.join(', ')}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
