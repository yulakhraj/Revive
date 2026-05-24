'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, X, FolderHeart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCategories } from '@/data/mockCategories';
import type { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Drawer/Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form Inputs State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [gender, setGender] = useState<Category['gender']>('unisex');
  const [parentId, setParentId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('revive_mock_categories');
      if (stored) {
        const storedList = JSON.parse(stored);
        // Merge missing categories
        const mergedList = [...storedList];
        mockCategories.forEach((mockCat) => {
          if (!mergedList.some((c) => c.id === mockCat.id)) {
            mergedList.push(mockCat);
          }
        });
        if (mergedList.length !== storedList.length) {
          localStorage.setItem('revive_mock_categories', JSON.stringify(mergedList));
        }
        setCategories(mergedList);
      } else {
        localStorage.setItem('revive_mock_categories', JSON.stringify(mockCategories));
        setCategories(mockCategories);
      }
    }
  }, []);

  const saveToStorage = (updatedList: Category[]) => {
    setCategories(updatedList);
    if (typeof window !== 'undefined') {
      localStorage.setItem('revive_mock_categories', JSON.stringify(updatedList));
    }
  };

  const filteredCategories = categories.filter((c) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenForm = (category: Category | null = null) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setDescription(category.description);
      setImageUrl(category.imageUrl);
      setGender(category.gender);
      setParentId(category.parentId);
      setSortOrder(category.sortOrder);
      setIsActive(category.isActive);
    } else {
      setEditingCategory(null);
      setName('');
      setDescription('');
      setImageUrl('');
      setGender('unisex');
      setParentId(null);
      setSortOrder(categories.length);
      setIsActive(true);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) {
      alert('Please fill out all required fields.');
      return;
    }

    let updatedList: Category[] = [];

    if (editingCategory) {
      // Edit
      updatedList = categories.map((c) => {
        if (c.id === editingCategory.id) {
          return {
            ...c,
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description,
            imageUrl,
            gender,
            parentId,
            sortOrder: Number(sortOrder),
            isActive,
          };
        }
        return c;
      });
    } else {
      // Create
      const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newCat: Category = {
        id: newId,
        name,
        slug: newId,
        description,
        imageUrl,
        parentId,
        gender,
        sortOrder: Number(sortOrder),
        isActive,
        productCount: 0,
      };
      updatedList = [...categories, newCat];
    }

    saveToStorage(updatedList);
    handleCloseForm();
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const updatedList = categories.filter((c) => c.id !== id);
      saveToStorage(updatedList);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Filters header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
          />
        </div>

        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-1.5 px-4 py-2.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity shrink-0"
        >
          <Plus size={14} /> Add Category
        </button>
      </div>

      {/* Categories list table */}
      <div className="glass rounded-2xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Gender Group</th>
                <th className="pb-3 font-semibold">Parent Category</th>
                <th className="pb-3 font-semibold">Sort Order</th>
                <th className="pb-3 font-semibold">Active</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredCategories.map((c) => {
                const parent = categories.find((x) => x.id === c.parentId);
                return (
                  <tr key={c.id} className="text-text-primary hover:bg-bg-secondary/15 transition-colors">
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded bg-bg-secondary overflow-hidden shrink-0 border border-border/40">
                        <img src={c.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <span className="text-[10px] text-text-secondary truncate max-w-[150px] block">{c.description || 'No description'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 capitalize font-medium text-text-secondary">{c.gender}</td>
                    <td className="py-3.5 text-text-secondary">
                      {parent ? parent.name : <span className="text-text-muted italic">None (Root)</span>}
                    </td>
                    <td className="py-3.5 font-mono text-text-secondary">{c.sortOrder}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[9px] ${
                        c.isActive ? 'bg-success/15 text-success' : 'bg-text-muted/15 text-text-muted'
                      }`}>
                        {c.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex justify-end gap-2.5">
                        <button onClick={() => handleOpenForm(c)} className="p-1 hover:bg-bg-secondary rounded text-text-secondary hover:text-text-primary transition-colors">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleDeleteCategory(c.id)} className="p-1 hover:bg-error/15 rounded text-error transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-text-secondary">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseForm} />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-heavy w-full max-w-md rounded-2xl p-6 bg-bg-elevated/95 border border-border z-10 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-heading font-bold text-sm text-text-primary">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={handleCloseForm} className="text-xs text-text-muted hover:underline">Cancel</button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-[10px] font-medium text-text-secondary mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vintage Denim"
                  className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-text-secondary mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of products..."
                  className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-text-secondary mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1">Gender Segment</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Category['gender'])}
                    className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl focus:outline-none"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1">Parent Category</label>
                  <select
                    value={parentId || ''}
                    onChange={(e) => setParentId(e.target.value || null)}
                    className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl focus:outline-none"
                  >
                    <option value="">None (Root)</option>
                    {categories
                      .filter((c) => c.parentId === null && (!editingCategory || c.id !== editingCategory.id))
                      .map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-[10px] font-medium text-text-secondary mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl focus:outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="cat_active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded border-border text-accent-gold focus:ring-accent-gold"
                  />
                  <label htmlFor="cat_active" className="text-text-secondary font-medium select-none">Active status</label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity"
              >
                Save Category
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
