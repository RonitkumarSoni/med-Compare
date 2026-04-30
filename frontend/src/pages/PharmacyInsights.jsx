import React from 'react';
import { Link } from 'react-router-dom';

const PharmacyInsights = () => {
  const pharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy",
      location: "Jubilee Hills, Hyderabad",
      distance: "1.2 km",
      rating: 4.8,
      reviews: "2.4k",
      verified: true,
      openNow: true,
      specialty: "24/7 Service • Home Delivery",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYnIQ1jiCxsAivqgiwl9gT4GR5AZdwqGupICRl7hHU8xu8P3shgTOCzvc6XBPORv_LxmBfIabHG7SStFCHOxIb0hAgDGSs5AloHs7zvIRYfMgL3qA2esRaTyveN3e6xYkccVFwTaJk0p7I4nRJXIdN9XdZ1s5CKsFYz8uaIhh1c6R8RgAH-kPwMtyhxaUcs54C8lWZiCzgxXh9AJO-z641QkHs-S0bVO6As9M-yrEeniIOpoOhyJ3XasFQyEuvOQQGXzj-yARx_POB"
    },
    {
      id: 2,
      name: "MedPlus Drugs",
      location: "Indiranagar, Bengaluru",
      distance: "2.5 km",
      rating: 4.5,
      reviews: "1.8k",
      verified: true,
      openNow: true,
      specialty: "Generic Medicines • Health Screenings",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCng_Xm9npwzUsrtGxoozCHBCIyWubdn4FkpryWzOzDMDPWsdqUFQ4erMXLX2-sA8uqW9nwQSXLuF1hES5C2DWhFDN4ohvy8ZyNE6zklfO1WrDjAe4hCNOLKaCaWNoeewZbMnzuo0q4c7lYvLetq3TdahIXu9GrWwB_TBGPLBRS-TuSwKZJzZBcRIBLUKcKW3LYoNv60Tk_RheWabKaHvzjKGDtOaAVHy_LKFIsGsdxn9BUEDZZ7NVyo28hDOSQ9zoWAlHKvAGNf0sB"
    },
    {
      id: 3,
      name: "Wellness Forever",
      location: "Andheri West, Mumbai",
      distance: "0.8 km",
      rating: 4.9,
      reviews: "3.2k",
      verified: true,
      openNow: true,
      specialty: "Lifestyle Products • Wellness Clinic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBolRl0S5pHAsn6EI37Uj_zuJULFPF8JQZq9vJvnMTzA5dMJ6BC0jGhwSss8mWn8u9ERor82BnylTePvk2iltcMGgioWv0RCTed8RqHmT_6rgBj_O2yAvE-7G6hkBczevw2TkT2QQJeS8tvbMkUKfouvWi54Qh0k8f6vjebLEfzX-soSF9MZEun-4JMjg965VxloHCiDNayA5AmguCwwh-8CFODKL4fx9wQO3PGCN3zplMcAXDGJ7VdDfe0B-n6SUfIspKDCOMBsCGH"
    },
    {
      id: 4,
      name: "Noble Plus Rx",
      location: "Connaught Place, Delhi",
      distance: "3.1 km",
      rating: 4.6,
      reviews: "950",
      verified: true,
      openNow: false,
      specialty: "Rare Medicines • Surgical Supplies",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpwCc-dyFIYDyuR3jEW3FXL9j6zcSDtBo9kC2-NfmmgV7ujC6MMqll8tCGnvfG0hdAocr17Fi22IXzm8I7M6oVgiddQme8KU6AhKzOLpH9u5D0Lb6RZyNvlu_14ciCd6aatUBldU_Ydsc8Wq0D-rQKsINAGmMexEfvr1CzQw3tbprXfjbK8oGPabPmZdtUfpvNKiY6jV9h2BfUQZArqsAMYwMIKH5M4UgWGKJp5nhQbEBUPKkj_57pGgzDnhQbCyehzLVZ1i8LIA6D"
    }
  ];

  return (
    <main className="pt-32 pb-12 px-8 max-w-[1440px] mx-auto min-h-screen flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline font-extrabold text-4xl text-slate-900 leading-tight">Partner Pharmacies</h1>
          <p className="text-slate-500 font-bold mt-2 font-body">Showing {pharmacies.length} verified pharmacies near your current location</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined">filter_list</span>
            Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 font-bold hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[20px]">near_me</span>
            Map View
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        {pharmacies.map((pharmacy) => (
          <div key={pharmacy.id} className="med-card group flex flex-col h-full bg-white border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 rounded-3xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={pharmacy.image} 
                alt={pharmacy.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {pharmacy.verified && (
                  <span className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-[#0070f3] flex items-center gap-1.5 shadow-sm border border-white/50">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    VERIFIED
                  </span>
                )}
                {pharmacy.openNow ? (
                  <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-sm">OPEN NOW</span>
                ) : (
                  <span className="bg-slate-400 text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-sm">CLOSED</span>
                )}
              </div>
              <button className="absolute bottom-4 right-4 h-10 w-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-all shadow-lg active:scale-90">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-4">
              <div>
                <h3 className="font-headline font-bold text-xl text-slate-900 mb-1">{pharmacy.name}</h3>
                <p className="text-sm text-slate-500 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-slate-400">location_on</span>
                  {pharmacy.location}
                </p>
              </div>

              <div className="flex items-center gap-4 py-4 border-y border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Distance</span>
                  <span className="text-sm font-bold text-slate-700">{pharmacy.distance}</span>
                </div>
                <div className="h-8 w-px bg-slate-100"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-slate-900">{pharmacy.rating}</span>
                    <span className="text-[10px] text-slate-400 font-bold ml-0.5">({pharmacy.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <p className="text-xs font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">medical_services</span>
                  {pharmacy.specialty}
                </p>
              </div>

              <div className="mt-auto pt-2 flex gap-3">
                <Link to={`/pharmacies/${pharmacy.id}`} className="flex-1">
                  <button className="w-full py-3.5 bg-slate-50 text-slate-900 font-headline font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 active:scale-95">
                    Details
                  </button>
                </Link>
                <button className="flex-1 py-3.5 bg-primary text-white font-headline font-bold rounded-2xl shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Insights Section */}
      <section className="mt-16 bg-surface-container-low rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-black text-primary uppercase tracking-widest mb-4 block">Market Intelligence</span>
            <h2 className="font-headline text-4xl font-extrabold text-slate-900 leading-tight mb-6">Real-time Pharmacy <br />Network Connectivity</h2>
            <p className="text-slate-600 text-lg leading-relaxed font-body mb-10">
              MedCompare connects directly to pharmacy inventory management systems across India, ensuring that every price quote and stock status is 99.9% accurate and updated every 4.2 seconds.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-black text-primary font-headline mb-1">1,200+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Verified Partners</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary font-headline mb-1">₹14M</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Patient Savings</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] relative">
              <img 
                src="https://www.scalence.com/wp-content/uploads/2025/09/AdobeStock_1005872487-Insights-and-Reliability-National-Pharmacy-scaled-1.jpeg" 
                alt="Pharmacy Insights and Reliability" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
            {/* Floating Live Badge */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-bold text-slate-900 font-headline">Live Market Feed</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PharmacyInsights;
