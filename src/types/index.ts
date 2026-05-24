// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  categoryId: string;
  category?: Category;
  brand: string;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  gender: 'men' | 'women' | 'unisex';
  fabric: string;
  color: string;
  style: string;
  sizeAvailable: string[];
  stockQuantity: number;
  isFeatured: boolean;
  isPremium: boolean;
  isFlashDeal: boolean;
  isVerified: boolean;
  sellerType: 'admin' | 'vendor';
  sellerId: string;
  avgRating: number;
  reviewCount: number;
  viewCount: number;
  tags: string[];
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  parentId: string | null;
  gender: 'men' | 'women' | 'unisex' | 'premium';
  sortOrder: number;
  isActive: boolean;
  children?: Category[];
  productCount?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  phone: string;
  isAdmin: boolean;
  preferences: Record<string, unknown>;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: 'home' | 'work' | 'other';
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  addressId: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentMethod: string;
  paymentId: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  couponId: string | null;
  trackingNumber: string;
  trackingUrl: string;
  items: OrderItem[];
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
  priceAtPurchase: number;
  productNameSnapshot: string;
  productImageSnapshot: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user?: { fullName: string; avatarUrl: string };
  rating: number;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface FlashDeal {
  id: string;
  productId: string;
  product: Product;
  dealPrice: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
}
