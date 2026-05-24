'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { useAuthStore } from '@/features/auth/authStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const error = useAuthStore((s) => s.error);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        if (email.toLowerCase().includes('admin')) {
          router.push('/admin');
        } else {
          router.push('/profile');
        }
      }
    } else {
      if (!name) return;
      const success = await register(name, email);
      if (success) {
        router.push('/profile');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center text-[#0C0C0C] font-heading font-bold text-2xl">R</div>
          </Link>
          <h1 className="font-heading text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Join Ausphotic'}</h1>
          <p className="text-text-secondary text-sm mt-1">{isLogin ? 'Sign in to your account' : 'Create your free account'}</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg border border-error/20 bg-error/10 text-xs text-error font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Email or Username</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com or admin"
                className="w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-xs text-accent-gold hover:underline">Forgot password?</button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-accent-gold font-medium hover:underline">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>

        <p className="text-center text-[10px] text-text-muted mt-4">
          By continuing, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}

