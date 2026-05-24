'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, ShoppingCart, Users, FolderTree, PackageOpen, 
  Home, Moon, Sun, Bell, Menu, X, ShieldAlert, LogOut 
} from 'lucide-react';
import { useAuthStore } from '@/features/auth/authStore';
import { useTheme } from '@/features/theme/ThemeProvider';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, initialize, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await initialize();
      setIsInitializing(false);
    };
    checkAuth();
  }, [initialize]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C]">
        <div className="w-10 h-10 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
      </div>
    );
  }

  // Protection Guard
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center glass rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
            <ShieldAlert size={36} />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-xl font-bold text-text-primary">Admin Access Required</h1>
            <p className="text-sm text-text-secondary">
              This area is restricted to administrators. Please log in with an authorized administrator account.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => router.push('/login')} 
              className="w-full py-3 gradient-gold text-[#0C0C0C] text-sm font-semibold rounded-xl"
            >
              Log In as Admin
            </button>
            <button 
              onClick={() => router.push('/')} 
              className="w-full py-3 border border-border text-text-secondary text-sm font-semibold rounded-xl hover:bg-bg-secondary transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: PackageOpen },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Users', href: '/admin/users', icon: Users },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between p-6">
      <div className="space-y-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center text-[#0C0C0C] font-heading font-bold text-lg">R</div>
          <div>
            <h1 className="font-heading text-md font-bold tracking-tight text-text-primary">Ausphotic</h1>
            <span className="text-[10px] text-accent-gold uppercase font-bold tracking-widest">Admin Console</span>
          </div>
        </Link>

        {/* Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'gradient-gold text-[#0C0C0C]'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="space-y-4 pt-4 border-t border-border/80">
        <Link href="/" className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-primary rounded-lg transition-colors">
          <Home size={16} />
          <span>Storefront</span>
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-error hover:bg-error/10 rounded-lg transition-all">
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border shrink-0 hidden lg:block bg-bg-primary">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-bg-primary border-r border-border z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 lg:h-20 border-b border-border sticky top-0 bg-bg-primary/80 backdrop-blur-md z-30 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-bg-secondary rounded-lg text-text-primary transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="font-heading text-lg font-bold text-text-primary capitalize">
              {menuItems.find(item => item.href === pathname)?.label || 'Console'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2.5 hover:bg-bg-secondary rounded-xl text-text-primary transition-colors" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="p-2.5 hover:bg-bg-secondary rounded-xl text-text-primary transition-colors relative" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent-gold rounded-full" />
            </button>
            <div className="h-8 w-px bg-border mx-2" />
            <div className="flex items-center gap-2.5">
              <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-accent-gold/40" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-text-primary leading-none">{user.fullName}</p>
                <span className="text-[9px] font-medium text-text-muted">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Inner Content Grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
