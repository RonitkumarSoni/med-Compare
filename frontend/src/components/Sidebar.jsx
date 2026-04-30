import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const location = useLocation();

  const topMenuItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'inventory_2', label: 'Inventory', path: '/inventory' },
    { icon: 'analytics', label: 'Analytics', path: '/analytics' },
    { icon: 'chat_bubble', label: 'Inquiries', path: '/inquiries' },
    { icon: 'notifications', label: 'Notifications', path: '/notifications' },
  ];

  const bottomMenuItems = [
    { icon: 'person', label: 'Profile', path: '/profile' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-slate-50 border-r border-transparent sticky top-0 p-4 gap-2 z-40 pt-24">
      <nav className="flex flex-col gap-1 flex-1">
        {topMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 font-headline font-semibold text-sm transition-transform duration-200 active:scale-[0.98] rounded-lg",
                isActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:translate-x-1"
              )}
            >
              <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className="h-px bg-slate-200 my-4 mx-4"></div>
        {bottomMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 font-headline font-semibold text-sm transition-transform duration-200 active:scale-[0.98] rounded-lg",
                isActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:translate-x-1"
              )}
            >
              <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <Link
          to="/add-medicine"
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold font-headline flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform text-sm"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add Medicine</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
