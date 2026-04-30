import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ErrorEmptyStates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/medicine-compare?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* TopNavBar */}
      <Navbar fullWidth={true} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 relative">
        {/* Abstract Background Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-tertiary-container/10 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Illustration Container */}
            <div className="relative w-full mb-12">
              <div className="grid grid-cols-12 gap-6 items-center">
                {/* Left Floating Element */}
                {/* Left Floating Element - Price Alert Card */}
                <div className="hidden lg:block col-span-3">
                  <div className="bg-white rounded-2xl p-5 card-elevated translate-y-8 border border-outline-variant/10" style={{ animation: 'float 6s ease-in-out infinite' }}>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-headline">Price Drop</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    </div>
                    {/* Drug Info */}
                    <p className="font-headline font-bold text-sm text-on-surface leading-tight">Lisinopril 20mg</p>
                    <p className="text-[10px] text-on-surface-variant font-body mt-0.5">30 Tablets • Generic</p>
                    {/* Price Row */}
                    <div className="flex items-end justify-between mt-3 pt-3 border-t border-outline-variant/10">
                      <div>
                        <p className="text-[9px] text-on-surface-variant/60 font-body uppercase tracking-wider">Best Price</p>
                        <p className="text-lg font-extrabold text-primary font-headline leading-none mt-0.5">$8.42</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 rounded-full">
                        <span className="material-symbols-outlined text-secondary text-xs">arrow_downward</span>
                        <span className="text-[10px] font-bold text-secondary font-headline">-32%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main 404 Visual - CSS-based healthcare illustration */}
                <div className="col-span-12 lg:col-span-6 relative">
                  <div className="relative z-10 flex flex-col items-center">
                    {/* 404 Number with medical cross overlay */}
                    <div className="relative">
                      <span className="font-headline font-extrabold text-[8rem] md:text-[10rem] leading-none tracking-tighter text-surface-container-high/60 select-none">
                        404
                      </span>
                      {/* Medical icon overlay in the "0" */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Pulsing ring */}
                          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary/20 flex items-center justify-center" style={{ animation: 'pulse-ring 3s ease-in-out infinite' }}>
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl shadow-primary/30">
                              <span className="material-symbols-outlined text-white text-4xl md:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                search_off
                              </span>
                            </div>
                          </div>
                          {/* Floating particles */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-tertiary-fixed rounded-full" style={{ animation: 'float 4s ease-in-out infinite' }}></div>
                          <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-primary-fixed rounded-full" style={{ animation: 'float 5s ease-in-out infinite reverse' }}></div>
                          <div className="absolute top-1/2 -right-6 w-2 h-2 bg-secondary-container rounded-full" style={{ animation: 'float 3s ease-in-out infinite' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Floating Element - Rx Status Card */}
                <div className="hidden lg:block col-span-3">
                  <div className="bg-white rounded-2xl p-5 card-elevated -translate-y-4 border border-outline-variant/10" style={{ animation: 'float 5s ease-in-out infinite reverse' }}>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-tertiary/15 to-tertiary/5 flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>clinical_notes</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary font-headline">Rx Status</span>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    {/* Status Items */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center">
                          <span className="material-symbols-outlined text-secondary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                        </div>
                        <span className="text-xs font-body text-on-surface font-medium">Verified by Pharmacy</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center">
                          <span className="material-symbols-outlined text-secondary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                        </div>
                        <span className="text-xs font-body text-on-surface font-medium">Insurance Applied</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-xs animate-spin" style={{ fontVariationSettings: "'FILL' 0", animationDuration: '3s' }}>progress_activity</span>
                        </div>
                        <span className="text-xs font-body text-on-surface-variant">Ready for Pickup</span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-4 pt-3 border-t border-outline-variant/10">
                      <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                      </div>
                      <p className="text-[9px] text-on-surface-variant/60 font-body mt-1.5 text-right">2 of 3 steps complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <span className="inline-flex items-center px-4 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold tracking-widest uppercase font-headline">
                  Diagnosis: Missing Page
                </span>
                <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">
                  Lost in the Clinic?
                </h1>
              </div>
              <p className="text-base text-on-surface-variant font-body leading-relaxed max-w-lg mx-auto">
                The prescription for this page was never filled. It seems the information you're looking for has moved or vanished into thin air.
              </p>
              
              {/* Search Suggestion - Premium Refined */}
              <div className="relative group max-w-xl mx-auto mt-12">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-[2rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative flex items-center">
                  <span className="absolute left-6 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors duration-300">search</span>
                  <input 
                    className="w-full pl-14 pr-24 py-5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all duration-300 text-slate-800 placeholder:text-slate-400 text-base shadow-sm outline-none font-body" 
                    placeholder="Search for medications or pharmacies..." 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <div className="absolute right-4 flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-[14px]">keyboard_command_key</span>
                    <span>K</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 font-headline">
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-sm"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Return to Dashboard
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-container-lowest text-on-surface font-bold rounded-xl border border-outline-variant/30 hover:bg-surface-container-low hover:border-primary/20 active:scale-95 transition-all card-shadow text-sm"
                >
                  <span className="material-symbols-outlined text-lg">support_agent</span>
                  Visit Support Center
                </Link>
              </div>
            </div>

            {/* Helpful Links Bento */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
              {[
                { icon: 'medication', title: 'Medication Finder', desc: 'Browse our database of prescription and over-the-counter drugs.' },
                { icon: 'local_pharmacy', title: 'Partner Network', desc: 'Find local pharmacies offering the best prices near you.' },
                { icon: 'help_center', title: 'Help Center', desc: 'Get answers to frequently asked questions about healthcare data.' }
              ].map((link, i) => (
                <div key={i} className="p-8 rounded-2xl bg-surface-container-low border border-transparent hover:border-outline-variant/30 transition-all group cursor-pointer hover:bg-surface-container-lowest hover:card-shadow-hover">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary mb-6 card-shadow group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{link.icon}</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl mb-2">{link.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-body">{link.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-slate-100 bg-slate-50">
        <div className="flex flex-col items-center justify-center gap-6 px-8 max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center gap-2">
            <span className="font-headline font-bold text-slate-900 text-xl">MedCompare</span>
            <p className="text-slate-500 font-body text-sm leading-relaxed text-center">© 2024 MedCompare. Atmospheric Trust in Healthcare.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/privacy" className="text-slate-500 hover:text-blue-500 transition-colors font-body text-sm">Privacy Policy</Link>
            <a className="text-slate-500 hover:text-blue-500 transition-colors font-body text-sm" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-blue-500 transition-colors font-body text-sm" href="#">Partner with Us</a>
            <Link to="/contact" className="text-slate-500 hover:text-blue-500 transition-colors font-body text-sm">Contact</Link>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer hover:bg-primary-container hover:text-white transition-all">
              <span className="material-symbols-outlined text-lg">share</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer hover:bg-primary-container hover:text-white transition-all">
              <span className="material-symbols-outlined text-lg">public</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }
      `}</style>
    </main>
  );
};

export default ErrorEmptyStates;
