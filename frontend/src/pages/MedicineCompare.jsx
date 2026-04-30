import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';

import { getProfessionalMedicineImage } from '../utils/medicineUtils';

const StarRating = ({ rating = 4.5 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} className="material-symbols-outlined text-sm text-amber-400"
        style={{ fontVariationSettings: i <= Math.floor(rating) ? "'FILL' 1" : "'FILL' 0" }}>
        {i <= rating ? 'star' : i - 0.5 <= rating ? 'star_half' : 'star'}
      </span>
    ))}
    <span className="text-xs text-slate-400 font-bold ml-1">{rating}</span>
  </div>
);

const MedicineCompare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('search') || searchParams.get('q') || '';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchInput, setSearchInput] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredListings, setFilteredListings] = useState([]);

  const listings = data?.data?.listings || [];
  const insights = data?.data?.insights || null;

  const applyFilters = () => {
    let filtered = [...listings];
    if (minRating > 0) {
      filtered = filtered.filter(item => (item.pharmacies?.rating || 0) >= minRating);
    }
    if (inStockOnly) {
      filtered = filtered.filter(item => (item.available_quantity || item.availableQuantity) > 0);
    }
    filtered = filtered.filter(item => (item.selling_price || item.sellingPrice) <= maxPrice);
    setFilteredListings(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [listings, minRating, inStockOnly, maxPrice]);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await API.get(`/medicines/compare?name=${encodeURIComponent(query)}`);
        if (!cancelled) setData(response.data);
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message || 'Something went wrong');
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchResults();
    return () => { cancelled = true; };
  }, [query]);

  const handleEmptySearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/medicine-compare?q=${encodeURIComponent(searchInput)}`);
    }
  };

  // Premium empty / no-query state
  if (!query) {
    return (
      <main className="pt-24 pb-20 px-4 md:px-8 max-w-[1440px] mx-auto min-h-screen">
        <SEO title="Compare Medicines" description="Search and compare medicine prices across pharmacies." />
        
        {/* Hero Section */}
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0055c9] via-[#1a6fe8] to-[#3d8bff] px-6 md:px-16 py-16 md:py-24 mb-12 shadow-2xl shadow-primary/20">
          {/* Floating decorative elements */}
          <div className="absolute top-8 right-12 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center rotate-12 animate-pulse">
            <span className="material-symbols-outlined text-3xl text-white/60" style={{ fontVariationSettings: "'FILL' 1" }}>medication</span>
          </div>
          <div className="absolute bottom-12 right-32 w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center -rotate-6" style={{ animation: 'pulse 3s ease-in-out infinite 0.5s' }}>
            <span className="material-symbols-outlined text-xl text-white/50" style={{ fontVariationSettings: "'FILL' 1" }}>local_pharmacy</span>
          </div>
          <div className="absolute top-20 right-64 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center rotate-45" style={{ animation: 'pulse 4s ease-in-out infinite 1s' }}>
            <span className="material-symbols-outlined text-lg text-white/30" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-white/5"></div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Live Price Tracking
            </span>
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-white mb-4 tracking-tight leading-tight">
              Compare Medicine<br />Prices Instantly
            </h1>
            <p className="text-lg text-blue-100/80 font-body mb-10 leading-relaxed max-w-lg">
              Search across 1,200+ verified pharmacies to find the best prices, availability, and discounts for your medications.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg group">
              <span className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">search</span>
              </span>
              <input
                className="pl-14 pr-32 py-5 bg-white border-0 rounded-2xl w-full text-base focus:ring-4 focus:ring-white/20 transition-all outline-none font-body placeholder:text-slate-400 shadow-2xl shadow-black/10"
                placeholder="Search medicines (e.g. Paracetamol)..."
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleEmptySearch}
                autoFocus
              />
              <button
                onClick={() => searchInput.trim() && navigate(`/medicine-compare?q=${encodeURIComponent(searchInput)}`)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:bg-[#0048a8] transition-all active:scale-95">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: 'local_pharmacy', label: 'Pharmacies', value: '1,200+', color: 'text-primary bg-primary/5' },
            { icon: 'medication', label: 'Medicines', value: '2,000+', color: 'text-emerald-600 bg-emerald-50' },
            { icon: 'trending_down', label: 'Avg. Savings', value: '15%', color: 'text-amber-600 bg-amber-50' },
            { icon: 'verified', label: 'Verified', value: '100%', color: 'text-indigo-600 bg-indigo-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 font-headline">{s.value}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Searches */}
        <div className="mb-8">
          <h2 className="font-headline font-extrabold text-2xl text-slate-900 mb-6">Popular Searches</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: 'Paracetamol', icon: 'medication', desc: 'Pain & Fever' },
              { name: 'Augmentin', icon: 'vaccines', desc: 'Antibiotic' },
              { name: 'Azithromycin', icon: 'medication', desc: 'Antibiotic' },
              { name: 'Amoxicillin', icon: 'medication', desc: 'Antibiotic' },
              { name: 'Cetirizine', icon: 'allergy', desc: 'Allergy Relief' },
            ].map(s => (
              <Link key={s.name} to={`/medicine-compare?q=${s.name}`}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all group cursor-pointer">
                <span className="material-symbols-outlined text-2xl text-primary/60 group-hover:text-primary transition-colors mb-3 block" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                <p className="font-bold text-slate-900 text-sm mb-0.5">{s.name}</p>
                <p className="text-xs text-slate-400 font-medium">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (loading && !query) {
    return (
      <div className="pt-32 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Scanning local pharmacies...</p>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-12 px-4 md:px-8 max-w-[1440px] mx-auto min-h-screen flex flex-col lg:flex-row gap-8">
      <SEO title={`Compare ${query}`} description={`Find the best prices for ${query} across local pharmacies.`} />

      {/* Filters Panel — Functional Version */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-6 sticky top-28 self-start">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <h2 className="font-headline font-extrabold text-lg text-slate-900">Filters</h2>

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <label className="font-headline font-bold text-[11px] text-slate-400 uppercase tracking-widest">Price Range</label>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Max ₹</span>
                <input 
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="bg-transparent border-none outline-none text-sm font-extrabold text-slate-800 w-full"
                  placeholder="750"
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="flex flex-col gap-3">
            <label className="font-headline font-bold text-[11px] text-slate-400 uppercase tracking-widest">Min. Rating</label>
            <div className="flex flex-col gap-2">
              {[4.5, 4.0].map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="rating" 
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                    className="accent-primary w-3.5 h-3.5" 
                  />
                  <span className={`text-sm group-hover:text-primary transition-colors font-medium ${minRating === r ? 'text-primary' : 'text-slate-600'}`}>{r}+</span>
                  <div className="flex text-amber-400 ml-1">
                    {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                  </div>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="rating" 
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                  className="accent-primary w-3.5 h-3.5" 
                />
                <span className={`text-sm group-hover:text-primary transition-colors font-medium ${minRating === 0 ? 'text-primary' : 'text-slate-600'}`}>Any Rating</span>
              </label>
            </div>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-3">
            <label className="font-headline font-bold text-[11px] text-slate-400 uppercase tracking-widest">Availability</label>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-primary w-4 h-4 rounded" 
              />
              <span className={`text-sm group-hover:text-primary transition-colors font-medium ${inStockOnly ? 'text-primary' : 'text-slate-600'}`}>In Stock Only</span>
            </label>
          </div>

          <button 
            onClick={applyFilters}
            className="w-full py-3.5 bg-primary text-white font-headline font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all text-sm hover:bg-[#0048a8]"
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Main Results */}
      <section className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            {loading ? (
              <>
                <span className="block h-10 w-72 bg-slate-200 animate-pulse rounded-xl mb-2"></span>
                <span className="block h-4 w-52 bg-slate-100 animate-pulse rounded-lg"></span>
              </>
            ) : (
              <>
                <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
                  {query} <span className="text-primary">Results</span>
                </h1>
                <p className="text-slate-500 font-medium mt-1 font-body">
                  Showing <span className="font-bold text-slate-700">{filteredListings.length}</span> pharmacies near your location
                </p>
              </>
            )}
          </div>
          {/* Grid / List Toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'}`}>
              <span className="material-symbols-outlined text-lg">grid_view</span> Grid
            </button>
            <button onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'}`}>
              <span className="material-symbols-outlined text-lg">view_list</span> List
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-sm font-medium flex items-center gap-3">
            <span className="material-symbols-outlined text-red-500">error</span>{error}
          </div>
        )}

        {/* Results Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-5 border border-slate-100 flex flex-col gap-4 animate-pulse">
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl"></div>
                <div className="space-y-2 px-1">
                  <Skeleton variant="title" className="w-40" />
                  <Skeleton variant="text" className="w-28" />
                  <div className="flex justify-between mt-3 pt-3 border-t border-slate-50">
                    <Skeleton variant="text" className="w-16" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ))
          ) : filteredListings.map((item, idx) => {
            const pharmacy = item.pharmacies;
            const inStock = (item.available_quantity || item.availableQuantity) > 0;
            const isCheapest = item.id === insights?.cheapestId;
            const isBestValue = item.id === insights?.bestValueId && !isCheapest;
            const discount = item.discount_percentage || item.discountPercentage || 0;
            const imgSrc = getProfessionalMedicineImage(item);

            if (viewMode === 'list') {
              return (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-5 items-center group hover:shadow-md hover:border-primary/10 transition-all">
                  <div className="w-28 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 shrink-0 relative">
                    <img 
                      src={imgSrc} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {isCheapest && <span className="absolute top-1.5 left-1.5 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full">CHEAPEST</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline font-bold text-lg text-slate-900 truncate">{item.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{pharmacy?.shop_name || 'Local Pharmacy'}</p>
                    <StarRating rating={pharmacy?.rating || 4.5} />
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black text-primary font-headline">₹{(item.selling_price || item.sellingPrice)?.toFixed(2)}</span>
                    {discount > 0 && <span className="block text-xs font-bold text-emerald-600">{discount}% OFF</span>}
                  </div>
                  <Link to={`/pharmacies/${item.pharmacy_id}`}>
                    <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-[#0048a8] transition-all active:scale-95 shrink-0">Select</button>
                  </Link>
                </div>
              );
            }

            return (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg hover:border-primary/10 transition-all duration-300 flex flex-col relative">
                {/* Badges */}
                {isCheapest && (
                  <div className="absolute top-4 right-4 z-20 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
                    CHEAPEST
                  </div>
                )}
                {isBestValue && (
                  <div className="absolute top-4 right-4 z-20 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg shadow-primary/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    BEST VALUE
                  </div>
                )}
                {discount > 15 && !isCheapest && !isBestValue && (
                  <div className="absolute top-4 right-4 z-20 bg-amber-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">
                    SAVINGS: {discount}%
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-black text-primary flex items-center gap-1 shadow-sm border border-white/50">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="font-headline font-bold text-base text-slate-900 tracking-tight leading-snug">{item.name}</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5 truncate">{pharmacy?.shop_name || 'Local Pharmacy'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xl font-black text-primary font-headline leading-none">₹{(item.selling_price || item.sellingPrice)?.toFixed(2)}</span>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Market Price</span>
                    </div>
                  </div>

                  <StarRating rating={pharmacy?.rating || 4.5} />

                  {/* Info Row */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-semibold mt-1 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-slate-400">event</span>
                      Exp: {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                      <span className={inStock ? 'text-emerald-600' : 'text-red-500'}>{inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                    {discount > 0 && (
                      <span className="ml-auto text-emerald-600 font-bold">{discount}% OFF</span>
                    )}
                  </div>

                  <Link to={`/pharmacies/${item.pharmacy_id}`} className="w-full mt-auto pt-2">
                    <button className="w-full py-3 bg-primary text-white font-headline font-bold rounded-xl shadow-md shadow-primary/10 hover:bg-[#0048a8] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-[0.98] text-sm">
                      Select Pharmacy
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Premium Empty State */}
          {!loading && listings.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-8 rounded-[2.5rem] bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
                <span className="material-symbols-outlined text-6xl text-primary/30 relative z-10" style={{ fontVariationSettings: "'FILL' 1, 'wght' 200" }}>search_off</span>
              </div>
              <span className="px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-amber-100">
                No matches found
              </span>
              <h3 className="font-headline text-2xl font-extrabold text-slate-900 mb-3">
                No results for "<span className="text-primary">{query}</span>"
              </h3>
              <p className="text-slate-500 font-body text-base max-w-md leading-relaxed mb-8">
                We couldn't find any medicines matching your search. Try a different name, check the spelling, or browse our popular categories below.
              </p>
              <div className="flex items-center gap-3 flex-wrap justify-center mb-12">
                {['Paracetamol', 'Amoxicillin', 'Cetirizine', 'Azithromycin'].map(s => (
                  <Link key={s} to={`/medicine-compare?q=${s}`}
                    className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all shadow-sm">
                    {s}
                  </Link>
                ))}
              </div>

              {/* Action Card */}
              <div className="w-full max-w-2xl bg-gradient-to-r from-primary to-[#0048a8] rounded-3xl p-8 text-left relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute right-[-20px] top-[-20px] opacity-10">
                  <span className="material-symbols-outlined text-[150px]" style={{ fontVariationSettings: "'wght' 100" }}>medication</span>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-sm">
                    <h4 className="text-xl font-bold text-white mb-2">Can't find your medicine?</h4>
                    <p className="text-blue-100 text-sm leading-relaxed">Upload your prescription and we'll help you find it across all local pharmacies in Mumbai.</p>
                  </div>
                  <button className="whitespace-nowrap px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
                    <span className="material-symbols-outlined">upload_file</span>
                    Upload Prescription
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Load More */}
        {!loading && listings.length > 0 && (
          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-primary/30 hover:text-primary transition-all shadow-sm">
              Load More Results
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default MedicineCompare;
