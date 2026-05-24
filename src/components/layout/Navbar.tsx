'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon, ChevronDown, LogOut, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/features/theme/ThemeProvider';
import { useCartStore } from '@/features/cart/cartStore';
import { useWishlistStore } from '@/features/wishlist/wishlistStore';
import { useAuthStore } from '@/features/auth/authStore';
import { APP_NAME, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  const cartCount = useCartStore((s) => s.items.length);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { user, logout, initialize } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    initialize();

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialize]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-accent-gold text-[#0C0C0C] text-center py-2 px-4 text-xs font-medium tracking-wide">
        ✨ FREE SHIPPING on orders above ₹999 | Use code <span className="font-bold">REVIVE20</span> for 20% off
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-heavy shadow-lg'
            : 'bg-bg-primary'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Mobile menu + Logo */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center text-[#0C0C0C] font-heading font-bold text-lg">
                  R
                </div>
                <span className="font-heading text-xl font-bold tracking-tight hidden sm:block">
                  {APP_NAME}
                </span>
              </Link>
            </div>

            {/* Center: Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => 'children' in link && link.children ? setActiveDropdown(link.label) : null}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-bg-secondary ${
                      'isPremium' in link && link.isPremium ? 'text-accent-gold font-semibold' : 'text-text-primary'
                    }`}
                  >
                    {link.label}
                    {'children' in link && link.children && <ChevronDown size={14} className="opacity-50" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {'children' in link && link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 glass rounded-xl p-2 shadow-xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 hover:bg-bg-secondary rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2.5 hover:bg-bg-secondary rounded-lg transition-colors hidden sm:flex"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link
                href="/wishlist"
                className="p-2.5 hover:bg-bg-secondary rounded-lg transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gradient-gold rounded-full text-[10px] font-bold flex items-center justify-center text-[#0C0C0C]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2.5 hover:bg-bg-secondary rounded-lg transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gradient-gold rounded-full text-[10px] font-bold flex items-center justify-center text-[#0C0C0C]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {mounted && user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <button
                    className="flex items-center gap-2 ml-2 px-3 py-2 hover:bg-bg-secondary rounded-lg transition-colors border border-border/40"
                    aria-label="User Profile"
                  >
                    <img
                      src={user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.fullName}`}
                      alt={user.fullName}
                      className="w-6 h-6 rounded-full border border-accent-gold/40"
                    />
                    <span className="text-xs font-semibold max-w-[80px] truncate hidden md:inline">
                      {user.fullName.split(' ')[0]}
                    </span>
                    <ChevronDown size={12} className="opacity-50" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-1 w-56 glass-heavy rounded-xl p-2 shadow-xl border border-border text-xs z-50 bg-bg-elevated/95"
                      >
                        <div className="px-3 py-2.5 border-b border-border/60">
                          <p className="font-semibold text-text-primary truncate">{user.fullName}</p>
                          <p className="text-[10px] text-text-secondary truncate">{user.email}</p>
                        </div>
                        <div className="p-1 space-y-0.5">
                          <Link
                            href="/profile"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
                          >
                            <User size={14} />
                            <span>My Profile</span>
                          </Link>
                          {user.isAdmin && (
                            <Link
                              href="/admin"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-accent-gold hover:bg-bg-secondary rounded-lg transition-colors font-medium"
                            >
                              <ShieldCheck size={14} />
                              <span>Admin Panel</span>
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              logout();
                              setProfileOpen(false);
                            }}
                            className="flex items-center gap-2 w-full text-left px-3 py-2 text-error hover:bg-error/10 rounded-lg transition-colors mt-1"
                          >
                            <LogOut size={14} />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 ml-2 px-4 py-2 gradient-gold text-[#0C0C0C] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Search Bar Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search for brands, styles, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-bg-primary z-50 overflow-y-auto p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center text-[#0C0C0C] font-heading font-bold text-lg">R</div>
                  <span className="font-heading text-xl font-bold">{APP_NAME}</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2"><X size={22} /></button>
              </div>

              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => !('children' in link && link.children) && setMobileOpen(false)}
                      className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-bg-secondary ${
                        'isPremium' in link && link.isPremium ? 'text-accent-gold' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                    {'children' in link && link.children && (
                      <div className="ml-4 mt-1 space-y-0.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-2">
                {mounted && user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 mb-2">
                      <img
                        src={user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.fullName}`}
                        alt={user.fullName}
                        className="w-9 h-9 rounded-full border border-accent-gold/40"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-text-primary truncate">{user.fullName}</p>
                        <p className="text-xs text-text-secondary truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-bg-secondary rounded-lg transition-colors text-text-primary"
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-accent-gold hover:bg-bg-secondary rounded-lg transition-colors font-medium"
                      >
                        <ShieldCheck size={18} />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 w-full px-4 py-3 text-sm gradient-gold text-[#0C0C0C] font-semibold rounded-lg">
                    <User size={18} /> Sign In
                  </Link>
                )}
                <button onClick={toggleTheme} className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-bg-secondary rounded-lg transition-colors text-text-primary">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
