import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ConsumerLayout = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* TopNavBar */}
      <Navbar fullWidth={true} />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ConsumerLayout;
