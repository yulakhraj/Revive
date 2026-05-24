'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ShoppingBag, ShieldCheck, Plus, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/features/cart/cartStore';
import { useAuthStore } from '@/features/auth/authStore';
import { mockDb } from '@/lib/supabaseClient';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

type Step = 'shipping' | 'payment' | 'processing';

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore((s) => s.items);
  const cartSubtotal = useCartStore((s) => s.getSubtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  
  const { user, addresses, saveAddress, initialize } = useAuthStore();
  const [step, setStep] = useState<Step>('shipping');

  // Shipping Step State
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addrLabel, setAddrLabel] = useState<'home' | 'work' | 'other'>('home');
  const [addrFullName, setAddrFullName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPincode, setAddrPincode] = useState('');

  // Payment Step State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Processing Overlay State
  const [processingMessage, setProcessingMessage] = useState('');

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="font-heading text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-6">Add products to your cart before checking out.</p>
        <Link href="/shop" className="px-6 py-3 gradient-gold text-[#0C0C0C] font-semibold rounded-xl">Go to Shop</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🔒</p>
        <h1 className="font-heading text-2xl font-bold mb-2">Authentication Required</h1>
        <p className="text-text-secondary mb-6">Please log in to complete your purchase securely.</p>
        <button onClick={() => router.push('/login?redirect=/checkout')} className="px-6 py-3 gradient-gold text-[#0C0C0C] font-semibold rounded-xl">Sign In to Continue</button>
      </div>
    );
  }

  // Fees calculation
  const shippingFee = cartSubtotal >= 999 ? 0 : 99;
  const tax = Math.round(cartSubtotal * 0.05); // 5% GST
  const total = cartSubtotal + shippingFee + tax;

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrFullName || !addrPhone || !addrLine1 || !addrCity || !addrState || !addrPincode) {
      alert('Please fill in all required address fields.');
      return;
    }

    const saved = saveAddress({
      label: addrLabel,
      fullName: addrFullName,
      phone: addrPhone,
      line1: addrLine1,
      line2: addrLine2,
      city: addrCity,
      state: addrState,
      pincode: addrPincode,
      isDefault: addresses.length === 0, // default if first address
    } as any);

    // Reset Address Form
    setShowNewAddressForm(false);
    setAddrFullName('');
    setAddrPhone('');
    setAddrLine1('');
    setAddrLine2('');
    setAddrCity('');
    setAddrState('');
    setAddrPincode('');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        alert('Please complete credit card details.');
        return;
      }
    }

    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddress) {
      alert('Please select a shipping address.');
      return;
    }

    setStep('processing');
    
    // Simulate transaction workflow
    const steps = paymentMethod === 'card' 
      ? [
          'Contacting payment gateway...',
          'Authenticating card token...',
          'Authorizing transaction amount...',
          'Securing order records...',
          'Success!'
        ]
      : [
          'Verifying address and PIN code...',
          'Registering Cash-on-Delivery terms...',
          'Securing order records...',
          'Success!'
        ];

    for (const msg of steps) {
      setProcessingMessage(msg);
      await new Promise((resolve) => setTimeout(resolve, paymentMethod === 'card' ? 900 : 700));
    }

    // Create Order in Mock DB
    const orderItems = cartItems.map((item) => ({
      id: Math.random().toString(36).substring(2, 11),
      productId: item.productId,
      size: item.size,
      color: item.product.color,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
      productNameSnapshot: item.product.name,
      productImageSnapshot: item.product.images[0]?.url || '',
    }));

    const newOrder = await mockDb.createOrder({
      userId: user.id,
      addressId: selectedAddress.id,
      shippingAddress: selectedAddress,
      subtotal: cartSubtotal,
      discount: 0,
      shippingFee,
      total,
      status: 'pending',
      paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery',
      paymentId: paymentMethod === 'card' ? `pay_${Math.random().toString(36).substring(2, 9)}` : 'COD',
      paymentStatus: paymentMethod === 'card' ? 'paid' : 'pending',
      trackingNumber: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`,
      trackingUrl: 'https://shiprocket.co/track',
      items: orderItems,
    });

    // Clear cart and redirect
    clearCart();
    router.push(`/checkout/confirmation?orderId=${newOrder.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      {/* Step Progress Header */}
      <div className="flex items-center justify-center gap-4 mb-10 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step !== 'processing' ? 'bg-accent-gold text-[#0C0C0C]' : 'bg-border text-text-muted'}`}>1</span>
          <span className={`text-xs font-semibold ${step === 'shipping' ? 'text-accent-gold' : 'text-text-secondary'}`}>Shipping</span>
        </div>
        <div className="w-12 h-px bg-border" />
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 'payment' ? 'bg-accent-gold text-[#0C0C0C]' : 'bg-border text-text-muted'}`}>2</span>
          <span className={`text-xs font-semibold ${step === 'payment' ? 'text-accent-gold' : 'text-text-secondary'}`}>Payment</span>
        </div>
      </div>

      {step === 'processing' ? (
        /* Processing Payment Overlay */
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full border-4 border-accent-gold/20 border-t-accent-gold animate-spin mb-6" />
          <h2 className="font-heading text-xl font-bold mb-2">Processing Order</h2>
          <p className="text-sm text-text-secondary animate-pulse">{processingMessage}</p>
        </div>
      ) : (
        /* Checkout Layout Split */
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Input Columns */}
          <div className="flex-1 space-y-6">
            {step === 'shipping' ? (
              /* Step 1: Shipping Addresses Select */
              <div className="glass rounded-2xl p-6 lg:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold">Select Shipping Address</h3>
                  {!showNewAddressForm && (
                    <button
                      onClick={() => setShowNewAddressForm(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-accent-gold text-accent-gold text-xs font-semibold rounded-lg hover:bg-accent-gold-light transition-all"
                    >
                      <Plus size={12} /> Add New
                    </button>
                  )}
                </div>

                {/* Inline New Address Form */}
                {showNewAddressForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border border-border/80 bg-bg-secondary/20 p-5 rounded-xl space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-heading font-semibold text-sm">Add New Address</h4>
                      <button onClick={() => setShowNewAddressForm(false)} className="text-xs text-text-muted hover:underline">Cancel</button>
                    </div>

                    <form onSubmit={handleAddNewAddress} className="space-y-4">
                      {/* Label Toggle */}
                      <div>
                        <span className="block text-[11px] font-medium text-text-secondary mb-1.5">Type</span>
                        <div className="flex gap-2">
                          {(['home', 'work', 'other'] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setAddrLabel(type)}
                              className={`px-2.5 py-1 border rounded-lg text-xs font-medium capitalize transition-all ${
                                addrLabel === type
                                  ? 'border-accent-gold bg-accent-gold-light text-accent-gold'
                                  : 'border-border'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Full Name *"
                            value={addrFullName}
                            onChange={(e) => setAddrFullName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Phone Number *"
                            value={addrPhone}
                            onChange={(e) => setAddrPhone(e.target.value)}
                            className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Address Line 1 (Flat, House, Building) *"
                        value={addrLine1}
                        onChange={(e) => setAddrLine1(e.target.value)}
                        className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                      />

                      <input
                        type="text"
                        placeholder="Address Line 2 (Area, Sector, Landmark)"
                        value={addrLine2}
                        onChange={(e) => setAddrLine2(e.target.value)}
                        className="w-full px-4 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                      />

                      <div className="grid sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="City *"
                          value={addrCity}
                          onChange={(e) => setAddrCity(e.target.value)}
                          className="w-full px-3 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                        />
                        <input
                          type="text"
                          required
                          placeholder="State *"
                          value={addrState}
                          onChange={(e) => setAddrState(e.target.value)}
                          className="w-full px-3 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Pincode *"
                          value={addrPincode}
                          onChange={(e) => setAddrPincode(e.target.value)}
                          className="w-full px-3 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                        />
                      </div>

                      <button type="submit" className="w-full py-2 gradient-gold text-[#0C0C0C] font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity">
                        Save Address
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Address Cards selector */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`glass rounded-xl p-5 border cursor-pointer relative flex flex-col justify-between transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-accent-gold ring-1 ring-accent-gold'
                          : 'border-border hover:border-border-hover'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-text-secondary capitalize font-semibold tracking-wide">
                            {addr.label === 'home' ? '🏠 Home' : addr.label === 'work' ? '💼 Work' : '📍 Other'}
                          </span>
                          {selectedAddressId === addr.id && (
                            <Check size={16} className="text-accent-gold" />
                          )}
                        </div>
                        <h4 className="font-heading font-semibold text-sm mb-1">{addr.fullName}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {addr.line1}, {addr.line2 && `${addr.line2}, `}
                          <br />
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs text-text-muted mt-2">📞 {addr.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {addresses.length === 0 && !showNewAddressForm && (
                  <div className="text-center py-8 border border-dashed border-border rounded-xl">
                    <p className="text-sm text-text-secondary mb-3">No addresses found.</p>
                    <button onClick={() => setShowNewAddressForm(true)} className="px-4 py-2 gradient-gold text-[#0C0C0C] text-xs font-semibold rounded-lg">Create One</button>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    disabled={!selectedAddressId}
                    onClick={() => setStep('payment')}
                    className="flex items-center gap-2 px-6 py-3 gradient-gold text-[#0C0C0C] text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    Proceed to Payment <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Payment forms */
              <div className="glass rounded-2xl p-6 lg:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <button onClick={() => setStep('shipping')} className="p-2 border border-border rounded-lg hover:border-accent-gold text-text-secondary hover:text-text-primary transition-all">
                    <ArrowLeft size={16} />
                  </button>
                  <h3 className="font-heading text-lg font-bold">Choose Payment Method</h3>
                </div>

                {/* Payment toggles */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-accent-gold bg-accent-gold-light/20'
                        : 'border-border hover:border-border-hover'
                    }`}
                  >
                    <CreditCard size={18} className={paymentMethod === 'card' ? 'text-accent-gold' : 'text-text-secondary'} />
                    <div>
                      <h4 className="text-xs font-semibold">Credit / Debit Card</h4>
                      <p className="text-[10px] text-text-secondary mt-0.5">Pay securely with test card</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-accent-gold bg-accent-gold-light/20'
                        : 'border-border hover:border-border-hover'
                    }`}
                  >
                    <Truck size={18} className={paymentMethod === 'cod' ? 'text-accent-gold' : 'text-text-secondary'} />
                    <div>
                      <h4 className="text-xs font-semibold">Cash on Delivery</h4>
                      <p className="text-[10px] text-text-secondary mt-0.5">Pay cash when order arrives</p>
                    </div>
                  </div>
                </div>

                {/* Card input forms */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 border border-border/80 rounded-xl bg-bg-secondary/10 space-y-4 max-w-md"
                  >
                    <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">Card Details (Simulation)</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-medium text-text-secondary mb-1">Cardholder Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-medium text-text-secondary mb-1">Card Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-medium text-text-secondary mb-1">Expiry Date *</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-medium text-text-secondary mb-1">CVV *</label>
                          <input
                            type="password"
                            required
                            placeholder="•••"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-accent-gold"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="pt-4">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full flex items-center justify-center gap-2 py-3.5 gradient-gold text-[#0C0C0C] font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    Place Order ({formatPrice(total)}) <Check size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-heading font-bold text-sm border-b border-border pb-3 flex items-center gap-2 text-text-primary">
                <ShoppingBag size={16} /> Order Summary
              </h3>

              {/* Items list scroll */}
              <div className="max-h-48 overflow-y-auto space-y-3 pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-3 text-xs">
                    <div className="relative w-10 h-12 rounded bg-bg-secondary overflow-hidden shrink-0 border border-border/40">
                      <img loading="lazy" decoding="async" src={item.product.images[0]?.url} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-text-muted mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-text-primary text-xs shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Math */}
              <div className="border-t border-border pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>GST Tax (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-text-primary pt-2 border-t border-border/60">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Guarantee badge */}
              <div className="bg-success/5 border border-success/15 rounded-xl p-3.5 flex gap-2.5 items-start">
                <ShieldCheck size={16} className="text-success shrink-0 mt-0.5" />
                <div className="text-[10px] text-success font-medium">
                  <p className="font-semibold text-[11px] mb-0.5">Ausphotic Buyer Protection</p>
                  Assured authentic, quality verified items with easy 7-day return.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
