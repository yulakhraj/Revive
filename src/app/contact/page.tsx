'use client';

import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';



export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
      <div className="text-center mb-12">
        <p className="text-accent-gold text-xs font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-text-secondary text-sm">We&apos;d love to hear from you. Drop us a message and we&apos;ll respond within 24 hours.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Mail, label: 'Email', value: 'hello@ausphotic.in', href: 'mailto:hello@ausphotic.in' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
            { icon: MapPin, label: 'Office', value: 'Mumbai, Maharashtra, India', href: '#' },
            { icon: Clock, label: 'Hours', value: 'Mon-Sat, 10AM - 7PM IST', href: '#' },
          ].map((item, i) => (
            <a key={i} href={item.href} className="flex items-start gap-4 p-5 bg-bg-secondary border border-border rounded-xl hover:border-accent-gold/30 transition-colors">
              <div className="w-10 h-10 bg-accent-gold-light rounded-lg flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-accent-gold" />
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Name</label>
            <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Subject</label>
            <input type="text" placeholder="How can we help?" className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Message</label>
            <textarea rows={5} placeholder="Tell us more..." className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent-gold transition-colors resize-none" />
          </div>
          <button type="submit" className="w-full py-3.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity">Send Message</button>
        </form>
      </div>
    </div>
  );
}
