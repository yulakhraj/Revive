'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How does Revive verify product quality?', a: 'Every product listed on Revive goes through a multi-step verification process. Our team checks for authenticity, condition accuracy, and quality before listing. Products are rated from "New with tags" to "Fair" based on their actual condition.' },
  { q: 'What is the return policy?', a: 'We offer a 7-day return policy for all products. If the item received doesn\'t match the description or has undisclosed defects, you can return it for a full refund. The return shipping cost is covered by Revive.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days across India. Metro cities typically receive orders in 2-3 days. We ship via trusted partners like Delhivery and DTDC.' },
  { q: 'Is free shipping available?', a: 'Yes! All orders above ₹999 qualify for free standard shipping across India. Orders below ₹999 have a flat shipping fee of ₹79.' },
  { q: 'How do I sell my clothes on Revive?', a: 'User selling is coming soon in Phase 2! Currently, all products are curated and listed by the Revive team. Stay tuned for our seller portal launch.' },
  { q: 'Are the products authentic?', a: 'Absolutely. We have a zero-tolerance policy for counterfeit items. Our team verifies brand authenticity for premium and luxury items. If a product is found to be fake, we issue an immediate refund.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI, credit/debit cards, net banking, and popular wallets through Razorpay. For international customers, we also support Stripe payments.' },
  { q: 'Can I track my order?', a: 'Yes! Once your order is shipped, you\'ll receive a tracking link via email and SMS. You can also track your order from the "My Orders" section in your account.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
      <div className="text-center mb-12">
        <p className="text-accent-gold text-xs font-semibold uppercase tracking-widest mb-3">Support</p>
        <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-text-secondary text-sm">Everything you need to know about shopping on Revive.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border border-border rounded-xl overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-bg-secondary transition-colors">
              <span className="text-sm font-medium pr-4">{faq.q}</span>
              <ChevronDown size={18} className={`shrink-0 text-text-muted transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="px-6 pb-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
