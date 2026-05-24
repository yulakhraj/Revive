'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Star, Shield } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, formatDiscount } from '@/lib/utils';
import { CONDITIONS } from '@/lib/constants';
import { useCartStore } from '@/features/cart/cartStore';
import { useWishlistStore } from '@/features/wishlist/wishlistStore';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.items.includes(product?.id || ''));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const condition = CONDITIONS[product.condition];
  const primaryImage = product.images[selectedImage] || product.images[0];

  const handleAddToCart = () => {
    if (!selectedSize && product.sizeAvailable.length > 0) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize || 'One Size', quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass-heavy shadow-2xl z-10 flex flex-col md:flex-row bg-bg-elevated/95 border border-border"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-bg-primary/80 border border-border hover:bg-bg-secondary text-text-primary transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Left: Images */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-bg-secondary w-full mb-4">
                <Image
                  src={primaryImage?.url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {product.isPremium && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 gradient-gold text-[#0C0C0C] text-[10px] font-bold rounded-lg uppercase tracking-wide">
                    Premium
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 justify-center overflow-x-auto py-1 no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-14 h-18 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                        selectedImage === idx ? 'border-accent-gold' : 'border-transparent hover:border-border'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt=""
                        width={56}
                        height={72}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="w-full md:w-1/2 p-6 md:p-8 md:pl-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border">
              <div>
                {/* Brand & Title */}
                <p className="text-[11px] text-accent-gold uppercase tracking-widest font-semibold mb-1">
                  {product.brand}
                </p>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2 line-clamp-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-0.5">
                    <Star size={14} className="text-accent-gold fill-accent-gold" />
                    <span className="text-xs font-semibold ml-1">{product.avgRating}</span>
                  </div>
                  <span className="text-xs text-text-muted">({product.reviewCount} reviews)</span>
                  <span className="text-xs text-text-muted">•</span>
                  <span className="text-xs text-text-secondary font-medium">Condition: {condition.label}</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-bold text-text-primary">{formatPrice(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-text-muted line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="px-2 py-0.5 bg-error/10 text-error text-[10px] font-bold rounded-lg">
                        {formatDiscount(product.discountPercent)}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Size Selector */}
                {product.sizeAvailable.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-text-primary mb-2">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizeAvailable.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[40px] h-10 px-3 rounded-lg border text-xs font-medium transition-all ${
                            selectedSize === size
                              ? 'border-accent-gold bg-accent-gold-light text-accent-gold'
                              : 'border-border hover:border-border-hover'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Condition & Verification Badge */}
                <div className="flex flex-wrap items-center gap-4 mb-6 py-4 border-y border-border">
                  <span
                    className="px-2.5 py-1 text-[10px] font-semibold rounded-lg text-white"
                    style={{ backgroundColor: condition.color }}
                  >
                    {condition.icon} {condition.label}
                  </span>
                  {product.isVerified && (
                    <span className="flex items-center gap-1 text-[11px] text-success font-medium">
                      <Shield size={12} /> Verified by Revive
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 gradient-gold text-[#0C0C0C] font-semibold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 flex items-center justify-center border rounded-xl transition-all ${
                    isWishlisted ? 'border-error bg-error/10 text-error' : 'border-border hover:border-accent-gold'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
