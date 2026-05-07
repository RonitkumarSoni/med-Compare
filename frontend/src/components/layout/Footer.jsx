import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-16 border-t border-slate-100 bg-white mt-auto">
      <div className="flex flex-col items-center justify-center gap-8 px-8 max-w-[1440px] mx-auto">
        <span className="font-headline font-bold text-slate-900 text-3xl tracking-tight">MedCompare<span className="text-primary">.</span></span>
        
        <div className="flex flex-wrap justify-center gap-8 text-sm font-headline font-semibold">
          <Link to="/privacy" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-slate-500 hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/partner" className="text-slate-500 hover:text-primary transition-colors">Partner with Us</Link>
          <Link to="/contact" className="text-slate-500 hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="w-24 h-1 bg-slate-100 rounded-full"></div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-headline">Atmospheric Trust in Healthcare</p>
          <p className="text-slate-500 text-sm leading-relaxed text-center max-w-xl font-body">
            © 2026 MedCompare. Empowering patients with transparency and clinical precision. Built for the future of Indian Healthcare.
          </p>
        </div>

        {/* Premium Social Links */}
        <div className="flex gap-4">
          <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100 group shadow-sm">
            <i className="fa-brands fa-linkedin-in text-lg group-hover:scale-110 transition-transform"></i>
          </a>
          <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all border border-slate-100 group shadow-sm">
            <i className="fa-brands fa-x-twitter text-lg group-hover:scale-110 transition-transform"></i>
          </a>
          <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all border border-slate-100 group shadow-sm">
            <i className="fa-brands fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
          </a>
          <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100 group shadow-sm">
            <i className="fa-brands fa-facebook-f text-lg group-hover:scale-110 transition-transform"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
