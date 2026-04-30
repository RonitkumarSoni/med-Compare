import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
