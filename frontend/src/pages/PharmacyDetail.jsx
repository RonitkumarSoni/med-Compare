import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../api/api';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';

const getDosageImg = (dosageForm, name) => {
  const form = (dosageForm || '').toLowerCase();
  const itemName = (name || '').toLowerCase();
  
  if (form.includes('tablet') || form.includes('capsule') || form.includes('strip') || itemName.includes('tablet')) 
    return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400';
  if (form.includes('bottle') || form.includes('syrup') || form.includes('liquid') || form.includes('suspension') || itemName.includes('syrup')) 
    return 'https://images.unsplash.com/photo-1550572017-ed200277c639?q=80&w=400';
  if (form.includes('injection') || form.includes('vial') || form.includes('ampoule') || itemName.includes('injection')) 
    return 'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=400';
  if (form.includes('inhaler') || itemName.includes('inhaler')) 
    return 'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=400';
  if (form.includes('ointment') || form.includes('cream') || form.includes('gel') || itemName.includes('cream')) 
    return 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400';
  
  return 'https://images.unsplash.com/photo-1550572017-ed200277c639?q=80&w=400'; // Default bottle
};

const PharmacyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Request user location on mount for directions
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (err) => console.log("Location access denied")
      );
    }
  }, []);

  const handleGetDirections = () => {
    if (!pharmacy) return;
    
    // Use coordinates if available, otherwise fallback to address
    const dest = (pharmacy.latitude && pharmacy.longitude) 
      ? `${pharmacy.latitude},${pharmacy.longitude}`
      : encodeURIComponent(`${pharmacy.shop_name} ${pharmacy.shop_address} ${pharmacy.city}`);
    
    const origin = userLocation ? `${userLocation.lat},${userLocation.lon}` : '';
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
    
    window.open(url, '_blank');
  };

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pharmRes, medRes] = await Promise.all([
          API.get(`/pharmacies/${id}`),
          API.get(`/medicines?pharmacyId=${id}&limit=100`),
        ]);
        if (!cancelled) {
          setPharmacy(pharmRes.data.data);
          setMedicines(medRes.data.data || []);
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load pharmacy');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">
        <Skeleton className="h-8 w-40 rounded-lg mb-6" />
        <Skeleton className="h-12 w-96 rounded-xl mb-4" />
        <Skeleton className="h-6 w-72 rounded-lg mb-10" />
        <Skeleton className="h-80 w-full rounded-3xl mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
      </main>
    );
  }

  if (error || !pharmacy) {
    return (
      <main className="pt-32 pb-20 px-8 max-w-6xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-red-300 mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          <h2 className="font-headline text-2xl font-bold text-slate-900 mb-2">Pharmacy not found</h2>
          <p className="text-slate-500 mb-6">{error || "The pharmacy you're looking for doesn't exist."}</p>
          <button onClick={() => navigate(-1)} className="px-6 py-3 bg-primary text-white rounded-xl font-bold">Go Back</button>
        </div>
      </main>
    );
  }

  const verified = pharmacy.verification_status === 'verified';

  return (
    <main className="pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto min-h-screen space-y-10">
      <SEO title={pharmacy.shop_name} description={`View details for ${pharmacy.shop_name}`} />

      {/* Back + Header */}
      <div>
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Results
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight">{pharmacy.shop_name}</h1>
              {verified && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full flex items-center gap-1.5 border border-emerald-100">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-slate-500 text-sm font-medium flex-wrap">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="material-symbols-outlined text-sm text-amber-400"
                    style={{ fontVariationSettings: i <= Math.floor(pharmacy.rating || 4.5) ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                ))}
                <span className="ml-1 font-bold text-slate-700">{pharmacy.rating || 4.5}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{pharmacy.city}, {pharmacy.state}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:${pharmacy.contact_number}`} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-primary/30 hover:text-primary transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg">call</span> Call
            </a>
            <button 
              onClick={handleGetDirections}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-[#0048a8] transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg">navigation</span> Directions
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/50 shadow-lg group">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1200" 
          alt={pharmacy.shop_name}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent"></div>

        {/* Decorative Map Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        {/* Status Badge */}
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
            <span className="text-xs font-black uppercase tracking-widest text-primary">Open Now</span>
          </div>
          <p className="text-sm font-bold text-slate-700 font-body">Currently serving patients</p>
        </div>

        {/* Bottom Left Info (Optional for premium feel) */}
        <div className="absolute bottom-8 left-8 text-white z-10">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-2">
            <span>Verified Partner</span>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <span>Real-time Stock</span>
          </div>
          <h2 className="text-3xl font-black font-headline tracking-tight text-white">{pharmacy.shop_name}</h2>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Medicines */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-headline font-extrabold text-2xl text-slate-900">Available Medicines</h2>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{medicines.length} items</span>
            </div>
            {medicines.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <span className="material-symbols-outlined text-5xl text-slate-200 mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>medication</span>
                <p className="text-slate-500 font-medium">No medicines listed for this pharmacy yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {medicines.slice(0, 15).map((med) => {
                  const inStock = (med.available_quantity || med.availableQuantity) > 0;
                  return (
                    <div key={med.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md hover:border-primary/10 transition-all group cursor-pointer">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                        {/* Try database image first, then category fallback */}
                        <img 
                          src={med.imageUrl || getDosageImg(med.dosage_form || med.dosageForm, med.name)} 
                          alt={med.name} 
                          className="w-full h-full object-cover transition-opacity duration-300" 
                          onError={(e) => {
                            const fallback = getDosageImg(med.dosage_form || med.dosageForm, med.name);
                            if (e.target.src !== fallback) {
                              e.target.src = fallback;
                            } else {
                              e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400';
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 truncate">{med.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{med.dosage_form || med.generic_name || 'Medicine'}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-black text-primary font-headline">₹{(med.selling_price)?.toFixed(2)}</p>
                        <p className={`text-[10px] uppercase font-bold tracking-widest ${inStock ? 'text-emerald-600' : 'text-red-500'}`}>
                          {inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
            <h3 className="font-headline font-bold text-lg text-slate-900">Contact Info</h3>
            <div className="space-y-4">
              {[
                { icon: 'call', label: 'Phone', value: pharmacy.contact_number },
                { icon: 'location_on', label: 'Address', value: pharmacy.shop_address },
                { icon: 'location_city', label: 'City', value: `${pharmacy.city}, ${pharmacy.state}` },
              ].map(item => (
                <div key={item.icon} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-700">{item.value || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-slate-100" />
            <a href={`tel:${pharmacy.contact_number}`} className="block w-full py-3.5 bg-primary text-white text-center font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-[#0048a8] transition-all active:scale-95 text-sm">
              Contact Pharmacy
            </a>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-headline font-bold text-lg text-slate-900">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'medication', label: 'Medicines', value: medicines.length, color: 'text-primary bg-primary/5' },
                { icon: 'star', label: 'Rating', value: pharmacy.rating || '4.5', color: 'text-amber-600 bg-amber-50' },
                { icon: 'verified_user', label: 'Status', value: verified ? 'Verified' : 'Pending', color: 'text-emerald-600 bg-emerald-50' },
                { icon: 'schedule', label: 'Open', value: '24/7', color: 'text-indigo-600 bg-indigo-50' },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className={`material-symbols-outlined text-lg mb-1 w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                  <p className="text-lg font-black text-slate-900 font-headline">{s.value}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PharmacyDetail;
