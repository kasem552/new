import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  Users, 
  BarChart2, 
  Settings,
  MessageSquare
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BarChart2, label: 'Analytics', path: '/admin/analytics' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#242b3d] min-h-screen border-r border-gray-700">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-gray-700/50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}