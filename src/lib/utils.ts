import { type ClassValue, clsx } from 'clsx';

// Simple class merge utility (no dependency needed)
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatDiscount(discount: number): string {
  return `${Math.round(discount)}% OFF`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getConditionLabel(condition: string): string {
  const labels: Record<string, string> = {
    new: 'New with tags',
    like_new: 'Like New',
    good: 'Good',
    fair: 'Fair',
  };
  return labels[condition] || condition;
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return past.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function generateOrderNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'RV-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getStarRating(rating: number): string[] {
  const stars: string[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push('full');
    else if (i - rating < 1) stars.push('half');
    else stars.push('empty');
  }
  return stars;
}
