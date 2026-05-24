'use client';

import { useEffect, useState } from 'react';
import { Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/features/auth/authStore';
import type { User } from '@/types';

export default function AdminUsersPage() {
  const currentUser = useAuthStore((s) => s.user);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('revive_mock_users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        // Fallback default users
        const defaultUsers: User[] = [
          {
            id: 'admin-id',
            email: 'admin',
            fullName: 'System Admin',
            avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin',
            phone: '+91 99999 99999',
            isAdmin: true,
            preferences: {},
            createdAt: new Date().toISOString(),
          },
          {
            id: 'user-id',
            email: 'user@ausphotic.com',
            fullName: 'Jane Doe',
            avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jane',
            phone: '+91 98765 43210',
            isAdmin: false,
            preferences: {},
            createdAt: new Date().toISOString(),
          }
        ];
        localStorage.setItem('revive_mock_users', JSON.stringify(defaultUsers));
        setUsers(defaultUsers);
      }
    }
  }, []);

  const handleRoleToggle = (targetUser: User) => {
    if (currentUser && targetUser.id === currentUser.id) {
      alert('Security Warning: You cannot revoke your own Administrator privileges.');
      return;
    }

    const message = targetUser.isAdmin 
      ? `Are you sure you want to revoke Admin rights for ${targetUser.fullName}?`
      : `Are you sure you want to grant Admin privileges to ${targetUser.fullName}?`;

    if (confirm(message)) {
      const updatedList = users.map((u) => 
        u.id === targetUser.id ? { ...u, isAdmin: !u.isAdmin } : u
      );
      setUsers(updatedList);
      if (typeof window !== 'undefined') {
        localStorage.setItem('revive_mock_users', JSON.stringify(updatedList));
      }
    }
  };

  const filteredUsers = users.filter((u) => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Search Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-gold"
          />
        </div>
      </div>

      {/* Users table list */}
      <div className="glass rounded-2xl p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Joined Date</th>
                <th className="pb-3 font-semibold">Status / Role</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="text-text-primary hover:bg-bg-secondary/15 transition-colors">
                  <td className="py-3.5 flex items-center gap-3">
                    <img loading="lazy" decoding="async" src={u.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-border shrink-0" />
                    <div>
                      <p className="font-semibold">{u.fullName}</p>
                      <span className="text-[10px] text-text-secondary">{u.phone || 'No phone'}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-text-secondary font-mono">{u.email}</td>
                  <td className="py-3.5 text-text-secondary">
                    {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[9px] ${
                      u.isAdmin ? 'bg-accent-gold-light text-accent-gold' : 'bg-bg-secondary text-text-secondary'
                    }`}>
                      {u.isAdmin ? 'Administrator' : 'Customer'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleRoleToggle(u)}
                      className={`px-3 py-1.5 border rounded-lg font-medium transition-all ${
                        u.isAdmin 
                          ? 'border-error/20 hover:border-error text-error hover:bg-error/5'
                          : 'border-accent-gold/20 hover:border-accent-gold text-accent-gold hover:bg-accent-gold-light/20'
                      }`}
                    >
                      {u.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-text-secondary">
                    No users found matching query.
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
