import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import Calculator from './pages/Calculator';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import SignUp from './pages/SignUp';
import ThankYou from './pages/ThankYou';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import Messages from './pages/admin/Messages';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { TranslationProvider } from './contexts/TranslationContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'calculator', element: <Calculator /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:serviceId', element: <ServiceDetails /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'thank-you', element: <ThankYou /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'messages', element: <Messages /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationProvider>
      <RouterProvider router={router} />
    </TranslationProvider>
  </StrictMode>
);