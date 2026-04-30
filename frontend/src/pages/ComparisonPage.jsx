import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';

const ComparisonPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Default to Mumbai
  const [detecting, setDetecting] = useState(false);

  const detectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newPos);
          setMapCenter(newPos);
          setDetecting(false);
        },
        () => {
          alert("Unable to retrieve your location. Defaulting to Mumbai.");
          setDetecting(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setDetecting(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('Lipitor 20mg');
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      setSearchTerm(searchInput);
      setSearchInput('');
    }
  };

  return (
    <main className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto">
      {/* Hero Title Section */}
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-wider uppercase border border-primary/20">Live Price Tracking</span>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Updated 2 minutes ago
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 font-headline">
              {searchTerm.split(' ')[0]} <span className="text-primary">{searchTerm.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-body">
              Comparing current availability and pricing for <span className="text-slate-900 font-bold">{searchTerm}</span> across verified pharmaceutical providers in <span className="text-slate-900 font-bold">{userLocation ? 'your current location' : 'Mumbai Metro'}</span>.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">search</span>
              </span>
              <input 
                type="text" 
                placeholder="Compare another medicine..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-body text-sm shadow-sm"
              />
            </div>
            <button 
              onClick={detectLocation}
              className={`flex items-center justify-center gap-2 px-6 py-4 ${userLocation ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-primary text-white shadow-lg shadow-primary/20'} rounded-2xl font-bold transition-all active:scale-95 border hover:opacity-90 text-sm`}
            >
              <span className="material-symbols-outlined text-lg">{detecting ? 'sync' : 'my_location'}</span>
              {detecting ? 'Detecting...' : userLocation ? 'Location Detected' : 'Find My Location'}
            </button>
          </div>
        </div>
      </header>

      {/* Comparison Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Card 1: Cheapest */}
        <div className="relative bg-white rounded-[2rem] p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="absolute -top-4 left-8">
              <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 whitespace-nowrap">Cheapest</span>
            </div>
            <div className="mb-8 pt-2">
              <h3 className="text-2xl font-black text-slate-900 mb-1 font-headline">Apollo Pharmacy</h3>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                  <span className="material-symbols-outlined text-sm">star_half</span>
                </div>
                <span className="text-xs font-bold text-slate-400">4.2 (1.2k reviews)</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Unit Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 font-headline">₹145.00</span>
                  <span className="text-slate-400 font-bold text-sm">/ 10 tablets</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <span className="material-symbols-outlined text-lg">distance</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Distance</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">1.2 km</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <span className="material-symbols-outlined text-lg">inventory</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Stock</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">High</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50">
            <p className="text-sm text-slate-500 italic mb-6 font-body">"Requires valid prescription upload for home delivery."</p>
            <button className="w-full bg-primary hover:opacity-90 text-white font-black py-4 rounded-2xl transition-all active:scale-[0.98] font-headline shadow-lg shadow-primary/20">
              Select Apollo
            </button>
          </div>
        </div>

        {/* Card 2: Best Value (Featured) */}
        <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl shadow-primary/10 border-2 border-primary/10 lg:scale-105 z-10 flex flex-col justify-between min-h-[550px]">
          <div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <span className="material-symbols-outlined text-9xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div className="absolute -top-4 left-8">
              <span className="bg-gradient-to-r from-primary to-[#0048a8] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/30 whitespace-nowrap">Best Value</span>
            </div>
            <div className="mb-8 pt-2 relative z-10">
              <h3 className="text-3xl font-black text-slate-900 mb-1 font-headline">MedPlus Drugs</h3>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                </div>
                <span className="text-xs font-bold text-slate-400">4.9 (3.4k reviews)</span>
              </div>
            </div>
            <div className="space-y-8 relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Unit Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-900 font-headline">₹152.50</span>
                  <span className="text-slate-400 font-bold text-lg">/ 10 tablets</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <span className="material-symbols-outlined text-lg">near_me</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Distance</span>
                  </div>
                  <span className="text-xl font-black text-slate-900">2.5 km</span>
                </div>
                <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <span className="material-symbols-outlined text-lg">bolt</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Pickup</span>
                  </div>
                  <span className="text-xl font-black text-indigo-600">In 30m</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 relative z-10">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                <span className="text-sm font-bold">Verified stock availability</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                <span className="text-sm font-bold">Membership discount applied</span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-[#0048a8] hover:opacity-90 text-white font-black py-5 rounded-2xl transition-all active:scale-[0.98] font-headline shadow-lg shadow-primary/20">
              Proceed to Order
            </button>
          </div>
        </div>

        {/* Card 3: Nearest */}
        <div className="relative bg-white rounded-[2rem] p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="absolute -top-4 left-8">
              <span className="bg-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 whitespace-nowrap">Nearest</span>
            </div>
            <div className="mb-8 pt-2">
              <h3 className="text-2xl font-black text-slate-900 mb-1 font-headline">Wellness Forever</h3>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                  <span className="material-symbols-outlined text-sm">star_outline</span>
                </div>
                <span className="text-xs font-bold text-slate-400">3.8 (850 reviews)</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Unit Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 font-headline">₹188.00</span>
                  <span className="text-slate-400 font-bold">/ 10 tablets</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Distance</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">0.8 km</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <span className="material-symbols-outlined text-lg">warning</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Stock</span>
                  </div>
                  <span className="text-lg font-black text-amber-600">Limited</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50">
            <p className="text-sm text-slate-500 italic mb-6 font-body">"Convenient walking distance for immediate pickup."</p>
            <button className="w-full bg-slate-100 text-slate-900 font-black py-4 rounded-2xl transition-all active:scale-[0.98] hover:bg-slate-200 font-headline">
              View on Map
            </button>
          </div>
        </div>
      </div>

      {/* Map Visualization Section */}
      <section className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-headline tracking-tight">Geographic Availability</h2>
            <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">location_searching</span>
              Locating providers within your current delivery radius.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold transition-all hover:border-primary/30 shadow-sm">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Adjust Radius
            </button>
          </div>
        </div>
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100 p-2 bg-white">
          <MapComponent 
            pharmacies={[
              { id: 1, shopName: 'Apollo Pharmacy', coordinates: [72.8777, 19.0760], address: 'Bandra West, Mumbai', sellingPrice: 145 },
              { id: 2, shopName: 'MedPlus Drugs', coordinates: [72.8850, 19.0850], address: 'Andheri East, Mumbai', sellingPrice: 152.5 },
              { id: 3, shopName: 'Wellness Forever', coordinates: [72.8700, 19.0650], address: 'Juhu, Mumbai', sellingPrice: 188 }
            ]}
            center={mapCenter}
            zoom={13}
          />
        </div>
      </section>

      {/* Additional Insights Bento Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-on-surface mb-8 font-headline">Pharmacy Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-surface-container-low p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-4">trending_down</span>
              <h4 className="text-2xl font-bold mb-2 font-headline">Price Trend</h4>
              <p className="text-on-surface-variant font-body">Medicine prices have stabilized in the last 30 days. It's a favorable time to refill long-term supplies.</p>
            </div>
            <div className="mt-6 h-32 w-full bg-white/50 rounded-xl flex items-end p-4 gap-2">
              <div className="w-full bg-primary/20 h-[80%] rounded-t-sm"></div>
              <div className="w-full bg-primary/20 h-[75%] rounded-t-sm"></div>
              <div className="w-full bg-primary/20 h-[60%] rounded-t-sm"></div>
              <div className="w-full bg-primary/40 h-[55%] rounded-t-sm"></div>
              <div className="w-full bg-primary h-[45%] rounded-t-sm"></div>
            </div>
          </div>
          <div className="bg-primary p-8 rounded-3xl text-white flex flex-col justify-between">
            <span className="material-symbols-outlined text-4xl mb-4">medical_services</span>
            <div>
              <h4 className="text-xl font-bold mb-2 font-headline">Generic Alternative</h4>
              <p className="text-blue-100 text-sm mb-4 font-body">Generic equivalents are available for as low as ₹45.00.</p>
              <Link to="#" className="text-white font-bold flex items-center gap-2 hover:underline font-body">
                Compare Generics <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="bg-surface-container-highest p-8 rounded-3xl flex flex-col justify-between">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary">verified_user</span>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 font-headline">Trust Score</h4>
              <p className="text-on-surface-variant text-sm font-body">All pharmacies listed are verified by the CDSCO and State Licensing Authorities.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ComparisonPage;
