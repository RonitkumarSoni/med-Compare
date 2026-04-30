import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
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
      <footer className="w-full py-16 border-t border-slate-100 bg-white">
        <div className="flex flex-col items-center justify-center gap-8 px-8 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full">
            <div className="flex gap-8 items-center">
              <span className="font-headline font-bold text-slate-900 text-2xl tracking-tight">MedCompare<span className="text-primary">.</span></span>
              <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>
              <div className="flex gap-6 flex-wrap justify-center">
                <Link to="/privacy" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold font-headline">Privacy</Link>
                <Link to="/terms" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold font-headline">Terms</Link>
                <Link to="/partner" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold font-headline">Partner</Link>
                <Link to="/contact" className="text-slate-500 hover:text-primary transition-colors text-sm font-semibold font-headline">Contact</Link>
              </div>
            </div>

            {/* Premium Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100 group shadow-sm">
                <i className="fa-brands fa-linkedin-in group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all border border-slate-100 group shadow-sm">
                <i className="fa-brands fa-x-twitter group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all border border-slate-100 group shadow-sm">
                <i className="fa-brands fa-instagram group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100 group shadow-sm">
                <i className="fa-brands fa-facebook-f group-hover:scale-110 transition-transform"></i>
              </a>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-100"></div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-headline">Atmospheric Trust in Healthcare</p>
            <p className="text-slate-500 text-sm leading-relaxed text-center font-body max-w-xl">
              © 2026 MedCompare. Empowering patients with transparent, real-time pricing data for a healthier tomorrow. Built with precision for the Indian Healthcare ecosystem.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsumerLayout;
