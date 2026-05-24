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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-bg-secondary mb-3">
          <Image
            src={primaryImage?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.discountPercent > 0 && (
              <span className="px-2.5 py-1 bg-error text-white text-[10px] font-bold rounded-lg uppercase tracking-wide">
                {formatDiscount(product.discountPercent)}
              </span>
            )}
            {product.isPremium && (
              <span className="px-2.5 py-1 gradient-gold text-[#0C0C0C] text-[10px] font-bold rounded-lg uppercase tracking-wide">
                Premium
              </span>
            )}
            {product.isVerified && (
              <span className="px-2 py-1 bg-success/90 text-white text-[10px] font-bold rounded-lg">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isWishlisted
                  ? 'bg-error text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-white'
              } shadow-md`}
              aria-label="Toggle wishlist"
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, product.sizeAvailable[0] || 'M');
              }}
              className="w-9 h-9 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center shadow-md transition-all"
              aria-label="Add to cart"
            >
              <ShoppingBag size={16} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                openQuickView(product);
              }}
              className="w-9 h-9 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center shadow-md transition-all"
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
          </div>

          {/* Condition Badge */}
          <div className="absolute bottom-2.5 left-2.5">
            <span
              className="px-2.5 py-1 text-[10px] font-semibold rounded-lg backdrop-blur-md text-white"
              style={{ backgroundColor: `${condition.color}CC` }}
            >
              {condition.icon} {condition.label}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5 px-0.5">
          <p className="text-[11px] text-text-muted uppercase tracking-wider font-medium">{product.brand}</p>
          <h3 className="text-sm font-medium text-text-primary line-clamp-1 group-hover:text-accent-gold transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <div className="flex items-center gap-0.5">
              <Star size={12} className="text-accent-gold fill-accent-gold" />
              <span>{product.avgRating}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-0.5">
              <Eye size={11} />
              <span>{product.viewCount}</span>
            </div>
            <span>•</span>
            <span>{product.sizeAvailable.join(', ')}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
