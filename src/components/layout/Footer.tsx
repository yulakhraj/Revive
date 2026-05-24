'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, FOOTER_LINKS } from '@/lib/constants';
import { useState } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-bg-secondary border-t border-border mt-20">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-3">
            Stay in the <span className="text-gradient-gold">Loop</span>
          </h3>
          <p className="text-text-secondary text-sm mb-6">
            Get exclusive drops, style tips, and early access to flash deals. Join 10,000+ fashion-forward shoppers.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-bg-primary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors"
            />
            <button className="px-6 py-3 gradient-gold text-[#0C0C0C] text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center text-[#0C0C0C] font-heading font-bold">R</div>
              <span className="font-heading text-lg font-bold">{APP_NAME}</span>
            </Link>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">{APP_TAGLINE}. India&apos;s premium marketplace for pre-loved fashion.</p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-primary border border-border rounded-lg flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors text-sm">
                📸
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-primary border border-border rounded-lg flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors text-sm">
                𝕏
              </a>
              <a href="mailto:hello@revive.in" className="w-9 h-9 bg-bg-primary border border-border rounded-lg flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-text-muted">Shop</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-gold transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-text-muted">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-gold transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-text-muted">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <MapPin size={14} className="mt-0.5 shrink-0" /> Mumbai, India
              </li>
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <Phone size={14} className="mt-0.5 shrink-0" /> +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <Mail size={14} className="mt-0.5 shrink-0" /> hello@revive.in
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">© 2025 {APP_NAME}. All rights reserved. Made with 💛 in India.</p>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1">🌿 Sustainable Fashion</span>
            <span>•</span>
            <span>🔒 Secure Payments</span>
            <span>•</span>
            <span>✅ Verified Products</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
