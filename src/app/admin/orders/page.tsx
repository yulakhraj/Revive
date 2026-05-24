'use client';

import { useEffect, useState } from 'react';
import { Search, Eye, ShoppingCart, Truck, Clock, CheckCircle2 } from 'lucide-react';
import { mockDb } from '@/lib/supabaseClient';
import { formatPrice } from '@/lib/utils';
import { ORDER_STATUSES } from '@/lib/constants';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    // Load orders
    const fetchOrders = async () => {
      try {
        const list = await mockDb.getOrders();
        setOrders(list);
      } catch (err) {
        console.error('Failed to load admin orders:', err);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const updatedOrder = await mockDb.updateOrderStatus(orderId, newStatus);
      if (updatedOrder) {
        setOrders((prev) => 
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search by Order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none text-text-primary"
        >
          <option value="all">All Statuses</option>
          {Object.entries(ORDER_STATUSES).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="glass rounded-2xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Payment</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOrders.map((order) => {
                const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES] || { label: order.status, color: '#9A9A9A' };
                return (
                  <tr key={order.id} className="text-text-primary hover:bg-bg-secondary/15 transition-colors">
                    <td className="py-3.5 font-mono font-medium">{order.orderNumber}</td>
                    <td className="py-3.5">
                      <p className="font-semibold">{order.shippingAddress.fullName}</p>
                      <span className="text-[10px] text-text-secondary">{order.shippingAddress.city}</span>
                    </td>
                    <td className="py-3.5 font-bold">{formatPrice(order.total)}</td>
                    <td className="py-3.5">
                      <p className="font-medium">{order.paymentMethod}</p>
                      <span className={`text-[10px] uppercase font-bold ${order.paymentStatus === 'paid' ? 'text-success' : 'text-warning'}`}>{order.paymentStatus}</span>
                    </td>
                    <td className="py-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="appearance-none font-semibold px-3 py-1 rounded-full border border-transparent cursor-pointer focus:outline-none focus:border-accent-gold"
                        style={{ backgroundColor: `${status.color}15`, color: status.color }}
                      >
                        {Object.entries(ORDER_STATUSES).map(([key, val]) => (
                          <option key={key} value={key} style={{ color: '#1A1A1A', backgroundColor: '#FFFFFF' }}>{val.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 border border-border hover:border-accent-gold text-text-secondary hover:text-text-primary rounded-lg transition-colors font-medium"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-text-secondary">
                    No orders matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          
          <div className="glass-heavy w-full max-w-xl rounded-2xl p-6 lg:p-8 bg-bg-elevated/95 border border-border z-10 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-text-primary">Order Details</h3>
                <span className="font-mono text-[10px] text-text-muted">Order ID: {selectedOrder.orderNumber}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-xs text-text-muted hover:underline">Close</button>
            </div>

            {/* Recipient card details */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">Shipping Destination</span>
                <p className="font-semibold text-text-primary">{selectedOrder.shippingAddress.fullName}</p>
                <p className="text-text-secondary leading-relaxed mt-0.5">
                  {selectedOrder.shippingAddress.line1}, {selectedOrder.shippingAddress.line2 && `${selectedOrder.shippingAddress.line2}, `}
                  <br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </p>
                <p className="text-text-muted mt-1">📞 {selectedOrder.shippingAddress.phone}</p>
              </div>

              {/* Items List */}
              <div className="border-t border-border pt-4">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-3">Order Items</span>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any) => (
                    <div key={item.id} className="flex gap-3 justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-bg-secondary rounded overflow-hidden border border-border/40 shrink-0">
                          <img src={item.productImageSnapshot} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{item.productNameSnapshot}</p>
                          <span className="text-[10px] text-text-secondary">Size: {item.size} • Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold">{formatPrice(item.priceAtPurchase * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accounting details */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping Fee</span>
                  <span>{selectedOrder.shippingFee === 0 ? 'FREE' : formatPrice(selectedOrder.shippingFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-text-primary pt-2 border-t border-border/60">
                  <span>Total Paid</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
