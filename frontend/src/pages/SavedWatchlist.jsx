import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const SavedWatchlist = () => {
  const [watchlist] = useState([
    {
      id: 1,
      name: 'Lipitor 20mg',
      genericName: 'Atorvastatin Calcium • 30 Tablets • Generic Equivalent Available',
      image: '/images/medicines/tablets.png',
      tags: ['Prescription Required', '↓ 12% Price Drop'],
      lowestPrice: 42.50,
      targetPharmacy: 'CVS Health Watchpoint',
      targetPrice: 44.99,
      pharmacy: {
        name: 'Rite Aid Pharmacy',
        location: 'Downtown Medical Plaza • 0.4 miles away',
        avgWaitTime: '16 mins',
        lastChecked: '2 mins ago',
      },
    },
    {
      id: 2,
      name: 'Ventolin HFA',
      genericName: 'Albuterol Sulfate • 90mcg Inhaler',
      image: '/images/medicines/bottle.png',
      tags: ['Back In Stock'],
      delivery: 'Free Next-Day',
      deliverySource: 'Via MedExpress',
      copay: 15.00,
      insurance: 'With ICICI Insurance',
      pharmacy: {
        name: 'HealthFirst Meds',
        subtitle: 'Telehealth & Delivery Specials',
        image: '/images/medicines/bottle.png',
        rating: 4.8,
        reviews: '1.4k',
        hasActiveOffers: true,
      },
    },
  ]);

  return (
    <main className="pt-28 pb-24 px-4 md:px-8 max-w-[1440px] mx-auto min-h-screen">
      <SEO title="Your Watchlist" description="Track medicine prices and availability." />

      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-1.5 block font-headline">Atmospheric Trust</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 font-headline">Your Watchlist</h1>
          <p className="text-base text-slate-500 font-body max-w-2xl leading-relaxed">
            Personalized monitoring for your essential healthcare needs. We track price volatility and availability across 1,200+ verified partner pharmacies.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/20 hover:text-primary transition-all active:scale-95 text-sm font-bold text-slate-600">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-[#0048a8] transition-all active:scale-95 text-sm font-bold">
            <span className="material-symbols-outlined text-lg">add</span>
            Add New Item
          </button>
        </div>
      </header>

      {/* ========== ROW 1: Medicine Card (8col) + Pharmacy Card (4col) ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Medicine Card — Lipitor */}
        <div className="lg:col-span-8 relative bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300">
          <button className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Image */}
            <div className="w-full sm:w-44 h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 shrink-0 border border-slate-100">
              <img alt="Lipitor 20mg" className="w-full h-full object-cover" src="/images/medicines/tablets.png" />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                  Prescription Required
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">trending_down</span>
                  ↓ 12% Price Drop
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 font-headline tracking-tight">Lipitor 20mg</h3>
              <p className="text-sm text-slate-500 font-body mb-5">Atorvastatin Calcium • 30 Tablets • Generic Equivalent Available</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lowest Market Price</p>
                  <p className="text-2xl font-black text-primary font-headline">₹42.50</p>
                </div>
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                  <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1">CVS Health Watchpoint</p>
                  <p className="text-2xl font-black text-slate-900 font-headline">₹44.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Sidebar Card — Rite Aid */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Set Up Alert</span>
          </div>
          <h4 className="font-headline font-extrabold text-lg text-slate-900 mb-0.5">Rite Aid Pharmacy</h4>
          <p className="text-xs text-slate-400 font-medium mb-5">Downtown Medical Plaza • 0.4 miles away</p>
          <div className="space-y-3 mb-5 flex-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Avg. Wait Time</span>
              <span className="font-bold text-slate-700">16 mins</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Last Checked</span>
              <span className="font-bold text-slate-700">2 mins ago</span>
            </div>
          </div>
          <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:border-primary/30 hover:text-primary transition-all text-sm active:scale-95">
            Call Pharmacy
          </button>
        </div>
      </div>

      {/* ========== ROW 2: Pharmacy Image Card (4col) + Medicine Card (8col) ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 relative">
        {/* Pharmacy Image Card — HealthFirst Meds */}
        <div className="lg:col-span-4 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300">
          <div className="h-44 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 relative overflow-hidden">
            <img src="/images/medicines/bottle.png" alt="HealthFirst Meds" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black text-primary uppercase tracking-widest border border-white/50 shadow-sm">
              Partner Network
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-headline font-bold text-base text-slate-900 mb-0.5">HealthFirst Meds</h4>
            <p className="text-xs text-slate-400 font-medium mb-3">Telehealth & Delivery Specials</p>
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined text-xs text-amber-400"
                  style={{ fontVariationSettings: i <= 4 ? "'FILL' 1" : "'FILL' 0" }}>star</span>
              ))}
              <span className="text-xs text-slate-500 font-medium ml-1">4.8 (1.4k reviews)</span>
            </div>
            <Link to="/pharmacies" className="block w-full py-3 bg-primary text-white text-center font-bold rounded-xl shadow-md shadow-primary/10 hover:bg-[#0048a8] transition-all text-sm active:scale-95">
              View Active Offers
            </Link>
          </div>
        </div>

        {/* Medicine Card — Ventolin HFA */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden border border-slate-100 shrink-0">
                <img alt="Ventolin HFA" className="w-full h-full object-cover" src="/images/medicines/bottle.png" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-headline">Ventolin HFA</h3>
                <p className="text-sm text-slate-500 font-body">Albuterol Sulfate • 90mcg Inhaler</p>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border border-emerald-100">Back In Stock</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery</span>
              </div>
              <p className="text-base font-extrabold text-slate-900 font-headline">Free Next-Day</p>
              <p className="text-xs text-slate-400 font-medium">Via MedExpress</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Co-Pay Est.</span>
              </div>
              <p className="text-base font-extrabold text-slate-900 font-headline">₹15.00</p>
              <p className="text-xs text-slate-400 font-medium">With ICICI Insurance</p>
            </div>
            <Link to="/medicine-compare?q=Ventolin" className="p-4 bg-primary text-white rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#0048a8] transition-colors group">
              <p className="text-center font-bold text-sm font-headline">Compare 12 More Pharmacies</p>
              <span className="material-symbols-outlined text-lg mt-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* FAB + Button near pharmacy card */}
        <div className="absolute -right-2 bottom-1/2 translate-y-1/2 lg:static lg:col-span-0 hidden">
          {/* This is positioned via the fixed FAB below */}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-14 text-center">
        <p className="text-slate-500 font-medium mb-4 font-body text-sm">Showing 4 of 4 items in your watchlist</p>
        <div className="flex justify-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all">
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold font-headline shadow-lg shadow-primary/20 text-sm">1</div>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all">
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>

    </main>
  );
};

export default SavedWatchlist;
