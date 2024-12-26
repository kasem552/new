import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useThemeStore } from '../../store/theme';

export default function AdminLayout() {
  const { theme } = useThemeStore();
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1a1f2e]'}`}>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className={theme === 'light' ? 'bg-white rounded-xl shadow-lg' : 'bg-[#242b3d] rounded-xl shadow-lg'}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}