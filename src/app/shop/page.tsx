'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import { mockDb } from '@/lib/supabaseClient';
import { SIZES, SORT_OPTIONS, CONDITIONS } from '@/lib/constants';
import type { Product } from '@/types';

type SortOption = typeof SORT_OPTIONS[number]['value'];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const list = await mockDb.getProducts();
        setProducts(list);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = products.length > 0 ? [...products] : [...mockProducts];

    if (selectedGender !== 'all') {
      list = list.filter(p => p.gender === selectedGender || p.gender === 'unisex');
    }
    if (selectedConditions.length > 0) {
      list = list.filter(p => selectedConditions.includes(p.condition));
    }
    if (selectedSizes.length > 0) {
      list = list.filter(p => p.sizeAvailable.some(s => selectedSizes.includes(s)));
    }
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (premiumOnly) {
      list = list.filter(p => p.isPremium);
    }

    switch (sortBy) {
      case 'price_low': list.sort((a, b) => a.price - b.price); break;
      case 'price_high': list.sort((a, b) => b.price - a.price); break;
      case 'popular': list.sort((a, b) => b.viewCount - a.viewCount); break;
      case 'rating': list.sort((a, b) => b.avgRating - a.avgRating); break;
      case 'discount': list.sort((a, b) => b.discountPercent - a.discountPercent); break;
      default: list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [sortBy, selectedGender, selectedConditions, selectedSizes, priceRange, premiumOnly]);

  const toggleCondition = (c: string) => setSelectedConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const clearFilters = () => { setSelectedGender('all'); setSelectedConditions([]); setSelectedSizes([]); setPriceRange([0, 20000]); setPremiumOnly(false); };

  const activeFilterCount = (selectedGender !== 'all' ? 1 : 0) + selectedConditions.length + selectedSizes.length + (premiumOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl lg:text-4xl font-bold mb-2">
          Shop All
        </motion.h1>
        <p className="text-text-secondary text-sm">{filteredProducts.length} products found</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:border-accent-gold transition-colors">
          <SlidersHorizontal size={16} /> Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 gradient-gold rounded-full text-[10px] font-bold flex items-center justify-center text-[#0C0C0C]">{activeFilterCount}</span>
          )}
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
            {([2, 3, 4] as const).map(n => (
              <button key={n} onClick={() => setGridCols(n)} className={`p-1.5 rounded-md transition-colors ${gridCols === n ? 'bg-accent-gold text-[#0C0C0C]' : 'hover:bg-bg-secondary'}`}>
                {n === 2 ? <LayoutGrid size={14} /> : <Grid3X3 size={14} />}
              </button>
            ))}
          </div>

          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)} className="appearance-none pl-4 pr-10 py-2.5 border border-border rounded-xl text-sm bg-bg-primary focus:outline-none focus:border-accent-gold cursor-pointer">
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <motion.aside
          initial={false}
          animate={{ width: filtersOpen ? 260 : 0, opacity: filtersOpen ? 1 : 0 }}
          className="hidden lg:block overflow-hidden shrink-0"
        >
          <div className="w-[260px] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-sm">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-accent-gold hover:underline">Clear all</button>
              )}
            </div>

            {/* Gender */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Gender</h4>
              <div className="flex flex-wrap gap-2">
                {['all', 'men', 'women', 'unisex'].map(g => (
                  <button key={g} onClick={() => setSelectedGender(g)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedGender === g ? 'border-accent-gold bg-accent-gold-light text-accent-gold' : 'border-border hover:border-border-hover'}`}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Condition</h4>
              <div className="space-y-2">
                {Object.entries(CONDITIONS).map(([key, val]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${selectedConditions.includes(key) ? 'border-accent-gold bg-accent-gold' : 'border-border group-hover:border-border-hover'}`}>
                      {selectedConditions.includes(key) && <span className="text-[8px] text-[#0C0C0C]">✓</span>}
                    </div>
                    <span className="text-sm text-text-secondary">{val.icon} {val.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(s => (
                  <button key={s} onClick={() => toggleSize(s)} className={`w-10 h-10 rounded-lg text-xs font-medium border transition-colors ${selectedSizes.includes(s) ? 'border-accent-gold bg-accent-gold-light text-accent-gold' : 'border-border hover:border-border-hover'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Toggle */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">Premium Only</span>
                <button onClick={() => setPremiumOnly(!premiumOnly)} className={`w-11 h-6 rounded-full transition-colors relative ${premiumOnly ? 'bg-accent-gold' : 'bg-border'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${premiumOnly ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </label>
            </div>
          </div>
        </motion.aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">😢</p>
              <h3 className="font-heading font-semibold text-lg mb-2">No products found</h3>
              <p className="text-text-secondary text-sm mb-4">Try adjusting your filters</p>
              <button onClick={clearFilters} className="px-6 py-2.5 gradient-gold text-[#0C0C0C] text-sm font-semibold rounded-xl">Clear Filters</button>
            </div>
          ) : (
            <div className={`grid gap-4 lg:gap-6 ${gridCols === 2 ? 'grid-cols-2' : gridCols === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setFiltersOpen(false)} />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 right-0 bg-bg-primary rounded-t-2xl z-50 p-6 max-h-[80vh] overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-lg">Filters</h3>
              <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-6">
              {/* Same filter content as sidebar */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Gender</h4>
                <div className="flex flex-wrap gap-2">
                  {['all', 'men', 'women', 'unisex'].map(g => (
                    <button key={g} onClick={() => setSelectedGender(g)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${selectedGender === g ? 'border-accent-gold bg-accent-gold-light text-accent-gold' : 'border-border'}`}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
                    <button key={s} onClick={() => toggleSize(s)} className={`w-12 h-12 rounded-lg text-sm font-medium border transition-colors ${selectedSizes.includes(s) ? 'border-accent-gold bg-accent-gold-light text-accent-gold' : 'border-border'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={clearFilters} className="flex-1 py-3 border border-border rounded-xl text-sm font-medium">Clear</button>
              <button onClick={() => setFiltersOpen(false)} className="flex-1 py-3 gradient-gold text-[#0C0C0C] rounded-xl text-sm font-semibold">Apply</button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
