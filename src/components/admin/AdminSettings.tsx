import React, { useState } from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { useThemeStore } from '../../store/theme';

interface Admin {
  id: string;
  email: string;
  password: string;
}

interface AdminSettingsProps {
  admins: Admin[];
  onDelete: (id: string) => void;
}

export default function AdminSettings({ admins, onDelete }: AdminSettingsProps) {
  const { theme } = useThemeStore();
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (adminId: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [adminId]: !prev[adminId]
    }));
  };

  return (
    <div className="space-y-3">
      {admins.map((admin) => (
        <div
          key={admin.id}
          className={`flex items-center justify-between p-4 rounded-xl border ${
            theme === 'light'
              ? 'bg-white border-gray-200'
              : 'bg-white/5 border-white/10'
          }`}
        >
          <div className="flex-1 space-y-1">
            <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
              {admin.email}
            </span>
            <div className="flex items-center gap-2">
              <input
                type={visiblePasswords[admin.id] ? 'text' : 'password'}
                value={admin.password}
                readOnly
                className={`bg-transparent border-none focus:outline-none ${
                  theme === 'light' ? 'text-gray-600' : 'text-white/70'
                }`}
              />
              <button
                onClick={() => togglePasswordVisibility(admin.id)}
                className={`p-1 hover:text-accent transition-colors ${
                  theme === 'light' ? 'text-gray-500' : 'text-white/50'
                }`}
              >
                {visiblePasswords[admin.id] ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={() => onDelete(admin.id)}
            className="p-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      {admins.length === 0 && (
        <div className={theme === 'light' ? 'text-gray-600' : 'text-white/70'}>
          No admins added yet
        </div>
      )}
    </div>
  );
}