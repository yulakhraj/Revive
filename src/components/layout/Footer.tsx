'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone, ArrowRight, Camera } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, FOOTER_LINKS } from '@/lib/constants';
import { useState } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative bg-accent-ink text-bg-primary border-t-[1.5px] border-accent-ink mt-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-accent-coral/20 blur-3xl" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-accent-lilac/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        {/* Big editorial signoff */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <h3 className="font-heading text-4xl lg:text-6xl font-black leading-[0.95] tracking-tight mb-4">
              Stay in the<br />
              <span className="headline-italic text-gradient-sunset">loop ✦</span>
            </h3>
            <p className="text-bg-primary/60 text-base mb-6 max-w-md">
              Exclusive drops, style tips, early access to flash deals. Join 10K+ shoppers who get the goods first.
            </p>
          </div>
          <div className="flex gap-2 max-w-md w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 bg-bg-primary text-text-primary border-[1.5px] border-bg-primary rounded-full text-sm focus:outline-none focus:border-accent-coral transition-colors placeholder:text-text-muted"
            />
            <button className="px-6 py-4 bg-accent-coral text-white text-sm font-black rounded-full hover:bg-accent-butter hover:text-accent-ink transition-colors flex items-center gap-2 border-[1.5px] border-bg-primary uppercase tracking-wider">
              Sub <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-12 border-t border-bg-primary/15">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-accent-coral border-[1.5px] border-bg-primary flex items-center justify-center text-white font-heading font-black text-lg">A</div>
              <span className="font-heading text-xl font-black">{APP_NAME}</span>
            </Link>
            <p className="text-bg-primary/60 text-sm mb-5 leading-relaxed">{APP_TAGLINE}. India&apos;s most-loved pre-loved fashion marketplace.</p>
            <div className="flex gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-bg-primary text-accent-ink rounded-full flex items-center justify-center hover:bg-accent-coral hover:text-white transition-colors border-[1.5px] border-bg-primary">
                <Camera size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-bg-primary text-accent-ink rounded-full flex items-center justify-center hover:bg-accent-lilac transition-colors border-[1.5px] border-bg-primary font-bold">
                𝕏
              </a>
              <a href="mailto:hello@ausphotic.in" className="w-10 h-10 bg-bg-primary text-accent-ink rounded-full flex items-center justify-center hover:bg-accent-butter transition-colors border-[1.5px] border-bg-primary">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-black text-xs mb-4 uppercase tracking-[0.2em] text-bg-primary/40">Shop</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bg-primary/80 hover:text-accent-coral transition-colors font-medium">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-black text-xs mb-4 uppercase tracking-[0.2em] text-bg-primary/40">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bg-primary/80 hover:text-accent-coral transition-colors font-medium">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-black text-xs mb-4 uppercase tracking-[0.2em] text-bg-primary/40">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-bg-primary/80 font-medium">
                <MapPin size={14} className="mt-0.5 shrink-0" /> Mumbai, India
              </li>
              <li className="flex items-start gap-2 text-sm text-bg-primary/80 font-medium">
                <Phone size={14} className="mt-0.5 shrink-0" /> +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-sm text-bg-primary/80 font-medium">
                <Mail size={14} className="mt-0.5 shrink-0" /> hello@ausphotic.in
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="border-t border-bg-primary/15 bg-accent-ink overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3 font-heading font-black text-xl uppercase tracking-wider text-bg-primary/30">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6">
              AUSPHOTIC ✦ LIGHT UP YOUR WARDROBE ✦
            </span>
          ))}
        </div>
      </div>

      <div className="bg-accent-ink border-t border-bg-primary/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-bg-primary/40 font-medium">© 2025 {APP_NAME}. All rights reserved. Made with 🌈 in India.</p>
          <div className="flex items-center gap-4 text-xs text-bg-primary/40 font-medium">
            <span className="flex items-center gap-1">🌿 Sustainable</span>
            <span>·</span>
            <span>🔒 Secure</span>
            <span>·</span>
            <span>✅ Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
