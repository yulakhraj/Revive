import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, Recycle, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — Ausphotic | Our Story',
  description: 'Learn about Ausphotic, India\'s premium second-hand fashion marketplace. Our mission to make sustainable fashion accessible to all.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-accent-gold text-xs font-semibold uppercase tracking-widest mb-3">Our Story</p>
        <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Fashion Should Be<br /><span className="text-gradient-gold">Circular, Not Linear</span>
        </h1>
        <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
          Ausphotic was born from a simple idea: great fashion shouldn&apos;t end up in landfills. We&apos;re building India&apos;s most trusted marketplace for pre-loved fashion — where every purchase saves the planet.
        </p>
      </div>

      {/* Image */}
      <div className="rounded-3xl overflow-hidden mb-16 aspect-[21/9]">
        <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=500&fit=crop" alt="Fashion" className="w-full h-full object-cover" />
      </div>

      {/* Values */}
      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {[
          { icon: Recycle, title: 'Sustainability First', desc: 'Every item revived is one less in landfills. We\'ve saved 12+ tons of textile waste so far.' },
          { icon: Shield, title: 'Trust & Verification', desc: 'Every product goes through quality checks. What you see is what you get — guaranteed.' },
          { icon: Heart, title: 'Community Driven', desc: 'Join 10,000+ conscious shoppers who choose style without compromise.' },
          { icon: Users, title: 'Inclusive Fashion', desc: 'From streetwear to ethnic wear, luxury to essentials — fashion for every identity and budget.' },
        ].map((v, i) => (
          <div key={i} className="p-6 bg-bg-secondary border border-border rounded-2xl">
            <v.icon size={24} className="text-accent-gold mb-3" />
            <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center p-10 bg-bg-secondary border border-border rounded-3xl">
        <h2 className="font-heading text-2xl font-bold mb-3">Ready to Light Up Your Wardrobe?</h2>
        <p className="text-text-secondary text-sm mb-6">Discover pre-loved fashion at unbeatable prices.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 gradient-gold text-[#0C0C0C] font-semibold rounded-xl hover:opacity-90 transition-opacity">
          Shop Now <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
