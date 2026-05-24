'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCategoryBySlug, getSubCategories } from '@/data/mockCategories';
import { mockProducts } from '@/data/mockProducts';
import { mockDb } from '@/lib/supabaseClient';
import { useState, useEffect, useMemo } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const subCategories = useMemo(() => getSubCategories(slug), [slug]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const list = await mockDb.getProducts();
        const source = list.length > 0 ? list : mockProducts;
        const childCategoryIds = new Set(subCategories.map(sub => sub.id));

        const filtered = source.filter(p => {
          if (slug === 'premium') return p.isPremium || p.categoryId === category?.id;
          if (childCategoryIds.size > 0) return childCategoryIds.has(p.categoryId);
          return p.categoryId === category?.id || p.categoryId === category?.slug;
        });
        setProducts(filtered);
      } catch (err) {
        console.error('Failed to load category products:', err);
        setProducts(mockProducts.filter(p => {
          if (slug === 'premium') return p.isPremium || p.categoryId === category?.id;
          if (subCategories.length > 0) return subCategories.some(sub => sub.id === p.categoryId);
          return p.categoryId === category?.id || p.categoryId === category?.slug;
        }));
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [category?.id, category?.slug, slug, subCategories]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="font-heading text-2xl font-bold mb-2">Category Not Found</h1>
        <Link href="/shop" className="text-accent-gold hover:underline text-sm">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
        <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-accent-gold transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden mb-10 h-48 lg:h-64">
        <img loading="lazy" decoding="async" src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl lg:text-4xl font-bold text-white mb-1">
            {category.name}
          </motion.h1>
          <p className="text-white/60 text-sm">{loading ? '...' : `${products.length} products`}</p>
        </div>
      </div>

      {/* Sub-categories */}
      {subCategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          {subCategories.map(sub => (
            <Link key={sub.id} href={`/category/${sub.slug}`} className="shrink-0 px-5 py-2.5 bg-bg-secondary border border-border rounded-full text-sm font-medium hover:border-accent-gold hover:text-accent-gold transition-colors whitespace-nowrap">
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-bg-secondary border border-border rounded-2xl aspect-[3/4]" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📦</p>
          <h2 className="font-heading font-semibold text-lg mb-2">No products yet</h2>
          <p className="text-text-secondary text-sm">Products coming soon to this category!</p>
        </div>
      )}
    </div>
  );
}
