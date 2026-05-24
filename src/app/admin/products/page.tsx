'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, Check, X, Tag, PackageOpen, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockDb } from '@/lib/supabaseClient';
import { mockProducts } from '@/data/mockProducts';
import { formatPrice } from '@/lib/utils';
import { SIZES, CONDITIONS } from '@/lib/constants';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');

  // Form Drawer State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Inputs State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [condition, setCondition] = useState<Product['condition']>('like_new');
  const [gender, setGender] = useState<Product['gender']>('unisex');
  const [fabric, setFabric] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [stockQuantity, setStockQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    // Load products from mock database
    const fetchProducts = async () => {
      try {
        let list = await mockDb.getProducts();
        if (list.length === 0) {
          // Seed
          list = [...mockProducts];
          await mockDb.saveProducts(list);
        }
        setProducts(list);
      } catch (err) {
        console.error('Failed to load admin products:', err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender === 'all' || p.gender === selectedGender;
    return matchesSearch && matchesGender;
  });

  const handleOpenForm = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setName(product.name);
      setBrand(product.brand);
      setDescription(product.description);
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
      setCondition(product.condition);
      setGender(product.gender);
      setFabric(product.fabric);
      setColor(product.color);
      setStyle(product.style);
      setStockQuantity(product.stockQuantity);
      setImageUrl(product.images[0]?.url || '');
      setSelectedSizes(product.sizeAvailable);
      setIsFeatured(product.isFeatured);
      setIsPremium(product.isPremium);
      setIsFlashDeal(product.isFlashDeal);
      setIsVerified(product.isVerified);
    } else {
      setEditingProduct(null);
      setName('');
      setBrand('');
      setDescription('');
      setPrice(0);
      setOriginalPrice(0);
      setCondition('like_new');
      setGender('unisex');
      setFabric('');
      setColor('');
      setStyle('');
      setStockQuantity(1);
      setImageUrl('');
      setSelectedSizes(['M']);
      setIsFeatured(false);
      setIsPremium(false);
      setIsFlashDeal(false);
      setIsVerified(true);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) => 
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !brand || !description || !imageUrl || price <= 0) {
      alert('Please fill out all required fields.');
      return;
    }

    let updatedList: Product[] = [];

    if (editingProduct) {
      // Edit mode
      updatedList = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name,
            brand,
            description,
            price: Number(price),
            originalPrice: Number(originalPrice || price),
            discountPercent: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
            condition,
            gender,
            fabric,
            color,
            style,
            stockQuantity: Number(stockQuantity),
            sizeAvailable: selectedSizes,
            images: [{ id: p.images[0]?.id || 'img_1', productId: p.id, url: imageUrl, sortOrder: 0, isPrimary: true }],
            isFeatured,
            isPremium,
            isFlashDeal,
            isVerified,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
    } else {
      // Create mode
      const newId = Math.random().toString(36).substring(2, 11);
      const newProduct: Product = {
        id: newId,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        brand,
        description,
        price: Number(price),
        originalPrice: Number(originalPrice || price),
        discountPercent: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
        categoryId: 'c1',
        condition,
        gender,
        fabric,
        color,
        style,
        stockQuantity: Number(stockQuantity),
        sizeAvailable: selectedSizes,
        isFeatured,
        isPremium,
        isFlashDeal,
        isVerified,
        sellerType: 'admin',
        sellerId: 'admin1',
        avgRating: 5.0,
        reviewCount: 0,
        viewCount: 1,
        tags: [style.toLowerCase(), brand.toLowerCase()],
        images: [{ id: `img_${newId}`, productId: newId, url: imageUrl, sortOrder: 0, isPrimary: true }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updatedList = [...products, newProduct];
    }

    try {
      await mockDb.saveProducts(updatedList);
      setProducts(updatedList);
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedList = products.filter((p) => p.id !== productId);
      try {
        await mockDb.saveProducts(updatedList);
        setProducts(updatedList);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search by brand, style, name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none"
          >
            <option value="all">All Genders</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>

          <button
            onClick={() => handleOpenForm()}
            className="flex items-center gap-1.5 px-4 py-2.5 gradient-gold text-[#0C0C0C] text-xs font-semibold rounded-xl hover:opacity-90"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* Main product CRUD table */}
      <div className="glass rounded-2xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Brand</th>
                <th className="pb-3 font-semibold">Price</th>
                <th className="pb-3 font-semibold">Condition</th>
                <th className="pb-3 font-semibold">Stock</th>
                <th className="pb-3 font-semibold">Flags</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredProducts.map((p) => {
                const condition = CONDITIONS[p.condition];
                return (
                  <tr key={p.id} className="text-text-primary hover:bg-bg-secondary/15 transition-colors">
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="relative w-10 h-12 rounded bg-bg-secondary overflow-hidden shrink-0 border border-border/40">
                        <img src={p.images[0]?.url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate max-w-[180px]">{p.name}</p>
                        <span className="text-[10px] text-text-secondary capitalize">{p.gender} • {p.style}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-text-secondary font-medium">{p.brand}</td>
                    <td className="py-3.5">
                      <div className="flex flex-col">
                        <span className="font-bold">{formatPrice(p.price)}</span>
                        {p.originalPrice > p.price && (
                          <span className="text-[10px] text-text-muted line-through">{formatPrice(p.originalPrice)}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium text-white" style={{ backgroundColor: `${condition.color}CC` }}>
                        {condition.label}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`font-semibold ${p.stockQuantity <= 1 ? 'text-error' : 'text-text-secondary'}`}>
                        {p.stockQuantity} Left
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap max-w-[120px]">
                        {p.isFeatured && <span className="px-1.5 py-0.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded text-[9px] font-bold">Featured</span>}
                        {p.isPremium && <span className="px-1.5 py-0.5 bg-accent-gold-light text-accent-gold rounded text-[9px] font-bold">Premium</span>}
                        {p.isFlashDeal && <span className="px-1.5 py-0.5 bg-error/10 text-error rounded text-[9px] font-bold">Deal</span>}
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex justify-end gap-2.5">
                        <button
                          onClick={() => handleOpenForm(p)}
                          className="p-1.5 hover:bg-bg-secondary rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                          aria-label="Edit product"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 hover:bg-error/10 rounded-lg text-error transition-colors"
                          aria-label="Delete product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-text-secondary">
                    No products found in catalog.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Drawer (Modal Overlay) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseForm} />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-heavy w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 lg:p-8 bg-bg-elevated/95 border border-border z-10 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-heading font-bold text-lg text-text-primary">
                {editingProduct ? 'Edit Product Catalog' : 'Add New Product'}
              </h3>
              <button onClick={handleCloseForm} className="p-1 bg-bg-secondary hover:bg-border rounded-full text-text-secondary">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vintage Jacket"
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Brand *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Levi's"
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter details, condition info, fabric, styling tips..."
                  className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold resize-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Selling Price *</label>
                  <input
                    type="number"
                    required
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Retail Price (Original)</label>
                  <input
                    type="number"
                    value={originalPrice || ''}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Product['gender'])}
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Condition *</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as Product['condition'])}
                    className="w-full px-3 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none"
                  >
                    <option value="new">New with tags</option>
                    <option value="like_new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Fabric</label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="Denim / Cotton"
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Style</label>
                  <input
                    type="text"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    placeholder="Vintage / Y2K"
                    className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-text-secondary mb-1.5">Primary Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                />
              </div>

              {/* Size Multi Selection */}
              <div>
                <span className="block text-[10px] font-medium text-text-secondary mb-2">Available Sizes</span>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3.5 py-1.5 border rounded-lg text-[10px] font-bold transition-all ${
                          isSelected
                            ? 'border-accent-gold bg-accent-gold-light text-accent-gold'
                            : 'border-border hover:border-border-hover'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flags checks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y border-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded text-accent-gold focus:ring-accent-gold" />
                  <span className="select-none">Featured Item</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="rounded text-accent-gold focus:ring-accent-gold" />
                  <span className="select-none">Premium Luxe</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isFlashDeal} onChange={(e) => setIsFlashDeal(e.target.checked)} className="rounded text-accent-gold focus:ring-accent-gold" />
                  <span className="select-none">Flash Deal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} className="rounded text-accent-gold focus:ring-accent-gold" />
                  <span className="select-none">Verified Product</span>
                </label>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-5 py-2.5 border border-border text-text-secondary font-semibold rounded-xl hover:bg-bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Save Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
