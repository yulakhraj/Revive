'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Shield, Truck, RotateCcw, ChevronRight, Minus, Plus, Share2 } from 'lucide-react';
import { getProductBySlug, mockProducts } from '@/data/mockProducts';
import { formatPrice, formatDiscount, getConditionLabel } from '@/lib/utils';
import { CONDITIONS } from '@/lib/constants';
import { useCartStore } from '@/features/cart/cartStore';
import { useWishlistStore } from '@/features/wishlist/wishlistStore';
import ProductCard from '@/components/product/ProductCard';
import { mockDb } from '@/lib/supabaseClient';
import type { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.items.includes(product?.id || ''));

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const list = await mockDb.getProducts();
        const found = list.find((p) => p.slug === slug) || getProductBySlug(slug);
        setProduct(found || null);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="font-heading text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-text-secondary mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop" className="px-6 py-3 gradient-gold text-[#0C0C0C] font-semibold rounded-xl">Back to Shop</Link>
      </div>
    );
  }

  const condition = CONDITIONS[product.condition];
  const similarProducts = mockProducts.filter(p => p.id !== product.id && (p.gender === product.gender || p.gender === 'unisex')).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizeAvailable.length > 0) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize || 'One Size', quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
        <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-accent-gold transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
        {/* Image Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-secondary mb-4">
            <Image
              src={product.images[selectedImage]?.url || product.images[0]?.url}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.isPremium && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 gradient-gold text-[#0C0C0C] text-xs font-bold rounded-lg uppercase">Premium</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-accent-gold' : 'border-transparent hover:border-border'}`}
                >
                  <Image src={img.url} alt="" width={80} height={96} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {/* Brand + Name */}
          <p className="text-xs text-accent-gold uppercase tracking-widest font-semibold mb-1">{product.brand}</p>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.avgRating) ? 'text-accent-gold fill-accent-gold' : 'text-border'} />
              ))}
            </div>
            <span className="text-sm text-text-secondary">{product.avgRating} ({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
                <span className="px-2.5 py-1 bg-error/10 text-error text-xs font-bold rounded-lg">{formatDiscount(product.discountPercent)}</span>
              </>
            )}
          </div>

          {/* Condition */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: condition.color }}>
              {condition.icon} {condition.label}
            </span>
            {product.isVerified && (
              <span className="flex items-center gap-1 text-xs text-success font-medium">
                <Shield size={12} /> Verified by Ausphotic
              </span>
            )}
          </div>

          {/* Size Selector */}
          {product.sizeAvailable.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizeAvailable.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-12 px-4 rounded-xl border text-sm font-medium transition-all ${
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

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-1 border border-border rounded-xl w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-bg-secondary rounded-l-xl transition-colors"><Minus size={16} /></button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} className="p-3 hover:bg-bg-secondary rounded-r-xl transition-colors"><Plus size={16} /></button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 py-4 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity">
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product.id)} className={`w-14 flex items-center justify-center border rounded-xl transition-all ${isWishlisted ? 'border-error bg-error/10 text-error' : 'border-border hover:border-accent-gold'}`}>
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button className="w-14 flex items-center justify-center border border-border rounded-xl hover:border-accent-gold transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: Truck, label: 'Free Shipping', sub: 'Above ₹999' },
              { icon: Shield, label: 'Verified', sub: 'Quality Checked' },
              { icon: RotateCcw, label: 'Easy Returns', sub: '7-day Policy' },
            ].map((badge, i) => (
              <div key={i} className="text-center p-3 bg-bg-secondary rounded-xl">
                <badge.icon size={18} className="mx-auto mb-1 text-accent-gold" />
                <p className="text-xs font-medium">{badge.label}</p>
                <p className="text-[10px] text-text-muted">{badge.sub}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="space-y-3 border-t border-border pt-6">
            <h3 className="font-heading font-semibold text-sm mb-3">Product Details</h3>
            {[
              ['Brand', product.brand],
              ['Condition', getConditionLabel(product.condition)],
              ['Fabric', product.fabric],
              ['Color', product.color],
              ['Style', product.style],
              ['Gender', product.gender.charAt(0).toUpperCase() + product.gender.slice(1)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-text-muted">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="border-t border-border pt-6 mt-6">
            <h3 className="font-heading font-semibold text-sm mb-3">Description</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="font-heading text-xl lg:text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {similarProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
