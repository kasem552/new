import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useTranslation } from './hooks/useTranslation';
import { useAnalytics } from './hooks/useAnalytics';

export default function App() {
  const { dir } = useTranslation();
  useAnalytics(); // Track visitors

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}