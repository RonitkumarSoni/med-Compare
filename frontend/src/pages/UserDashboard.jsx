import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/api';
import useAsync from '../hooks/useAsync';
import Skeleton from '../components/Skeleton';

const getDosageImage = (dosageForm, name) => {
  const form = (dosageForm || '').toLowerCase();
  const itemName = (name || '').toLowerCase();
  
  if (form.includes('tablet') || form.includes('capsule') || form.includes('strip') || itemName.includes('tablet') || itemName.includes('capsule')) 
    return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400';
  
  if (form.includes('bottle') || form.includes('syrup') || form.includes('liquid') || form.includes('suspension') || form.includes('solution') || itemName.includes('syrup') || itemName.includes('cough') || itemName.includes('liquid')) 
    return 'https://images.unsplash.com/photo-1550572017-ed200277c639?q=80&w=400';
  
  if (form.includes('injection') || form.includes('vial') || form.includes('ampoule') || itemName.includes('injection') || itemName.includes('vial')) 
    return 'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=400';
  
  if (form.includes('inhaler') || itemName.includes('inhaler') || itemName.includes('respule')) 
    return 'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=400';
  
  if (form.includes('ointment') || form.includes('cream') || form.includes('gel') || itemName.includes('cream') || itemName.includes('gel') || itemName.includes('ointment')) 
    return 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400';
  
  return 'https://images.unsplash.com/photo-1550572017-ed200277c639?q=80&w=400'; // Default bottle
};

const UserDashboard = () => {
  const { user } = useAuth();
  
  // Stabilize the async function to prevent infinite loops
  const fetchDashboardStats = React.useMemo(() => () => API.get('/dashboard/stats'), []);
  
  const { execute: fetchStats, loading, data: dashboardData } = useAsync(fetchDashboardStats);

  React.useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const stats = dashboardData?.data?.stats;
  const welcomeMessage = dashboardData?.data?.welcomeMessage || `Welcome back, ${user?.name || 'User'}`;
  const trendData = dashboardData?.data?.trendData || [40, 60, 55, 85, 95, 20];
  const liveComparisons = dashboardData?.data?.liveComparisons || [];
  
  return (
    <>
      {/* Hero Header */}
      <div className="mb-12 min-h-[84px] flex flex-col justify-center">
        {loading ? (
          <div className="space-y-2.5">
            <Skeleton variant="title" className="w-72 h-8" />
            <Skeleton variant="text" className="w-[450px] h-5" />
          </div>
        ) : (
          <>
            <h2 className="font-headline text-2xl font-extrabold text-on-surface mb-2 leading-tight">
              {welcomeMessage}
            </h2>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed">Your pharmaceutical cost insights for the month are ready.</p>
          </>
        )}
      </div>

      {/* Stats Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="med-card p-8 min-h-[176px] flex flex-col justify-between">
              <Skeleton variant="avatar" className="w-12 h-12" />
              <div className="space-y-2 mt-4">
                <Skeleton variant="text" className="w-32 h-4" />
                <Skeleton variant="title" className="w-48 h-8" />
              </div>
              <Skeleton variant="text" className="w-24 h-4 mt-2 opacity-50" />
            </div>
          ))
        ) : (
          <>
            <Link to="/analytics" className="med-card p-8 flex flex-col gap-4 group hover:border-primary/40 transition-all min-h-[176px]">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-sm font-medium font-body">Total Savings Generated</p>
                <h3 className="text-3xl font-extrabold mt-1 font-headline">₹{stats?.totalSavings?.value?.toLocaleString() || '0'}</h3>
              </div>
              <div className="flex items-center gap-2 text-secondary text-sm font-semibold font-body">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>{stats?.totalSavings?.change || 'Calculating...'}</span>
              </div>
            </Link>

            <div className="med-card p-8 flex flex-col gap-4 min-h-[176px]">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-sm font-medium font-body">Recent Search</p>
                <h3 className="text-xl font-extrabold mt-1 font-headline truncate">{stats?.recentSearch?.name || 'No searches yet'}</h3>
              </div>
              <p className="text-on-surface-variant text-sm font-body">{stats?.recentSearch?.time || 'Start exploring'}</p>
            </div>

            <Link to="/saved-watchlist" className="med-card p-8 flex flex-col gap-4 group hover:border-primary/40 transition-all min-h-[176px]">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-sm font-medium font-body">Watchlist Count</p>
                <h3 className="text-3xl font-extrabold mt-1 font-headline">{stats?.watchlistCount?.value || '0'} Items</h3>
              </div>
              <div className="flex items-center gap-1 font-body">
                <span className="text-on-surface-variant text-sm">{stats?.watchlistCount?.alerts || 0} alerts requiring attention</span>
                {stats?.watchlistCount?.alerts > 0 && <span className="w-2 h-2 rounded-full bg-error"></span>}
              </div>
            </Link>
          </>
        )}
      </div>

      {/* Middle Section: Analytics & Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        {/* Savings Trend Chart */}
        <div className="lg:col-span-3 med-card p-8 relative overflow-hidden h-[400px]">
          {loading ? (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <Skeleton variant="title" className="w-40 h-7" />
                  <Skeleton variant="text" className="w-64 h-4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-20 h-8 rounded-full" />
                  <Skeleton className="w-20 h-8 rounded-full" />
                </div>
              </div>
              <div className="flex-1 w-full bg-slate-50/50 rounded-2xl relative overflow-hidden">
                <Skeleton className="absolute bottom-0 w-full h-[70%]" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="font-headline text-xl font-extrabold">Savings Trend</h4>
                  <p className="text-on-surface-variant text-sm font-body mt-1">Net monthly savings across all pharmacies</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-surface-container text-primary rounded-full text-xs font-bold font-headline">Monthly</button>
                  <button className="px-3 py-1 text-on-surface-variant hover:bg-surface-container rounded-full text-xs font-bold transition-colors font-headline">Quarterly</button>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-8 h-64 flex items-end px-8 gap-4">
                {trendData.map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-xl cursor-pointer group relative transition-colors ${i === trendData.length - 2 ? 'bg-gradient-to-t from-primary/60 to-primary hover:from-primary/80 hover:to-primary' : 'bg-primary/15 hover:bg-primary/30'}`} style={{ height: `${h}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-body whitespace-nowrap">
                      ₹{(h * 130).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-8 flex justify-around items-center px-8 text-[10px] text-on-surface-variant font-bold border-t border-outline-variant/10 font-headline tracking-widest">
                <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
              </div>
            </>
          )}
        </div>

        {/* Active Comparisons List */}
        <div className="lg:col-span-2 med-card p-8 h-[400px] overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline text-xl font-extrabold">Live Comparison</h4>
            <Link className="text-primary text-xs font-bold hover:underline font-headline" to="/medicine-compare">View All</Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 min-h-[80px]">
                  <Skeleton variant="avatar" className="w-12 h-12" />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" className="w-32 h-4" />
                    <Skeleton variant="text" className="w-48 h-3 opacity-50" />
                  </div>
                </div>
              ))
            ) : (
              liveComparisons.length > 0 ? liveComparisons.map((med, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center card-shadow overflow-hidden">
                    <img 
                      alt={med.name} 
                      className="w-full h-full object-cover" 
                      src={getDosageImage(med.dosageForm, med.name)} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold font-headline">{med.name}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold font-body">{med.pharmaciesCount} Pharmacies Linked</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold font-headline ${med.status === 'Stable' ? 'text-on-surface' : 'text-primary'}`}>₹{med.price?.toFixed(2)}</p>
                    <p className="text-[10px] text-on-surface-variant font-body">{med.status}</p>
                  </div>
                </div>
              ))
 : (
                <div className="text-center py-6 text-on-surface-variant text-sm font-body">No recent comparisons found.</div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
