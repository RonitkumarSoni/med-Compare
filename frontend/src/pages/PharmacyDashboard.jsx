import React, { useEffect } from 'react';
import useAsync from '../hooks/useAsync';
import API from '../api/api';
import SEO from '../components/SEO';

const PharmacyDashboard = () => {
  // In a real app, we'd get the pharmacy ID from the logged-in user's state/context
  // For this demonstration, we'll fetch analytics for the first pharmacy found or use a placeholder ID
  const { execute: fetchAnalytics, loading, data: analytics } = useAsync(() => 
    API.get('/pharmacies/my-analytics') // Assuming we add this route for convenience
  );

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const stats = analytics?.data || {
    totalMedicines: 0,
    lowStock: 0,
    expiringSoon: 0,
    totalInquiries: 0,
    pendingInquiries: 0
  };

  return (
    <div>
      <SEO title="Pharmacy Dashboard" description="Overview of your pharmacy performance." />
      <div className="space-y-10">
        {/* Stat Cards: Bento Grid Style */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="med-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-primary-fixed rounded-lg text-primary">
                <span className="material-symbols-outlined">pill</span>
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest text-[10px] font-bold">Total Medicines</p>
              <h3 className="text-2xl font-headline font-extrabold text-on-surface mt-1">{loading ? '...' : stats.totalMedicines}</h3>
            </div>
          </div>

          <div className="med-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <span className="material-symbols-outlined">inventory_2</span>
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest text-[10px] font-bold">Low Stock</p>
              <h3 className="text-2xl font-headline font-extrabold text-on-surface mt-1">{loading ? '...' : stats.lowStock}</h3>
            </div>
          </div>

          <div className="med-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-red-100 rounded-lg text-red-600">
                <span className="material-symbols-outlined">event_busy</span>
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest text-[10px] font-bold">Expiring Soon</p>
              <h3 className="text-2xl font-headline font-extrabold text-on-surface mt-1">{loading ? '...' : stats.expiringSoon}</h3>
            </div>
          </div>

          <div className="med-card p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <span className="material-symbols-outlined">mail</span>
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest text-[10px] font-bold">Pending Inquiries</p>
              <h3 className="text-2xl font-headline font-extrabold text-on-surface mt-1">{loading ? '...' : stats.pendingInquiries}</h3>
            </div>
          </div>
        </section>

        {/* Middle Content: Activity & Requests */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Chart (Placeholder for now) */}
          <div className="lg:col-span-2 med-card p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 relative z-10 font-headline">
              <div>
                <h4 className="font-bold text-xl text-on-surface">Patient Engagement</h4>
                <p className="text-on-surface-variant text-sm font-body">Last 7 days performance metrics</p>
              </div>
            </div>
            {/* Chart Bars */}
            <div className="flex items-end justify-between h-48 gap-4 px-2 relative z-10">
              {[40, 70, 45, 90, 65, 30, 80].map((val, i) => (
                <div key={i} className="w-full bg-surface-container-low rounded-t-lg relative group transition-all hover:bg-primary/10" style={{ height: `${val}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-primary/40 rounded-t-lg h-full"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline uppercase tracking-widest font-headline">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Recent Medicine Requests (Real-ish) */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-white">
            <div className="flex justify-between items-center mb-6 font-headline">
              <h4 className="font-bold text-lg text-on-surface">Recent Inquiries</h4>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {stats.pendingInquiries > 0 ? (
                <div className="p-4 bg-white rounded-xl shadow-sm flex items-center gap-4 border border-outline-variant/5">
                  <div className="h-10 w-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">pill</span>
                  </div>
                  <div className="flex-grow font-body">
                    <p className="text-sm font-bold text-on-surface">Check pending list</p>
                    <p className="text-[10px] text-on-surface-variant font-label">Action required soon</p>
                  </div>
                  <span className="material-symbols-outlined text-outline text-lg">chevron_right</span>
                </div>
              ) : (
                <div className="py-8 text-center text-on-surface-variant text-sm">No new inquiries.</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
