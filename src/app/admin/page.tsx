'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, CreditCard, Users, Tag, ArrowUpRight, TrendingUp, AlertCircle } from 'lucide-react';
import { mockDb } from '@/lib/supabaseClient';
import { mockProducts } from '@/data/mockProducts';
import { formatPrice } from '@/lib/utils';
import { ORDER_STATUSES } from '@/lib/constants';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    productsCount: 0,
    usersCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Load products, orders, and users
    const fetchStats = async () => {
      try {
        const orders = await mockDb.getOrders();
        const mockUsers = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('revive_mock_users') || '[]') : [];

        const totalSales = orders
          .filter((o: any) => o.status !== 'cancelled')
          .reduce((sum: number, o: any) => sum + o.total, 0);

        setStats({
          totalSales,
          ordersCount: orders.length,
          productsCount: mockProducts.length,
          usersCount: Math.max(2, mockUsers.length), // default 2 accounts
        });

        setRecentOrders(orders.slice(-5).reverse());
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      }
    };
    fetchStats();
  }, []);

  const cardStats = [
    { label: 'Total Revenue', value: formatPrice(stats.totalSales), sub: '+12.5% from last month', icon: CreditCard, color: 'text-success bg-success/10' },
    { label: 'Orders Placed', value: stats.ordersCount, sub: 'Active delivery tracks', icon: ShoppingBag, color: 'text-accent-gold bg-accent-gold-light' },
    { label: 'Products Catalog', value: stats.productsCount, sub: 'Verified items listed', icon: Tag, color: 'text-[#3B82F6] bg-[#3B82F6]/10' },
    { label: 'Registered Users', value: stats.usersCount, sub: 'Community members', icon: Users, color: 'text-[#8B5CF6] bg-[#8B5CF6]/10' },
  ];

  // Sales chart data mock
  const monthlySales = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 18000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 29000 },
    { month: 'May', sales: stats.totalSales || 35000 },
  ];

  const maxSales = Math.max(...monthlySales.map(m => m.sales));

  return (
    <div className="space-y-8">
      {/* Overview stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {cardStats.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass rounded-2xl p-6 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{card.label}</p>
                <h3 className="font-heading text-2xl font-bold text-text-primary">{card.value}</h3>
                <span className="text-[10px] text-text-secondary font-medium block">{card.sub}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color} shrink-0`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart and Activity Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Sales Performance Chart (Custom CSS Bar Chart) */}
        <div className="glass rounded-2xl p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-sm text-text-primary">Sales Trend</h3>
              <p className="text-xs text-text-secondary mt-0.5">Monthly revenue breakdown</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-success font-semibold">
              <TrendingUp size={14} /> +8.4% YoY
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-64 flex items-end gap-4 sm:gap-6 pt-4 border-b border-border">
            {monthlySales.map((m, idx) => {
              const heightPercent = maxSales > 0 ? (m.sales / maxSales) * 100 : 0;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group cursor-pointer">
                  {/* Tooltip */}
                  <div className="bg-bg-elevated text-text-primary border border-border text-[9px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mb-1">
                    {formatPrice(m.sales)}
                  </div>
                  {/* Bar */}
                  <div 
                    className="w-full sm:w-10 rounded-t-lg transition-all duration-700 bg-gradient-to-t from-accent-gold-light to-accent-gold group-hover:opacity-80" 
                    style={{ height: `${Math.max(10, heightPercent * 0.7)}%` }} 
                  />
                  {/* Month */}
                  <span className="text-[10px] text-text-secondary font-medium pb-2">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Console Alerts & Quick Actions */}
        <div className="glass rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-text-primary">Action Required</h3>
            
            <div className="space-y-3">
              {[
                { text: 'Verify 2 new user listings', time: '10m ago', type: 'pending' },
                { text: 'Order package needs dispatch', time: '1h ago', type: 'urgent' },
                { text: 'Product stock is low (Vintage Denim)', time: '3h ago', type: 'warning' },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-bg-secondary/40 border border-border rounded-xl text-xs">
                  <AlertCircle size={15} className={`mt-0.5 shrink-0 ${alert.type === 'urgent' ? 'text-error' : alert.type === 'warning' ? 'text-warning' : 'text-accent-gold'}`} />
                  <div>
                    <p className="font-semibold text-text-primary">{alert.text}</p>
                    <span className="text-[9px] text-text-muted mt-0.5 block">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/admin/products" className="w-full flex items-center justify-center gap-2 py-3 bg-bg-secondary hover:bg-bg-secondary/80 border border-border text-text-primary text-xs font-semibold rounded-xl transition-all">
            Manage Products Catalog <ArrowUpRight size={14} />
          </Link>
        </div>

      </div>

      {/* Recent Orders table list */}
      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-text-primary">Recent Orders</h3>
            <p className="text-xs text-text-secondary mt-0.5">Summary of latest transactions</p>
          </div>
          <Link href="/admin/orders" className="text-xs text-accent-gold hover:underline font-semibold flex items-center gap-1">
            View All Orders <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Method</th>
                <th className="pb-3 font-semibold">Total Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {recentOrders.map((order) => {
                const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES] || { label: order.status, color: '#9A9A9A' };
                return (
                  <tr key={order.id} className="text-text-primary hover:bg-bg-secondary/20 transition-colors">
                    <td className="py-3.5 font-mono font-medium">{order.orderNumber}</td>
                    <td className="py-3.5 text-text-secondary">{order.paymentMethod}</td>
                    <td className="py-3.5 font-semibold">{formatPrice(order.total)}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${status.color}15`, color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-3.5 text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3.5 text-right">
                      <Link href="/admin/orders" className="text-accent-gold hover:underline font-semibold">Manage</Link>
                    </td>
                  </tr>
                );
              })}

              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-secondary">
                    No orders placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Small missing icon import
function ChevronRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
