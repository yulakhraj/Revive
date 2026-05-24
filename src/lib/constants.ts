export const APP_NAME = 'Revive';
export const APP_TAGLINE = 'Revive your wardrobe';
export const APP_DESCRIPTION = 'India\'s premium second-hand fashion marketplace. Buy pre-loved, verified clothing at unbeatable prices. Sustainable style, zero compromise.';

export const CURRENCY = '₹';
export const CURRENCY_CODE = 'INR';

export const CONDITIONS = {
  new: { label: 'New with tags', color: '#2D8A56', icon: '✨' },
  like_new: { label: 'Like New', color: '#4ADE80', icon: '🌟' },
  good: { label: 'Good', color: '#F59E0B', icon: '👍' },
  fair: { label: 'Fair', color: '#9A9A9A', icon: '📦' },
} as const;

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] as const;

export const GENDERS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
] as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Best Discount' },
] as const;

export const ORDER_STATUSES = {
  pending: { label: 'Pending', color: '#F59E0B' },
  confirmed: { label: 'Confirmed', color: '#3B82F6' },
  shipped: { label: 'Shipped', color: '#8B5CF6' },
  delivered: { label: 'Delivered', color: '#2D8A56' },
  cancelled: { label: 'Cancelled', color: '#DC2626' },
  returned: { label: 'Returned', color: '#9A9A9A' },
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  {
    label: 'Men',
    href: '/category/men',
    children: [
      { href: '/category/men-tshirts', label: 'T-Shirts' },
      { href: '/category/men-oversized', label: 'Oversized T-Shirts' },
      { href: '/category/men-shirts', label: 'Shirts' },
      { href: '/category/men-hoodies', label: 'Hoodies' },
      { href: '/category/men-jackets', label: 'Jackets' },
      { href: '/category/men-jeans', label: 'Jeans' },
      { href: '/category/men-cargo', label: 'Cargo Pants' },
      { href: '/category/men-shorts', label: 'Shorts' },
      { href: '/category/men-activewear', label: 'Activewear' },
      { href: '/category/men-suits', label: 'Blazers & Suits' },
      { href: '/category/men-ethnic', label: 'Ethnic Wear' },
      { href: '/category/men-innerwear', label: 'Innerwear' },
    ],
  },
  {
    label: 'Women',
    href: '/category/women',
    children: [
      { href: '/category/women-tops', label: 'Tops' },
      { href: '/category/women-dresses', label: 'Dresses' },
      { href: '/category/women-hoodies', label: 'Hoodies' },
      { href: '/category/women-jeans', label: 'Jeans' },
      { href: '/category/women-skirts', label: 'Skirts' },
      { href: '/category/women-trousers', label: 'Trousers' },
      { href: '/category/women-jumpsuits', label: 'Jumpsuits' },
      { href: '/category/women-activewear', label: 'Activewear' },
      { href: '/category/women-ethnic', label: 'Ethnic Wear' },
      { href: '/category/women-sarees', label: 'Sarees' },
      { href: '/category/women-coords', label: 'Co-ord Sets' },
      { href: '/category/women-jackets', label: 'Jackets' },
      { href: '/category/women-innerwear', label: 'Innerwear' },
    ],
  },
  {
    label: 'Unisex',
    href: '/category/unisex',
    children: [
      { href: '/category/unisex-streetwear', label: 'Streetwear' },
      { href: '/category/unisex-vintage', label: 'Vintage Fashion' },
      { href: '/category/unisex-y2k', label: 'Y2K Fashion' },
      { href: '/category/unisex-sneakers', label: 'Sneakers' },
      { href: '/category/unisex-outerwear', label: 'Winter Wear' },
      { href: '/category/unisex-loungewear', label: 'Loungewear' },
      { href: '/category/unisex-genx', label: 'Gen X Retro' },
      { href: '/category/unisex-accessories', label: 'Accessories' },
    ],
  },
  { href: '/category/premium', label: 'Premium', isPremium: true },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/category/men', label: 'Men' },
    { href: '/category/women', label: 'Women' },
    { href: '/category/unisex', label: 'Unisex' },
    { href: '/category/premium', label: 'Premium' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
  account: [
    { href: '/profile', label: 'My Account' },
    { href: '/orders', label: 'Orders' },
    { href: '/wishlist', label: 'Wishlist' },
    { href: '/addresses', label: 'Addresses' },
  ],
};

export const SOCIAL_LINKS = [
  { href: 'https://instagram.com/revive', label: 'Instagram', icon: 'instagram' },
  { href: 'https://twitter.com/revive', label: 'Twitter', icon: 'twitter' },
  { href: 'https://pinterest.com/revive', label: 'Pinterest', icon: 'pin' },
];
