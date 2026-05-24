import type { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1', name: 'Vintage Oversized Denim Jacket', slug: 'vintage-oversized-denim-jacket',
    description: 'Classic vintage wash oversized denim jacket. Perfect for layering over any outfit. Pre-loved in excellent condition with authentic distressing.',
    price: 1899, originalPrice: 4999, discountPercent: 62, categoryId: 'men-jackets', brand: 'Levi\'s',
    condition: 'like_new', gender: 'unisex', fabric: 'Denim', color: 'Blue', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 3, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 24, viewCount: 1250, tags: ['vintage', 'denim', 'oversized'],
    images: [
      { id: 'i1', productId: '1', url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
      { id: 'i1b', productId: '1', url: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&h=800&fit=crop', sortOrder: 1, isPrimary: false },
    ],
    createdAt: '2025-05-20T10:00:00Z', updatedAt: '2025-05-20T10:00:00Z',
  },
  {
    id: '2', name: 'Black Minimal Hoodie', slug: 'black-minimal-hoodie',
    description: 'Ultra-soft cotton blend hoodie in jet black. Minimal branding, maximum comfort. Barely worn.',
    price: 1299, originalPrice: 2999, discountPercent: 57, categoryId: 'men-hoodies', brand: 'H&M',
    condition: 'like_new', gender: 'men', fabric: 'Cotton Blend', color: 'Black', style: 'Streetwear',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 5, isFeatured: true, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 18, viewCount: 980, tags: ['hoodie', 'minimal', 'streetwear'],
    images: [
      { id: 'i2', productId: '2', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-19T10:00:00Z', updatedAt: '2025-05-19T10:00:00Z',
  },
  {
    id: '3', name: 'Floral Summer Dress', slug: 'floral-summer-dress',
    description: 'Beautiful floral print midi dress perfect for summer. Lightweight and flowy with a flattering silhouette.',
    price: 999, originalPrice: 2499, discountPercent: 60, categoryId: 'women-dresses', brand: 'Zara',
    condition: 'good', gender: 'women', fabric: 'Viscose', color: 'Multicolor', style: 'Casual',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.9, reviewCount: 31, viewCount: 2100, tags: ['dress', 'summer', 'floral'],
    images: [
      { id: 'i3', productId: '3', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-18T10:00:00Z', updatedAt: '2025-05-18T10:00:00Z',
  },
  {
    id: '4', name: 'Premium Cargo Pants - Olive', slug: 'premium-cargo-pants-olive',
    description: 'Military-inspired cargo pants in olive green. Multiple pockets, relaxed fit, premium cotton twill.',
    price: 1499, originalPrice: 3499, discountPercent: 57, categoryId: 'men-cargo', brand: 'Urban Monkey',
    condition: 'like_new', gender: 'men', fabric: 'Cotton Twill', color: 'Olive', style: 'Streetwear',
    sizeAvailable: ['S', 'M', 'L', 'XL', 'XXL'], stockQuantity: 7, isFeatured: false, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 12, viewCount: 670, tags: ['cargo', 'streetwear', 'military'],
    images: [
      { id: 'i4', productId: '4', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-17T10:00:00Z', updatedAt: '2025-05-17T10:00:00Z',
  },
  {
    id: '5', name: 'Designer Silk Saree - Gold', slug: 'designer-silk-saree-gold',
    description: 'Exquisite Banarasi silk saree with intricate gold zari work. A timeless piece for special occasions.',
    price: 4999, originalPrice: 15999, discountPercent: 69, categoryId: 'women-sarees', brand: 'FabIndia',
    condition: 'like_new', gender: 'women', fabric: 'Silk', color: 'Gold', style: 'Ethnic',
    sizeAvailable: ['Free Size'], stockQuantity: 1, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 5.0, reviewCount: 8, viewCount: 3200, tags: ['saree', 'silk', 'premium', 'ethnic'],
    images: [
      { id: 'i5', productId: '5', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-16T10:00:00Z', updatedAt: '2025-05-16T10:00:00Z',
  },
  {
    id: '6', name: 'Retro Graphic Tee - 90s Print', slug: 'retro-graphic-tee-90s',
    description: 'Authentic 90s style graphic tee with retro print. Washed cotton for that lived-in feel.',
    price: 599, originalPrice: 1299, discountPercent: 54, categoryId: 'men-tshirts', brand: 'Bewakoof',
    condition: 'good', gender: 'unisex', fabric: 'Cotton', color: 'White', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 10, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.3, reviewCount: 45, viewCount: 890, tags: ['tshirt', 'vintage', 'retro', '90s'],
    images: [
      { id: 'i6', productId: '6', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-15T10:00:00Z', updatedAt: '2025-05-15T10:00:00Z',
  },
  {
    id: '7', name: 'Leather Biker Jacket', slug: 'leather-biker-jacket',
    description: 'Premium faux leather biker jacket with silver hardware. Edgy, timeless, and versatile.',
    price: 2999, originalPrice: 7999, discountPercent: 63, categoryId: 'men-jackets', brand: 'Jack & Jones',
    condition: 'like_new', gender: 'men', fabric: 'Faux Leather', color: 'Black', style: 'Streetwear',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 2, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 15, viewCount: 1800, tags: ['leather', 'jacket', 'biker', 'premium'],
    images: [
      { id: 'i7', productId: '7', url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-14T10:00:00Z', updatedAt: '2025-05-14T10:00:00Z',
  },
  {
    id: '8', name: 'Pastel Co-ord Set', slug: 'pastel-coord-set',
    description: 'Matching pastel lavender co-ord set with crop top and wide-leg pants. Instagram-worthy aesthetic.',
    price: 1799, originalPrice: 3999, discountPercent: 55, categoryId: 'women-coords', brand: 'SHEIN',
    condition: 'new', gender: 'women', fabric: 'Polyester Blend', color: 'Lavender', style: 'Y2K',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 4, isFeatured: true, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 22, viewCount: 1560, tags: ['coord', 'pastel', 'y2k', 'matching'],
    images: [
      { id: 'i8', productId: '8', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-13T10:00:00Z', updatedAt: '2025-05-13T10:00:00Z',
  },
  {
    id: '9', name: 'Classic White Sneakers', slug: 'classic-white-sneakers',
    description: 'Clean white leather sneakers. Timeless design that goes with everything. Barely worn, excellent condition.',
    price: 2499, originalPrice: 5999, discountPercent: 58, categoryId: 'unisex-sneakers', brand: 'Nike',
    condition: 'like_new', gender: 'unisex', fabric: 'Leather', color: 'White', style: 'Minimal',
    sizeAvailable: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'], stockQuantity: 3, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.9, reviewCount: 56, viewCount: 4200, tags: ['sneakers', 'white', 'classic'],
    images: [
      { id: 'i9', productId: '9', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-12T10:00:00Z', updatedAt: '2025-05-12T10:00:00Z',
  },
  {
    id: '10', name: 'Embroidered Kurti - Teal', slug: 'embroidered-kurti-teal',
    description: 'Beautifully embroidered cotton kurti in teal. Perfect for casual ethnic wear.',
    price: 799, originalPrice: 1999, discountPercent: 60, categoryId: 'women-ethnic', brand: 'W',
    condition: 'good', gender: 'women', fabric: 'Cotton', color: 'Teal', style: 'Ethnic',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 6, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.2, reviewCount: 19, viewCount: 730, tags: ['kurti', 'ethnic', 'embroidered'],
    images: [
      { id: 'i10', productId: '10', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-11T10:00:00Z', updatedAt: '2025-05-11T10:00:00Z',
  },
  {
    id: '11', name: 'Oversized Graphic Sweatshirt', slug: 'oversized-graphic-sweatshirt',
    description: 'Cozy oversized sweatshirt with artistic graphic print. Drop shoulders, fleece-lined.',
    price: 1099, originalPrice: 2499, discountPercent: 56, categoryId: 'men-oversized', brand: 'The Souled Store',
    condition: 'like_new', gender: 'unisex', fabric: 'Cotton Fleece', color: 'Charcoal', style: 'Streetwear',
    sizeAvailable: ['M', 'L', 'XL', 'XXL'], stockQuantity: 8, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 33, viewCount: 1120, tags: ['sweatshirt', 'oversized', 'graphic'],
    images: [
      { id: 'i11', productId: '11', url: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-10T10:00:00Z', updatedAt: '2025-05-10T10:00:00Z',
  },
  {
    id: '12', name: 'Slim Fit Blazer - Navy', slug: 'slim-fit-blazer-navy',
    description: 'Sharp slim fit blazer in navy blue. Perfect for smart casual occasions. Like new condition.',
    price: 2299, originalPrice: 5999, discountPercent: 62, categoryId: 'men-suits', brand: 'Van Heusen',
    condition: 'like_new', gender: 'men', fabric: 'Polyester Blend', color: 'Navy', style: 'Formal',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 2, isFeatured: false, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 9, viewCount: 560, tags: ['blazer', 'formal', 'slim-fit'],
    images: [
      { id: 'i12', productId: '12', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true },
    ],
    createdAt: '2025-05-09T10:00:00Z', updatedAt: '2025-05-09T10:00:00Z',
  },
  {
    id: '13', name: 'Burberry Designer Trench Coat', slug: 'burberry-designer-trench-coat',
    description: 'Iconic double-breasted Burberry trench coat in classic honey beige. Cotton gabardine fabric, vintage check lining. Barely worn in brand-new condition.',
    price: 9999, originalPrice: 45000, discountPercent: 78, categoryId: 'premium', brand: 'Burberry',
    condition: 'new', gender: 'women', fabric: 'Cotton Gabardine', color: 'Beige', style: 'Classic',
    sizeAvailable: ['S', 'M'], stockQuantity: 1, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 5.0, reviewCount: 4, viewCount: 2200, tags: ['trenchcoat', 'burberry', 'premium', 'luxe'],
    images: [
      { id: 'i13', productId: '13', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-08T10:00:00Z', updatedAt: '2025-05-08T10:00:00Z'
  },
  {
    id: '14', name: 'Emerald Silk Slip Dress', slug: 'emerald-silk-slip-dress',
    description: 'Stunning emerald green slip dress crafted from premium lightweight mulberry silk. Elegant drape, adjustable spaghetti straps. Perfect evening wear.',
    price: 2499, originalPrice: 7999, discountPercent: 68, categoryId: 'women-dresses', brand: 'Mango',
    condition: 'like_new', gender: 'women', fabric: 'Mulberry Silk', color: 'Green', style: 'Minimal',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 14, viewCount: 1450, tags: ['dress', 'silk', 'emerald', 'slip'],
    images: [
      { id: 'i14', productId: '14', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-07T10:00:00Z', updatedAt: '2025-05-07T10:00:00Z'
  },
  {
    id: '15', name: 'High-Waisted Linen Trousers', slug: 'high-waisted-linen-trousers',
    description: 'Chic high-waisted linen trousers in off-white. Breathable, relaxed leg, double pleated front. Like new.',
    price: 1399, originalPrice: 3299, discountPercent: 57, categoryId: 'women-trousers', brand: 'Uniqlo',
    condition: 'like_new', gender: 'women', fabric: 'Linen', color: 'White', style: 'Minimal',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 11, viewCount: 820, tags: ['linen', 'trousers', 'minimalist'],
    images: [
      { id: 'i15', productId: '15', url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-06T10:00:00Z', updatedAt: '2025-05-06T10:00:00Z'
  },
  {
    id: '16', name: 'Boho Embroidered Kimono', slug: 'boho-embroidered-kimono',
    description: 'Flowy cream kimono with colorful floral embroidery and fringe hem details. Gives an effortless chic bohemian touch.',
    price: 1699, originalPrice: 3999, discountPercent: 57, categoryId: 'women-ethnic', brand: 'Free People',
    condition: 'good', gender: 'women', fabric: 'Rayon', color: 'Cream', style: 'Boho',
    sizeAvailable: ['Free Size'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 16, viewCount: 940, tags: ['kimono', 'boho', 'embroidered', 'cardigan'],
    images: [
      { id: 'i16', productId: '16', url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-05T10:00:00Z', updatedAt: '2025-05-05T10:00:00Z'
  },
  {
    id: '17', name: 'Vintage Wool Knit Cardigan', slug: 'vintage-wool-knit-cardigan',
    description: 'Chunky wool knit cardigan in pastel lavender/pink mix. Relaxed balloon sleeves, tortoiseshell buttons. Vintage charm.',
    price: 1599, originalPrice: 4299, discountPercent: 62, categoryId: 'unisex-vintage', brand: 'Mango',
    condition: 'good', gender: 'women', fabric: 'Wool Blend', color: 'Lavender', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 2, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 8, viewCount: 710, tags: ['knitwear', 'cardigan', 'vintage', 'pastel'],
    images: [
      { id: 'i17', productId: '17', url: 'https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-04T10:00:00Z', updatedAt: '2025-05-04T10:00:00Z'
  },
  {
    id: '18', name: 'Chic Pastel Pink Blazer', slug: 'chic-pastel-pink-blazer',
    description: 'Tailored slim-fit blazer in a lovely pastel pink shade. Features double-breasted button closures, structured shoulders, and a clean minimalist silhouette. Perfect for dressing up a casual outfit or styling for semi-formal events.',
    price: 1899, originalPrice: 4599, discountPercent: 59, categoryId: 'women-jackets', brand: 'Zara',
    condition: 'like_new', gender: 'women', fabric: 'Polyester Blend', color: 'Pink', style: 'Casual',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 10, viewCount: 920, tags: ['blazer', 'tops', 'pastel', 'pink'],
    images: [
      { id: 'i18', productId: '18', url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-03T10:00:00Z', updatedAt: '2025-05-03T10:00:00Z'
  },
  {
    id: '19', name: 'Satin Midi Skirt - Champagne', slug: 'satin-midi-skirt-champagne',
    description: 'Elegant champagne-toned satin slip skirt. Flowy bias-cut drape that hits perfectly at mid-calf. High-waisted elastic band for comfort. A highly versatile staple for dressy or casual streetwear looks.',
    price: 1299, originalPrice: 2999, discountPercent: 57, categoryId: 'women-skirts', brand: 'H&M',
    condition: 'like_new', gender: 'women', fabric: 'Satin', color: 'Champagne', style: 'Minimal',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 15, viewCount: 1100, tags: ['skirt', 'satin', 'midi', 'minimalist'],
    images: [
      { id: 'i19', productId: '19', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-02T10:00:00Z', updatedAt: '2025-05-02T10:00:00Z'
  },
  {
    id: '20', name: 'Floral Organza Leheria Saree', slug: 'floral-organza-leheria-saree',
    description: 'Gorgeous organza silk saree in classic leheria print adorned with hand-painted watercolor floral motifs and delicate scalloped borders. Comes with an unstitched matching blouse piece. Worn once for a family gathering.',
    price: 3499, originalPrice: 8999, discountPercent: 61, categoryId: 'women-sarees', brand: 'FabIndia',
    condition: 'like_new', gender: 'women', fabric: 'Organza Silk', color: 'Multicolor', style: 'Ethnic',
    sizeAvailable: ['Free Size'], stockQuantity: 1, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.9, reviewCount: 6, viewCount: 1650, tags: ['saree', 'organza', 'ethnic', 'premium'],
    images: [
      { id: 'i20', productId: '20', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-05-01T10:00:00Z', updatedAt: '2025-05-01T10:00:00Z'
  },
  {
    id: '21', name: 'Oversized Knit Vest - Cream', slug: 'oversized-knit-vest-cream',
    description: 'Cozy sleeveless cable-knit sweater vest in a soft cream shade. Relaxed V-neck collar and ribbed hemline. Super cute layered over a white button-down shirt or worn on its own. In perfect condition.',
    price: 999, originalPrice: 2499, discountPercent: 60, categoryId: 'women-tops', brand: 'Mango',
    condition: 'new', gender: 'women', fabric: 'Cotton Blend', color: 'Cream', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 8, viewCount: 630, tags: ['vest', 'knitwear', 'vintage', 'cream'],
    images: [
      { id: 'i21', productId: '21', url: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-30T10:00:00Z', updatedAt: '2025-04-30T10:00:00Z'
  },
  {
    id: '22', name: 'Linen Wrap Dress - Sage Green', slug: 'linen-wrap-dress-sage-green',
    description: 'Charming wrap midi dress in lightweight pure linen. Flattering tie-waist closure, short puff sleeves, and a flowy A-line skirt. Ideal for sunny afternoon dates, brunches, or coastal getaways.',
    price: 2199, originalPrice: 4999, discountPercent: 56, categoryId: 'women-dresses', brand: 'Zara',
    condition: 'like_new', gender: 'women', fabric: 'Linen', color: 'Green', style: 'Casual',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 11, viewCount: 1450, tags: ['dress', 'linen', 'wrap-dress', 'green'],
    images: [
      { id: 'i22', productId: '22', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-29T10:00:00Z', updatedAt: '2025-04-29T10:00:00Z'
  },
  {
    id: '23', name: 'Wide-Leg Denim Dungarees', slug: 'wide-leg-denim-dungarees',
    description: 'Retro-style denim dungarees with a flattering wide-leg fit. Made from mid-weight washed indigo denim. Features adjustable shoulder straps, multi-pocket design, and button side closures. Shows minimal wear.',
    price: 2299, originalPrice: 5499, discountPercent: 58, categoryId: 'women-jumpsuits', brand: 'Levi\'s',
    condition: 'good', gender: 'women', fabric: 'Denim', color: 'Blue', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 2, isFeatured: false, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 7, viewCount: 880, tags: ['dungarees', 'denim', 'jumpsuit', 'vintage'],
    images: [
      { id: 'i23', productId: '23', url: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-28T10:00:00Z', updatedAt: '2025-04-28T10:00:00Z'
  },
  {
    id: '24', name: 'Velvet Anarkali Suit - Royal Blue', slug: 'velvet-anarkali-suit-royal-blue',
    description: 'Regal royal blue velvet Anarkali suit set. Detailed with intricate zari embroidery on the yoke and sleeve cuffs. Paired with comfortable matching pants and an organza dupatta. A premium set for weddings and festive wear.',
    price: 4299, originalPrice: 10999, discountPercent: 61, categoryId: 'women-ethnic', brand: 'W',
    condition: 'new', gender: 'women', fabric: 'Velvet', color: 'Blue', style: 'Ethnic',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 3, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 5.0, reviewCount: 5, viewCount: 1980, tags: ['ethnic', 'anarkali', 'velvet', 'premium'],
    images: [
      { id: 'i24', productId: '24', url: 'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-27T10:00:00Z', updatedAt: '2025-04-27T10:00:00Z'
  },
  {
    id: '25', name: 'Ribbed Knit Crop & Cardigan Set', slug: 'ribbed-knit-crop-cardigan-set',
    description: 'Ultra-comfy matching twinset including a ribbed knit sleeveless crop top and a matching long-sleeve crop cardigan. Soft, stretchy fabric that hugs the body nicely. Ideal for light layering in casual spring/autumn outfits.',
    price: 1499, originalPrice: 3499, discountPercent: 57, categoryId: 'women-tops', brand: 'Mango',
    condition: 'like_new', gender: 'women', fabric: 'Viscose Blend', color: 'Teal', style: 'Minimal',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 12, viewCount: 970, tags: ['knitwear', 'cardigan', 'crop-top', 'matching'],
    images: [
      { id: 'i25', productId: '25', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-26T10:00:00Z', updatedAt: '2025-04-26T10:00:00Z'
  },
  {
    id: '26', name: 'Organic Cotton Boxer Briefs Set', slug: 'organic-cotton-boxer-briefs-set',
    description: 'Pack of three classic boxer briefs crafted from premium organic cotton with a hint of stretch. Features a comfortable elastic waistband and flatlock seams to prevent chafing. Breathable and soft for everyday wear.',
    price: 699, originalPrice: 1499, discountPercent: 53, categoryId: 'men-innerwear', brand: 'Calvin Klein',
    condition: 'new', gender: 'men', fabric: 'Organic Cotton', color: 'Multicolor', style: 'Minimal',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 10, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 42, viewCount: 1100, tags: ['boxers', 'briefs', 'innerwear', 'cotton'],
    images: [
      { id: 'i26', productId: '26', url: 'https://images.unsplash.com/photo-1601393710008-984348f7447b?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-25T10:00:00Z', updatedAt: '2025-04-25T10:00:00Z'
  },
  {
    id: '27', name: 'Ribbed Knit Cotton Trunks', slug: 'ribbed-knit-cotton-trunks',
    description: 'Double-pack of lightweight, ribbed cotton trunks. Featuring a supportive front contour pouch and tagless back labels for ultimate itch-free comfort. Fits snugly and stays invisible under jeans.',
    price: 499, originalPrice: 999, discountPercent: 50, categoryId: 'men-innerwear', brand: 'H&M',
    condition: 'new', gender: 'men', fabric: 'Cotton', color: 'Black', style: 'Casual',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 8, isFeatured: false, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 18, viewCount: 520, tags: ['trunks', 'innerwear', 'cotton', 'ribbed'],
    images: [
      { id: 'i27', productId: '27', url: 'https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-24T10:00:00Z', updatedAt: '2025-04-24T10:00:00Z'
  },
  {
    id: '28', name: 'Seamless Microfiber Hipster Briefs', slug: 'seamless-microfiber-hipster-briefs',
    description: 'Seamless pack of hipster briefs made from ultra-smooth, lightweight microfiber fabric. Zero panty lines design with laser-cut edges. Highly stretchable, breathable, and stays in place all day.',
    price: 799, originalPrice: 1899, discountPercent: 58, categoryId: 'women-innerwear', brand: 'Marks & Spencer',
    condition: 'new', gender: 'women', fabric: 'Microfiber', color: 'Beige', style: 'Minimal',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 6, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 29, viewCount: 940, tags: ['briefs', 'panties', 'innerwear', 'seamless'],
    images: [
      { id: 'i28', productId: '28', url: 'https://images.unsplash.com/photo-1597092451116-27787c07901d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-23T10:00:00Z', updatedAt: '2025-04-23T10:00:00Z'
  },
  {
    id: '29', name: 'Lace Detail Triangle Bralette', slug: 'lace-detail-triangle-bralette',
    description: 'Chic triangle bralette adorned with delicate floral lace trim. Features wireless, unpadded cups for an effortless, natural shape and adjustable cross-back spaghetti straps. Gorgeous for layering under sheer tops.',
    price: 1199, originalPrice: 2499, discountPercent: 52, categoryId: 'women-innerwear', brand: 'Zara',
    condition: 'new', gender: 'women', fabric: 'Lace & Nylon', color: 'White', style: 'Boho',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 5, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.9, reviewCount: 16, viewCount: 880, tags: ['bralette', 'innerwear', 'lace', 'lingerie'],
    images: [
      { id: 'i29', productId: '29', url: 'https://images.unsplash.com/photo-1568663521381-33b7c467fda0?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-22T10:00:00Z', updatedAt: '2025-04-22T10:00:00Z'
  },
  {
    id: '30', name: 'Vintage 90s Flannel Shirt', slug: 'vintage-90s-flannel-shirt',
    description: 'Classic Gen X style oversized flannel shirt in red and black lumberjack plaid. Ultra soft brushed cotton, single chest pocket, button cuffs. The perfect grunge layering piece.',
    price: 1299, originalPrice: 2999, discountPercent: 57, categoryId: 'unisex-genx', brand: 'Wrangler',
    condition: 'good', gender: 'unisex', fabric: 'Brushed Cotton', color: 'Red Plaid', style: 'Vintage',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 3, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 19, viewCount: 890, tags: ['flannel', 'shirt', 'grunge', '90s', 'genx'],
    images: [
      { id: 'i30', productId: '30', url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-21T10:00:00Z', updatedAt: '2025-04-21T10:00:00Z'
  },
  {
    id: '31', name: 'High-Rise Bootcut Jeans', slug: 'high-rise-bootcut-jeans',
    description: 'True retro stonewash blue denim jeans with a flattering high rise and traditional bootcut leg opening. Hugs the waist and hips comfortably with minimal stretch. Classic 90s vibes.',
    price: 1699, originalPrice: 3999, discountPercent: 57, categoryId: 'women-jeans', brand: 'Lee',
    condition: 'like_new', gender: 'women', fabric: 'Cotton Denim', color: 'Blue', style: 'Vintage',
    sizeAvailable: ['26', '28', '30', '32'], stockQuantity: 2, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 14, viewCount: 710, tags: ['jeans', 'denim', 'bootcut', 'vintage'],
    images: [
      { id: 'i31', productId: '31', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-20T10:00:00Z', updatedAt: '2025-04-20T10:00:00Z'
  },
  {
    id: '32', name: 'Classic Flared Retro Jeans', slug: 'classic-flared-retro-jeans',
    description: 'Men\'s classic Stonewash flared denim jeans. Heavyweight rigid cotton denim with a relaxed thigh and moderate flare. Features authentic pocket details and copper rivets. In excellent pre-loved condition.',
    price: 1899, originalPrice: 4299, discountPercent: 55, categoryId: 'men-jeans', brand: 'Levi\'s',
    condition: 'good', gender: 'men', fabric: 'Cotton', color: 'Stonewash Blue', style: 'Vintage',
    sizeAvailable: ['30', '32', '34', '36'], stockQuantity: 3, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 9, viewCount: 650, tags: ['jeans', 'denim', 'flared', 'men'],
    images: [
      { id: 'i32', productId: '32', url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-19T10:00:00Z', updatedAt: '2025-04-19T10:00:00Z'
  },
  {
    id: '33', name: 'Oversized Corduroy Shacket', slug: 'oversized-corduroy-shacket',
    description: 'Thick, vintage-style ribbed corduroy shirt jacket in chestnut brown. Features metal snap buttons, twin front utility pockets, and a super loose, drop-shoulder silhouette. Classic Gen X streetwear statement piece.',
    price: 1499, originalPrice: 3499, discountPercent: 57, categoryId: 'unisex-genx', brand: 'Zara',
    condition: 'like_new', gender: 'unisex', fabric: 'Corduroy', color: 'Brown', style: 'Streetwear',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 22, viewCount: 1040, tags: ['corduroy', 'shacket', 'unisex', 'vintage', 'genx'],
    images: [
      { id: 'i33', productId: '33', url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-18T10:00:00Z', updatedAt: '2025-04-18T10:00:00Z'
  },
  {
    id: '34', name: 'Cropped Tweed Utility Jacket', slug: 'cropped-tweed-utility-jacket',
    description: 'Chic women\'s structured cropped jacket in a monochrome woven tweed texture. Detailed with four front utility pockets and golden crest buttons. Pairs beautifully with high-waisted skirts or bootcut trousers.',
    price: 2499, originalPrice: 5999, discountPercent: 58, categoryId: 'women-jackets', brand: 'Mango',
    condition: 'like_new', gender: 'women', fabric: 'Tweed Wool', color: 'Black & White', style: 'Formal',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 11, viewCount: 880, tags: ['jacket', 'tweed', 'blazer', 'formal'],
    images: [
      { id: 'i34', productId: '34', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-17T10:00:00Z', updatedAt: '2025-04-17T10:00:00Z'
  },
  {
    id: '35', name: 'Knit Crop Top & Short Set', slug: 'knit-crop-top-short-set',
    description: 'Matching summer co-ord set containing a ribbed knit sleeveless crop top and matching high-waisted shorts with drawstrings. Extremely soft and breathable cotton-viscose blend.',
    price: 1199, originalPrice: 2799, discountPercent: 57, categoryId: 'women-coords', brand: 'SHEIN',
    condition: 'new', gender: 'women', fabric: 'Knit Cotton', color: 'Taupe', style: 'Casual',
    sizeAvailable: ['XS', 'S', 'M'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.3, reviewCount: 14, viewCount: 650, tags: ['coords', 'knitwear', 'shorts', 'crop-top'],
    images: [
      { id: 'i35', productId: '35', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-16T10:00:00Z', updatedAt: '2025-04-16T10:00:00Z'
  },
  {
    id: '36', name: 'Vintage Sport Utility Shorts', slug: 'vintage-sport-utility-shorts',
    description: 'Men\'s classic utility cargo shorts in a sturdy washed cotton twill. Multi-pocket design, adjustable waist tabs, and relaxed fit. Ideal for warm weather activities or outdoor style.',
    price: 799, originalPrice: 1999, discountPercent: 60, categoryId: 'men-shorts', brand: 'Woodland',
    condition: 'good', gender: 'men', fabric: 'Cotton Twill', color: 'Khaki', style: 'Casual',
    sizeAvailable: ['30', '32', '34', '36'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 21, viewCount: 920, tags: ['shorts', 'utility', 'cargo', 'khaki'],
    images: [
      { id: 'i36', productId: '36', url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-15T10:00:00Z', updatedAt: '2025-04-15T10:00:00Z'
  },
  {
    id: '37', name: 'Performance Fleece Track Pants', slug: 'performance-fleece-track-pants',
    description: 'Men\'s premium heavy fleece joggers. Tapered fit, elasticated ankles, deep zippered side pockets. Designed to keep you warm and dry during light outdoor athletic activity or lounge days.',
    price: 1199, originalPrice: 2999, discountPercent: 60, categoryId: 'men-activewear', brand: 'Puma',
    condition: 'like_new', gender: 'men', fabric: 'Polyester Fleece', color: 'Charcoal', style: 'Streetwear',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: true, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 15, viewCount: 780, tags: ['joggers', 'sweatpants', 'activewear', 'fleece'],
    images: [
      { id: 'i37', productId: '37', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-14T10:00:00Z', updatedAt: '2025-04-14T10:00:00Z'
  },
  {
    id: '38', name: 'Designer Cotton Chikankari Kurta', slug: 'designer-cotton-chikankari-kurta',
    description: 'Elegant white cotton kurta for men featuring detailed hand-embroidered Lucknowi Chikankari design. Extremely lightweight, soft, and breathable cotton fabric. Barely worn in spotless condition.',
    price: 1399, originalPrice: 3499, discountPercent: 60, categoryId: 'men-ethnic', brand: 'Manyavar',
    condition: 'like_new', gender: 'men', fabric: 'Cotton', color: 'White', style: 'Ethnic',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 12, viewCount: 990, tags: ['kurta', 'ethnic', 'chikankari', 'traditional'],
    images: [
      { id: 'i38', productId: '38', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-13T10:00:00Z', updatedAt: '2025-04-13T10:00:00Z'
  },
  {
    id: '39', name: 'Seamless High-Waist Gym Leggings', slug: 'seamless-high-waist-gym-leggings',
    description: 'Women\'s premium seamless gym tights in a flattering high-waisted compression fit. Moisture-wicking performance knit fabric with squat-proof thickness. Perfect condition.',
    price: 999, originalPrice: 2499, discountPercent: 60, categoryId: 'women-activewear', brand: 'Nike',
    condition: 'new', gender: 'women', fabric: 'Nylon Blend', color: 'Teal', style: 'Activewear',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 22, viewCount: 810, tags: ['leggings', 'activewear', 'tights', 'seamless'],
    images: [
      { id: 'i39', productId: '39', url: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-12T10:00:00Z', updatedAt: '2025-04-12T10:00:00Z'
  },
  {
    id: '40', name: 'Pastel Oversized Hoodie - Peach', slug: 'pastel-oversized-hoodie-peach',
    description: 'Super soft, fleece-lined peach-colored hoodie. Oversized drop-shoulder fit, large kangaroo pocket, double-lined hood. Pre-loved and washed with minimal wear.',
    price: 1199, originalPrice: 2799, discountPercent: 57, categoryId: 'women-hoodies', brand: 'H&M',
    condition: 'good', gender: 'women', fabric: 'Cotton Fleece', color: 'Peach', style: 'Casual',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 2, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 16, viewCount: 790, tags: ['hoodie', 'sweatshirt', 'casual', 'pastel'],
    images: [
      { id: 'i40', productId: '40', url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-11T10:00:00Z', updatedAt: '2025-04-11T10:00:00Z'
  },
  {
    id: '41', name: 'Waffle Knit Robe & Lounge Pants', slug: 'waffle-knit-robe-lounge-pants',
    description: 'Matching waffle knit lounge set containing a belted wrap kimono robe and wide-leg jogger pants. Ultra soft, lightweight cotton fabric that feels amazing on skin.',
    price: 1799, originalPrice: 3999, discountPercent: 55, categoryId: 'unisex-loungewear', brand: 'Marks & Spencer',
    condition: 'new', gender: 'unisex', fabric: 'Cotton', color: 'Charcoal', style: 'Loungewear',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 8, viewCount: 670, tags: ['loungewear', 'waffle-knit', 'robe', 'matching'],
    images: [
      { id: 'i41', productId: '41', url: 'https://images.unsplash.com/photo-1515434126000-961d90ff09db?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-10T10:00:00Z', updatedAt: '2025-04-10T10:00:00Z'
  },
  {
    id: '42', name: 'Retro Hexagonal Metal Sunglasses', slug: 'retro-hexagonal-metal-sunglasses',
    description: 'Cool Gen X style 90s retro hexagonal sunglasses with gold metal frame and dark green tinted lenses. 100% UV protection. Adds a vintage touch to any aesthetic.',
    price: 899, originalPrice: 1999, discountPercent: 55, categoryId: 'unisex-accessories', brand: 'Ray-Ban',
    condition: 'like_new', gender: 'unisex', fabric: 'Metal', color: 'Gold/Green', style: 'Vintage',
    sizeAvailable: ['One Size'], stockQuantity: 5, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 22, viewCount: 1210, tags: ['sunglasses', 'accessories', 'retro', 'vintage', 'genx'],
    images: [
      { id: 'i42', productId: '42', url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-09T10:00:00Z', updatedAt: '2025-04-09T10:00:00Z'
  },
  {
    id: '43', name: 'Luxe Silk Bralette & Briefs Set', slug: 'luxe-silk-bralette-briefs-set',
    description: 'Sensual and luxurious matching set featuring a wireless mulberry silk bralette with adjustable straps and coordinating lace-trim hipster briefs. Incredibly soft against the skin, offering an elegant drape and light daily support.',
    price: 1599, originalPrice: 3499, discountPercent: 54, categoryId: 'women-innerwear', brand: 'Marks & Spencer',
    condition: 'new', gender: 'women', fabric: 'Mulberry Silk', color: 'Emerald Green', style: 'Luxe',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 4, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.9, reviewCount: 12, viewCount: 950, tags: ['lingerie', 'silk', 'briefs', 'bralette', 'innerwear'],
    images: [
      { id: 'i43', productId: '43', url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-08T10:00:00Z', updatedAt: '2025-04-08T10:00:00Z'
  },
  {
    id: '44', name: 'Athletic Stretch Boxer Briefs Set', slug: 'athletic-stretch-boxer-briefs-set',
    description: 'Pack of three athletic performance boxer briefs with flat-lock anti-chafing seams and sweat-wicking microfiber fabrication. The wide, supportive waistband keeps briefs in place during intense workouts.',
    price: 799, originalPrice: 1699, discountPercent: 53, categoryId: 'men-innerwear', brand: 'Nike',
    condition: 'new', gender: 'men', fabric: 'Microfiber Blend', color: 'Multicolor', style: 'Activewear',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 10, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 25, viewCount: 820, tags: ['boxers', 'innerwear', 'activewear', 'briefs'],
    images: [
      { id: 'i44', productId: '44', url: 'https://images.unsplash.com/photo-1601393709771-3938c63d41a6?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-07T10:00:00Z', updatedAt: '2025-04-07T10:00:00Z'
  },
  {
    id: '45', name: 'Comfort Cotton Bralette', slug: 'comfort-cotton-bralette',
    description: 'Soft stretch cotton triangle bralette featuring a classic logo band. Completely wire-free and unpadded for natural, breathable day-long comfort. Pristine styling for lounge or layered casualwear.',
    price: 999, originalPrice: 1999, discountPercent: 50, categoryId: 'women-innerwear', brand: 'Calvin Klein',
    condition: 'new', gender: 'women', fabric: 'Organic Cotton', color: 'White', style: 'Minimal',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 31, viewCount: 920, tags: ['bralette', 'cotton', 'minimalist', 'innerwear'],
    images: [
      { id: 'i45', productId: '45', url: 'https://images.unsplash.com/photo-1546464750-77d1763f6401?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-06T10:00:00Z', updatedAt: '2025-04-06T10:00:00Z'
  },
  {
    id: '46', name: 'Classic Bamboo Boxer Briefs Set', slug: 'classic-bamboo-boxer-briefs-set',
    description: 'Triple pack of ultra-soft boxer briefs woven from premium bamboo rayon fabric. Offers natural odor resistance, temperature regulation, and a luxuriously soft feel. Features a plush elastic waistband.',
    price: 899, originalPrice: 1999, discountPercent: 55, categoryId: 'men-innerwear', brand: 'Woodland',
    condition: 'new', gender: 'men', fabric: 'Bamboo Viscose', color: 'Multicolor', style: 'Casual',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 8, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 15, viewCount: 610, tags: ['boxers', 'innerwear', 'bamboo', 'briefs'],
    images: [
      { id: 'i46', productId: '46', url: 'https://images.unsplash.com/photo-1656587132121-aaccc57589cf?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-05T10:00:00Z', updatedAt: '2025-04-05T10:00:00Z'
  },
  {
    id: '47', name: 'Soft Microfiber Wireless Bra', slug: 'soft-microfiber-wireless-bra',
    description: 'Comfortable everyday wireless T-shirt bra crafted from smooth microfiber. Lightly lined molded cups provide a seamless look under t-shirts and fitted tops, while offering gentle, natural support.',
    price: 1099, originalPrice: 2499, discountPercent: 56, categoryId: 'women-innerwear', brand: 'Mango',
    condition: 'new', gender: 'women', fabric: 'Nylon Blend', color: 'Nude', style: 'Minimal',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 6, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 18, viewCount: 770, tags: ['bra', 'innerwear', 'seamless', 'microfiber'],
    images: [
      { id: 'i47', productId: '47', url: 'https://images.unsplash.com/photo-1660070605791-e5146f71ceb2?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-04T10:00:00Z', updatedAt: '2025-04-04T10:00:00Z'
  },
  {
    id: '48', name: 'Premium Cotton Briefs (3-Pack)', slug: 'premium-cotton-briefs-3-pack',
    description: 'Classic cotton briefs in a convenient triple pack. Features a classic Y-front cut, double-layered contour pouch, and comfortable elastic waistband. High durability and supreme breathability.',
    price: 599, originalPrice: 1299, discountPercent: 54, categoryId: 'men-innerwear', brand: 'Jockey',
    condition: 'new', gender: 'men', fabric: 'Cotton', color: 'White/Black/Grey', style: 'Classic',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 12, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 22, viewCount: 510, tags: ['briefs', 'innerwear', 'cotton', 'jockey'],
    images: [
      { id: 'i48', productId: '48', url: 'https://images.unsplash.com/photo-1601393710008-984348f7447b?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-03T10:00:00Z', updatedAt: '2025-04-03T10:00:00Z'
  },
  {
    id: '49', name: 'Slim Fit Stretch Jeans - Dark Blue', slug: 'slim-fit-stretch-jeans-dark-blue',
    description: 'Men\'s slim fit stretch denim jeans in an elegant deep indigo wash. Combines the classic structured look of raw denim with modern stretch comfort. Perfect for smart-casual wear.',
    price: 1499, originalPrice: 3499, discountPercent: 57, categoryId: 'men-jeans', brand: 'Levi\'s',
    condition: 'like_new', gender: 'men', fabric: 'Cotton Denim', color: 'Dark Blue', style: 'Casual',
    sizeAvailable: ['30', '32', '34', '36'], stockQuantity: 6, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 31, viewCount: 920, tags: ['jeans', 'denim', 'slim-fit', 'levis'],
    images: [
      { id: 'i49', productId: '49', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-02T10:00:00Z', updatedAt: '2025-04-02T10:00:00Z'
  },
  {
    id: '50', name: 'Mom Fit High-Waist Jeans', slug: 'mom-fit-high-waist-jeans',
    description: 'High-waisted rigid denim jeans featuring a classic tapered leg and relaxed fit through the thighs. Authentic stonewash finish gives a stylish vintage look.',
    price: 1599, originalPrice: 3299, discountPercent: 51, categoryId: 'women-jeans', brand: 'Zara',
    condition: 'like_new', gender: 'women', fabric: 'Rigid Denim', color: 'Stonewash Blue', style: 'Vintage',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 16, viewCount: 880, tags: ['jeans', 'mom-jeans', 'denim', 'zara'],
    images: [
      { id: 'i50', productId: '50', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-04-01T10:00:00Z', updatedAt: '2025-04-01T10:00:00Z'
  },
  {
    id: '51', name: 'Regular Fit Straight Cut Jeans', slug: 'regular-fit-straight-cut-jeans',
    description: 'Men\'s classic mid-rise straight leg jeans. Crafted from heavy-duty durable cotton denim. A timeless staple in excellent pre-loved condition, barely worn.',
    price: 1699, originalPrice: 3999, discountPercent: 57, categoryId: 'men-jeans', brand: 'Jack & Jones',
    condition: 'good', gender: 'men', fabric: 'Cotton', color: 'Mid Blue', style: 'Classic',
    sizeAvailable: ['30', '32', '34', '36', '38'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 11, viewCount: 540, tags: ['jeans', 'denim', 'regular-fit', 'straight-leg'],
    images: [
      { id: 'i51', productId: '51', url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-31T10:00:00Z', updatedAt: '2025-03-31T10:00:00Z'
  },
  {
    id: '52', name: 'Distressed Skinny Jeans', slug: 'distressed-skinny-jeans',
    description: 'Women\'s mid-rise skinny jeans in a highly stretchable denim fabric. Featuring subtle distressed rips at the knees and a frayed raw hem. Adds an edgy touch to any casual look.',
    price: 1399, originalPrice: 2999, discountPercent: 53, categoryId: 'women-jeans', brand: 'H&M',
    condition: 'good', gender: 'women', fabric: 'Cotton Blend', color: 'Light Blue', style: 'Streetwear',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.3, reviewCount: 15, viewCount: 710, tags: ['jeans', 'denim', 'skinny-jeans', 'distressed'],
    images: [
      { id: 'i52', productId: '52', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-30T10:00:00Z', updatedAt: '2025-03-30T10:00:00Z'
  },
  {
    id: '53', name: 'Relaxed Fit Denim Jeans', slug: 'relaxed-fit-denim-jeans',
    description: 'Men\'s classic relaxed fit denim. Features a comfortable roomy cut through the seat and thighs, tapering slightly down to the ankle. Durable rigid cotton in vintage stonewash.',
    price: 1299, originalPrice: 2499, discountPercent: 48, categoryId: 'men-jeans', brand: 'Wrangler',
    condition: 'good', gender: 'men', fabric: 'Cotton', color: 'Stonewash Blue', style: 'Casual',
    sizeAvailable: ['30', '32', '34', '36'], stockQuantity: 7, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 8, viewCount: 490, tags: ['jeans', 'denim', 'relaxed-fit', 'wrangler'],
    images: [
      { id: 'i53', productId: '53', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-29T10:00:00Z', updatedAt: '2025-03-29T10:00:00Z'
  },
  {
    id: '54', name: 'Wide-Leg Flare Jeans', slug: 'wide-leg-flare-jeans',
    description: 'Stunning high-waisted wide-leg jeans with a dramatic flared bottom. Tailored silhouette that accentuates your curves. In like new condition, worn once.',
    price: 1799, originalPrice: 3999, discountPercent: 55, categoryId: 'women-jeans', brand: 'Mango',
    condition: 'like_new', gender: 'women', fabric: 'Denim', color: 'Dark Indigo', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 2, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 10, viewCount: 820, tags: ['jeans', 'denim', 'wide-leg', 'flared'],
    images: [
      { id: 'i54', productId: '54', url: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-28T10:00:00Z', updatedAt: '2025-03-28T10:00:00Z'
  },
  {
    id: '55', name: 'Athletic Fit Denim Jeans', slug: 'athletic-fit-denim-jeans',
    description: 'Men\'s denim jeans designed for athletic builds. Gives extra room at the seat and thighs with a tapered leg. Modern blue stretch denim.',
    price: 1599, originalPrice: 3499, discountPercent: 54, categoryId: 'men-jeans', brand: 'Lee',
    condition: 'like_new', gender: 'men', fabric: 'Cotton Stretch', color: 'Medium Blue', style: 'Casual',
    sizeAvailable: ['32', '34', '36', '38'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 14, viewCount: 680, tags: ['jeans', 'denim', 'athletic-fit', 'stretch'],
    images: [
      { id: 'i55', productId: '55', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-27T10:00:00Z', updatedAt: '2025-03-27T10:00:00Z'
  },
  {
    id: '56', name: 'Cropped Denim Jeans', slug: 'cropped-denim-jeans',
    description: 'Women\'s casual high-rise cropped denim pants. Frayed hems that land right above the ankle. Style with sneakers or boots for an effortless weekend vibe.',
    price: 1199, originalPrice: 2499, discountPercent: 52, categoryId: 'women-jeans', brand: 'Zara',
    condition: 'good', gender: 'women', fabric: 'Cotton', color: 'Light Indigo', style: 'Casual',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.2, reviewCount: 11, viewCount: 570, tags: ['jeans', 'denim', 'cropped', 'high-rise'],
    images: [
      { id: 'i56', productId: '56', url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-26T10:00:00Z', updatedAt: '2025-03-26T10:00:00Z'
  },
  {
    id: '57', name: '90s Oversized Denim Shirt', slug: '90s-oversized-denim-shirt',
    description: 'Vintage Gen X style oversized denim button-up shirt in a washed medium blue shade. Ribbed cuffs, double chest pocket details, thick cotton construction. Excellent grunge style layering item.',
    price: 1199, originalPrice: 2499, discountPercent: 52, categoryId: 'unisex-genx', brand: 'Lee',
    condition: 'good', gender: 'unisex', fabric: 'Cotton Denim', color: 'Medium Blue', style: 'Vintage',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 8, viewCount: 680, tags: ['shirt', 'denim', 'oversized', '90s', 'genx'],
    images: [
      { id: 'i57', productId: '57', url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-25T10:00:00Z', updatedAt: '2025-03-25T10:00:00Z'
  },
  {
    id: '58', name: 'Vintage Leather Bomber Jacket', slug: 'vintage-leather-bomber-jacket',
    description: 'Distressed dark brown leather bomber jacket. Heavy lining, ribbed trim cuffs and collar, brass zip hardware. Perfect representation of classic Gen X alternative streetwear fashion.',
    price: 3499, originalPrice: 7999, discountPercent: 56, categoryId: 'unisex-genx', brand: 'Wrangler',
    condition: 'good', gender: 'unisex', fabric: 'Genuine Leather', color: 'Brown', style: 'Vintage',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 2, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 16, viewCount: 1040, tags: ['leather', 'jacket', 'bomber', 'grunge', 'genx'],
    images: [
      { id: 'i58', productId: '58', url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-24T10:00:00Z', updatedAt: '2025-03-24T10:00:00Z'
  },
  {
    id: '59', name: 'Grunge Ribbed Knit Sweater', slug: 'grunge-ribbed-knit-sweater',
    description: 'Chunky, loose-knit ribbed sweater in forest green. Cozy drop shoulders and a slouchy fit. Gives off the iconic Kurt Cobain style look.',
    price: 1499, originalPrice: 3299, discountPercent: 54, categoryId: 'unisex-genx', brand: 'Mango',
    condition: 'good', gender: 'unisex', fabric: 'Wool Blend', color: 'Forest Green', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 11, viewCount: 620, tags: ['sweater', 'grunge', 'knitwear', 'vintage'],
    images: [
      { id: 'i59', productId: '59', url: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-23T10:00:00Z', updatedAt: '2025-03-23T10:00:00Z'
  },
  {
    id: '60', name: '90s Retro Band Graphic Tee', slug: '90s-retro-band-graphic-tee',
    description: 'Faded black cotton band tee featuring classic distressed music graphics. Heavyweight washed cotton fabric with double-stitched details. True 90s alternative style.',
    price: 799, originalPrice: 1699, discountPercent: 53, categoryId: 'unisex-genx', brand: 'Bewakoof',
    condition: 'good', gender: 'unisex', fabric: 'Cotton', color: 'Faded Black', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 22, viewCount: 790, tags: ['bandtee', 'graphic', 'tshirt', '90s', 'genx'],
    images: [
      { id: 'i60', productId: '60', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-22T10:00:00Z', updatedAt: '2025-03-22T10:00:00Z'
  },
  {
    id: '61', name: 'Classic Corduroy Button-Up', slug: 'classic-corduroy-button-up',
    description: 'Men\'s retro corduroy shirt in olive green. Sturdy structure, classic button chest pockets, point collar. Barely worn in immaculate condition.',
    price: 1399, originalPrice: 2999, discountPercent: 53, categoryId: 'unisex-genx', brand: 'Zara',
    condition: 'like_new', gender: 'unisex', fabric: 'Corduroy Twill', color: 'Olive Green', style: 'Vintage',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 15, viewCount: 590, tags: ['shirt', 'corduroy', 'olive', 'genx', 'vintage'],
    images: [
      { id: 'i61', productId: '61', url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-21T10:00:00Z', updatedAt: '2025-03-21T10:00:00Z'
  },
  {
    id: '62', name: 'Oversized Plaid Cardigan', slug: 'oversized-plaid-cardigan',
    description: 'Cosy open-front slouchy cardigan with bold tartan check pattern. Thick wool-mohair knit blend with balloon sleeves and ribbed edges. Stunning layering cardy.',
    price: 1699, originalPrice: 3999, discountPercent: 57, categoryId: 'unisex-genx', brand: 'Free People',
    condition: 'good', gender: 'unisex', fabric: 'Wool Blend', color: 'Plum Check', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 2, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 12, viewCount: 680, tags: ['cardigan', 'plaid', 'knitwear', 'vintage'],
    images: [
      { id: 'i62', productId: '62', url: 'https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-20T10:00:00Z', updatedAt: '2025-03-20T10:00:00Z'
  },
  {
    id: '63', name: 'Vintage Acid-Wash Denim Jacket', slug: 'vintage-acid-wash-denim-jacket',
    description: 'Iconic 90s acid wash denim jacket. Heavy denim fabric with classic copper buttons, adjustable waist straps and dual front pockets. Authentic retro aesthetic.',
    price: 1999, originalPrice: 4599, discountPercent: 56, categoryId: 'unisex-genx', brand: 'Levi\'s',
    condition: 'good', gender: 'unisex', fabric: 'Acid Wash Denim', color: 'Light Blue', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 3, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 22, viewCount: 1100, tags: ['denim', 'jacket', 'acid-wash', '90s', 'genx'],
    images: [
      { id: 'i63', productId: '63', url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-19T10:00:00Z', updatedAt: '2025-03-19T10:00:00Z'
  },
  {
    id: '64', name: '90s Striped Slouchy Tee', slug: '90s-striped-slouchy-tee',
    description: 'Striped short-sleeve slouchy tee in black and white stripes. Ribbed crew neck collar and drop-shoulder boxy fit. Classic casual grunge representation.',
    price: 699, originalPrice: 1499, discountPercent: 53, categoryId: 'unisex-genx', brand: 'H&M',
    condition: 'good', gender: 'unisex', fabric: 'Cotton', color: 'Striped Black/White', style: 'Vintage',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 16, viewCount: 710, tags: ['striped', 'tshirt', 'slouchy', 'grunge', 'genx'],
    images: [
      { id: 'i64', productId: '64', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-18T10:00:00Z', updatedAt: '2025-03-18T10:00:00Z'
  },
  {
    id: '65', name: 'MicroModal Lounge Boxers', slug: 'micromodal-lounge-boxers',
    description: 'Ultra-soft loose lounge boxers made from premium MicroModal fabric. Features a tagless design and covered elastic waistband for maximum comfort during sleep or lounging.',
    price: 999, originalPrice: 1999, discountPercent: 50, categoryId: 'men-innerwear', brand: 'Calvin Klein',
    condition: 'new', gender: 'men', fabric: 'MicroModal', color: 'Navy', style: 'Minimal',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 8, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 14, viewCount: 420, tags: ['boxers', 'innerwear', 'micromodal'],
    images: [
      { id: 'i65', productId: '65', url: 'https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-17T10:00:00Z', updatedAt: '2025-03-17T10:00:00Z'
  },
  {
    id: '66', name: 'Supima Cotton Boxer Briefs', slug: 'supima-cotton-boxer-briefs',
    description: 'Mid-rise boxer briefs crafted from luxurious Supima cotton. Offers long-lasting softness and exceptional stretch recovery. Stays snug all day.',
    price: 799, originalPrice: 1499, discountPercent: 47, categoryId: 'men-innerwear', brand: 'Uniqlo',
    condition: 'new', gender: 'men', fabric: 'Supima Cotton', color: 'Grey', style: 'Casual',
    sizeAvailable: ['M', 'L', 'XL'], stockQuantity: 10, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 10, viewCount: 310, tags: ['briefs', 'innerwear', 'cotton'],
    images: [
      { id: 'i66', productId: '66', url: 'https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-16T10:00:00Z', updatedAt: '2025-03-16T10:00:00Z'
  },
  {
    id: '67', name: 'Performance Sport Trunks', slug: 'performance-sport-trunks',
    description: 'Men\'s athletic trunks designed with moisture-wicking technology and 4-way stretch. Ideal for active lifestyles and gym wear.',
    price: 899, originalPrice: 1799, discountPercent: 50, categoryId: 'men-innerwear', brand: 'Under Armour',
    condition: 'new', gender: 'men', fabric: 'Polyester Blend', color: 'Black', style: 'Activewear',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 6, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 12, viewCount: 290, tags: ['trunks', 'innerwear', 'activewear'],
    images: [
      { id: 'i67', productId: '67', url: 'https://images.unsplash.com/photo-1601393709771-3938c63d41a6?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-15T10:00:00Z', updatedAt: '2025-03-15T10:00:00Z'
  },
  {
    id: '68', name: 'Classic Woven Boxers Set', slug: 'classic-woven-boxers-set',
    description: 'Comfortable loose woven boxer shorts in classic blue striped patterns. Breathable cotton fabric, ideal for lounge wear or daily wear.',
    price: 699, originalPrice: 1299, discountPercent: 46, categoryId: 'men-innerwear', brand: 'Jockey',
    condition: 'new', gender: 'men', fabric: 'Woven Cotton', color: 'Blue Stripes', style: 'Classic',
    sizeAvailable: ['M', 'L', 'XL', 'XXL'], stockQuantity: 12, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 9, viewCount: 250, tags: ['boxers', 'innerwear', 'classic'],
    images: [
      { id: 'i68', productId: '68', url: 'https://images.unsplash.com/photo-1656587132121-aaccc57589cf?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-14T10:00:00Z', updatedAt: '2025-03-14T10:00:00Z'
  },
  {
    id: '69', name: 'Premium Ribbed Briefs (2-Pack)', slug: 'premium-ribbed-briefs-2-pack',
    description: 'Classic ribbed briefs set crafted from organic cotton. Fitted style with elastic waistband. Barely felt under jeans or trousers.',
    price: 499, originalPrice: 999, discountPercent: 50, categoryId: 'men-innerwear', brand: 'H&M',
    condition: 'new', gender: 'men', fabric: 'Ribbed Cotton', color: 'White', style: 'Minimal',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 9, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.3, reviewCount: 8, viewCount: 210, tags: ['briefs', 'innerwear', 'ribbed'],
    images: [
      { id: 'i69', productId: '69', url: 'https://images.unsplash.com/photo-1601393710008-984348f7447b?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-13T10:00:00Z', updatedAt: '2025-03-13T10:00:00Z'
  },
  {
    id: '70', name: 'Satin & Lace Bodysuit', slug: 'satin-lace-bodysuit',
    description: 'Sophisticated women\'s bodysuit in black satin and soft floral lace details. Features snap closures at the bottom and adjustable criss-cross back straps.',
    price: 1699, originalPrice: 3499, discountPercent: 51, categoryId: 'women-innerwear', brand: 'Zara',
    condition: 'new', gender: 'women', fabric: 'Satin & Lace', color: 'Black', style: 'Luxe',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 4, isFeatured: false, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 11, viewCount: 390, tags: ['bodysuit', 'innerwear', 'satin', 'lace'],
    images: [
      { id: 'i70', productId: '70', url: 'https://images.unsplash.com/photo-1574539602047-548bf9557352?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-12T10:00:00Z', updatedAt: '2025-03-12T10:00:00Z'
  },
  {
    id: '71', name: 'Cotton Ribbed Boy Shorts', slug: 'cotton-ribbed-boy-shorts',
    description: 'Cozy and stretchy boy shorts-style underwear in ribbed cotton. Designed with a wide waistband that sits smoothly on the waist without digging.',
    price: 899, originalPrice: 1799, discountPercent: 50, categoryId: 'women-innerwear', brand: 'Calvin Klein',
    condition: 'new', gender: 'women', fabric: 'Ribbed Cotton', color: 'Grey', style: 'Minimal',
    sizeAvailable: ['S', 'M', 'L'], stockQuantity: 8, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 15, viewCount: 280, tags: ['shorts', 'innerwear', 'cotton'],
    images: [
      { id: 'i71', productId: '71', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-11T10:00:00Z', updatedAt: '2025-03-11T10:00:00Z'
  },
  {
    id: '72', name: 'Sheer Mesh Bralette', slug: 'sheer-mesh-bralette',
    description: 'Minimalist sheer mesh bralette in blush pink. Totally wireless and unpadded, offering light, comfortable support for a relaxed aesthetic.',
    price: 999, originalPrice: 1999, discountPercent: 50, categoryId: 'women-innerwear', brand: 'H&M',
    condition: 'new', gender: 'women', fabric: 'Mesh', color: 'Blush Pink', style: 'Minimal',
    sizeAvailable: ['XS', 'S', 'M', 'L'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 7, viewCount: 220, tags: ['bralette', 'innerwear', 'mesh'],
    images: [
      { id: 'i72', productId: '72', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-10T10:00:00Z', updatedAt: '2025-03-10T10:00:00Z'
  },
  {
    id: '73', name: 'Lace Trim Cotton Panties (3-Pack)', slug: 'lace-trim-cotton-panties-3-pack',
    description: 'Triple pack of comfortable cotton panties featuring delicate lace trims along the edges. Soft, breathable, and highly durable for daily rotation.',
    price: 1199, originalPrice: 2499, discountPercent: 52, categoryId: 'women-innerwear', brand: 'Marks & Spencer',
    condition: 'new', gender: 'women', fabric: 'Cotton Blend', color: 'Pastels', style: 'Casual',
    sizeAvailable: ['S', 'M', 'L', 'XL'], stockQuantity: 10, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 18, viewCount: 340, tags: ['panties', 'innerwear', 'cotton', 'lace'],
    images: [
      { id: 'i73', productId: '73', url: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-09T10:00:00Z', updatedAt: '2025-03-09T10:00:00Z'
  },
  {
    id: '74', name: 'Silk Lace Thong', slug: 'silk-lace-thong',
    description: 'Chic low-rise thong in pure mulberry silk with dynamic lace side panel details. Stretchy, elegant, and completely invisible under bodycon dresses.',
    price: 799, originalPrice: 1499, discountPercent: 47, categoryId: 'women-innerwear', brand: 'Victoria\'s Secret',
    condition: 'new', gender: 'women', fabric: 'Silk & Lace', color: 'Red', style: 'Luxe',
    sizeAvailable: ['XS', 'S', 'M'], stockQuantity: 7, isFeatured: false, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 8, viewCount: 190, tags: ['thong', 'innerwear', 'silk', 'lace'],
    images: [
      { id: 'i74', productId: '74', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-08T10:00:00Z', updatedAt: '2025-03-08T10:00:00Z'
  },
  {
    id: '75', name: 'Vintage Acid Wash Jeans', slug: 'vintage-acid-wash-jeans',
    description: 'Classic men\'s light wash denim jeans with heavy acid wash distressing. Features a regular straight fit and rigid denim construction.',
    price: 1999, originalPrice: 4499, discountPercent: 55, categoryId: 'men-jeans', brand: 'Levi\'s',
    condition: 'good', gender: 'men', fabric: 'Heavy Denim', color: 'Light Blue', style: 'Vintage',
    sizeAvailable: ['30', '32', '34'], stockQuantity: 3, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 13, viewCount: 270, tags: ['jeans', 'denim', 'acid-wash', 'vintage'],
    images: [
      { id: 'i75', productId: '75', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-07T10:00:00Z', updatedAt: '2025-03-07T10:00:00Z'
  },
  {
    id: '76', name: 'Ripped Skinny Denim - Black', slug: 'ripped-skinny-denim-black',
    description: 'Sleek black skinny jeans with distressed ripped knee accents. Stretchy fabric ensuring a tight yet comfortable fit for street styling.',
    price: 1499, originalPrice: 3299, discountPercent: 54, categoryId: 'men-jeans', brand: 'Zara',
    condition: 'good', gender: 'men', fabric: 'Stretch Cotton', color: 'Black', style: 'Streetwear',
    sizeAvailable: ['32', '34', '36'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 11, viewCount: 240, tags: ['jeans', 'skinny', 'ripped', 'black'],
    images: [
      { id: 'i76', productId: '76', url: 'https://images.unsplash.com/photo-1714143136372-ddaf8b606da7?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-06T10:00:00Z', updatedAt: '2025-03-06T10:00:00Z'
  },
  {
    id: '77', name: 'Loose Fit Carpenter Jeans', slug: 'loose-fit-carpenter-jeans',
    description: 'Retro carpenter pants in mid-weight rigid denim. Features classic utility side loops and multiple pockets. Relaxed, roomy fit.',
    price: 1699, originalPrice: 3599, discountPercent: 52, categoryId: 'men-jeans', brand: 'Lee',
    condition: 'like_new', gender: 'men', fabric: 'Rigid Denim', color: 'Stonewash Blue', style: 'Workwear',
    sizeAvailable: ['30', '32', '34', '36'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 9, viewCount: 190, tags: ['jeans', 'carpenter', 'loose-fit'],
    images: [
      { id: 'i77', productId: '77', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-05T10:00:00Z', updatedAt: '2025-03-05T10:00:00Z'
  },
  {
    id: '78', name: 'Slim Tapered Selvedge Denim', slug: 'slim-tapered-selvedge-denim',
    description: 'High-end men\'s raw selvedge denim. Sturdy, dry denim that molds uniquely to your body over time. Unwashed dark indigo shade.',
    price: 2999, originalPrice: 8999, discountPercent: 66, categoryId: 'men-jeans', brand: 'Nudie Jeans',
    condition: 'like_new', gender: 'men', fabric: 'Selvedge Denim', color: 'Indigo', style: 'Minimal',
    sizeAvailable: ['30', '31', '32', '33', '34'], stockQuantity: 2, isFeatured: true, isPremium: true,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.9, reviewCount: 8, viewCount: 310, tags: ['jeans', 'selvedge', 'premium', 'indigo'],
    images: [
      { id: 'i78', productId: '78', url: 'https://images.unsplash.com/photo-1714143136372-ddaf8b606da7?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-04T10:00:00Z', updatedAt: '2025-03-04T10:00:00Z'
  },
  {
    id: '79', name: 'Classic Comfort Straight Jeans', slug: 'classic-comfort-straight-jeans',
    description: 'Durable and traditional straight cut denim jeans. Mid-wash blue finish with soft feel. High-waisted style with robust copper hardware.',
    price: 1299, originalPrice: 2799, discountPercent: 53, categoryId: 'men-jeans', brand: 'Wrangler',
    condition: 'good', gender: 'men', fabric: 'Cotton Denim', color: 'Mid Wash Blue', style: 'Classic',
    sizeAvailable: ['32', '34', '36', '38'], stockQuantity: 6, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.3, reviewCount: 14, viewCount: 200, tags: ['jeans', 'straight', 'comfort'],
    images: [
      { id: 'i79', productId: '79', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-03T10:00:00Z', updatedAt: '2025-03-03T10:00:00Z'
  },
  {
    id: '80', name: 'Wide Leg Cargo Jeans', slug: 'wide-leg-cargo-jeans',
    description: 'Womens wide leg denim pants equipped with multiple cargo pockets. Relaxed, high rise fit in light sage blue shade.',
    price: 1899, originalPrice: 3999, discountPercent: 52, categoryId: 'women-jeans', brand: 'Zara',
    condition: 'new', gender: 'women', fabric: 'Soft Denim', color: 'Sage Blue', style: 'Streetwear',
    sizeAvailable: ['26', '28', '30'], stockQuantity: 5, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.6, reviewCount: 14, viewCount: 290, tags: ['jeans', 'cargo', 'wide-leg', 'denim'],
    images: [
      { id: 'i80', productId: '80', url: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-02T10:00:00Z', updatedAt: '2025-03-02T10:00:00Z'
  },
  {
    id: '81', name: 'Distressed Boyfriend Jeans', slug: 'distressed-boyfriend-jeans',
    description: 'Slouchy, comfortable boyfriend-style jeans in a faded light blue wash. Subtle distressed details at pockets and hems.',
    price: 1399, originalPrice: 2999, discountPercent: 53, categoryId: 'women-jeans', brand: 'H&M',
    condition: 'good', gender: 'women', fabric: 'Cotton Denim', color: 'Light Blue', style: 'Casual',
    sizeAvailable: ['28', '30', '32'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.4, reviewCount: 12, viewCount: 210, tags: ['jeans', 'boyfriend-fit', 'distressed'],
    images: [
      { id: 'i81', productId: '81', url: 'https://images.unsplash.com/photo-1637069585336-827b298fe84a?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-03-01T10:00:00Z', updatedAt: '2025-03-01T10:00:00Z'
  },
  {
    id: '82', name: 'Super High-Rise Skinny Jeans', slug: 'super-high-rise-skinny-jeans',
    description: 'Sculpting high-rise skinny jeans in a dark blue wash. Highly stretchable fabric which moves comfortably with your body.',
    price: 1599, originalPrice: 3499, discountPercent: 54, categoryId: 'women-jeans', brand: 'Mango',
    condition: 'like_new', gender: 'women', fabric: 'Super Stretch Denim', color: 'Dark Blue', style: 'Minimal',
    sizeAvailable: ['26', '28', '30', '32'], stockQuantity: 6, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.7, reviewCount: 19, viewCount: 280, tags: ['jeans', 'skinny', 'high-rise'],
    images: [
      { id: 'i82', productId: '82', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-02-28T10:00:00Z', updatedAt: '2025-02-28T10:00:00Z'
  },
  {
    id: '83', name: 'Classic Retro Straight Jeans', slug: 'classic-retro-straight-jeans',
    description: 'Traditional straight fit blue denim with rigid cotton texture. Medium indigo wash that gives classic 90s vibes.',
    price: 1999, originalPrice: 4999, discountPercent: 60, categoryId: 'women-jeans', brand: 'Levi\'s',
    condition: 'like_new', gender: 'women', fabric: 'Rigid Cotton Denim', color: 'Stonewash Indigo', style: 'Vintage',
    sizeAvailable: ['28', '30', '32'], stockQuantity: 3, isFeatured: true, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.8, reviewCount: 15, viewCount: 330, tags: ['jeans', 'straight-leg', 'vintage', 'levis'],
    images: [
      { id: 'i83', productId: '83', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-02-27T10:00:00Z', updatedAt: '2025-02-27T10:00:00Z'
  },
  {
    id: '84', name: 'Vintage Washed Black Jeans', slug: 'vintage-washed-black-jeans',
    description: 'Regular high waist straight leg denim in washed charcoal black. Pre-loved with soft worn-in fabric.',
    price: 1499, originalPrice: 3299, discountPercent: 54, categoryId: 'women-jeans', brand: 'Lee',
    condition: 'good', gender: 'women', fabric: 'Cotton Denim', color: 'Washed Black', style: 'Vintage',
    sizeAvailable: ['26', '28', '30'], stockQuantity: 4, isFeatured: false, isPremium: false,
    isFlashDeal: false, isVerified: true, sellerType: 'admin', sellerId: 'admin1',
    avgRating: 4.5, reviewCount: 8, viewCount: 220, tags: ['jeans', 'black-jeans', 'vintage'],
    images: [
      { id: 'i84', productId: '84', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop', sortOrder: 0, isPrimary: true }
    ],
    createdAt: '2025-02-26T10:00:00Z', updatedAt: '2025-02-26T10:00:00Z'
  }
];

export const getFeaturedProducts = () => mockProducts.filter(p => p.isFeatured);
export const getFlashDeals = () => mockProducts.filter(p => p.isFlashDeal);
export const getPremiumProducts = () => mockProducts.filter(p => p.isPremium);
export const getTrendingProducts = () => [...mockProducts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 8);
export const getRecentProducts = () => [...mockProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);
export const getBestSellers = () => [...mockProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
export const getProductBySlug = (slug: string) => mockProducts.find(p => p.slug === slug);
export const getProductsByGender = (gender: string) => mockProducts.filter(p => p.gender === gender || p.gender === 'unisex');
