import React, { useState } from 'react';
import { Save, RefreshCw, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { COLLECTIONS } from '../../lib/firebase/collections';
import { useAdminAccess } from '../../hooks/useAdminAccess';
import { useThemeStore } from '../../store/theme';
import AdminSettings from '../../components/admin/AdminSettings';

const accessSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AccessForm = z.infer<typeof accessSchema>;

export default function Settings() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { admins, loading } = useAdminAccess();
  const { theme, setTheme } = useThemeStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AccessForm>({
    resolver: zodResolver(accessSchema),
  });

  const onSubmit = async (data: AccessForm) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      await addDoc(collection(db, COLLECTIONS.ADMINS), {
        email: data.email,
        password: data.password,
        createdAt: new Date()
      });

      setSuccess(true);
      reset();
    } catch (err) {
      setError('Failed to add admin access. Please try again.');
      console.error('Error adding admin access:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (adminId: string) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.ADMINS, adminId));
      setSuccess(true);
    } catch (err) {
      setError('Failed to delete admin access. Please try again.');
      console.error('Error deleting admin access:', err);
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'light' | 'dark');
  };

  return (
    <div className={`space-y-8 ${theme === 'light' ? 'bg-white text-gray-900' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Settings
        </h2>
      </div>

      {/* Admin Access Management */}
      <div className={`${theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-white/10 border-white/20'} backdrop-blur-sm rounded-xl p-6 space-y-6 border`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Admin Access
          </h3>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-white/90'}`}>
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                  theme === 'light' 
                    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500' 
                    : 'bg-white/10 border-white/20 text-white placeholder-white/50'
                }`}
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-white/90'}`}>
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                  theme === 'light' 
                    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500' 
                    : 'bg-white/10 border-white/20 text-white placeholder-white/50'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Add Admin Access
          </button>
        </form>

        {/* Admin List */}
        <div className="mt-8">
          <h4 className={`text-md font-medium mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white/90'}`}>
            Current Admins
          </h4>
          {loading ? (
            <div className={theme === 'light' ? 'text-gray-600' : 'text-white/70'}>Loading...</div>
          ) : (
            <AdminSettings admins={admins} onDelete={handleDelete} />
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-400 text-center">Settings updated successfully!</p>
        )}
      </div>

      {/* Theme Settings */}
      <div className={`${theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-white/10 border-white/20'} backdrop-blur-sm rounded-xl p-6 space-y-6 border`}>
        <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Theme</h3>
        
        <div>
          <select
            value={theme}
            onChange={handleThemeChange}
            className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
              theme === 'light'
                ? 'bg-white border-gray-300 text-gray-900'
                : 'bg-white/10 border-white/20 text-white'
            }`}
          >
            <option value="light" className="text-gray-900 bg-white">Light</option>
            <option value="dark" className="text-gray-900 bg-white">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
}