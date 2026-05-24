'use client';

import { useQuickViewStore } from '@/features/product/quickViewStore';
import QuickViewModal from './QuickViewModal';

export default function QuickViewWrapper() {
  const { isOpen, product, close } = useQuickViewStore();
  return <QuickViewModal isOpen={isOpen} product={product} onClose={close} />;
}
