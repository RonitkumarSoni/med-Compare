import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import useAsync from '../hooks/useAsync';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';

const InventoryManagement = () => {
  // Stabilize the async function to prevent infinite loops
  const fetchInventoryData = React.useMemo(() => () => API.get('/medicines?limit=50'), []);
  
  const { execute: fetchInventory, loading, data: inventoryData, error } = useAsync(fetchInventoryData);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const items = inventoryData?.data || [];
  const total = inventoryData?.total || 0;

  const getDosageImage = (dosageForm, name) => {
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

  return (
    <div className="flex-1">
      <SEO title="Inventory Management" description="Manage your pharmacy's medicine stock." />
      
      {/* Header Section */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h3 className="font-headline text-xl font-extrabold text-on-surface tracking-tight">Stock Inventory</h3>
          <p className="text-on-surface-variant font-body text-sm mt-1">Manage your medical supplies and pricing across departments.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">search</span>
            <input
              className="pl-10 pr-4 py-2.5 w-80 bg-white border-none rounded-xl shadow-sm focus:ring-2 focus:ring-primary/40 font-body text-sm placeholder:text-outline-variant transition-all outline-none"
              placeholder="Search medicine, SKU, or batch..."
              type="text"
            />
          </div>
          <Link to="/add-medicine">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-headline font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Add Medicine</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Filters and Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Items', value: total, color: 'text-primary' },
          { label: 'Low Stock', value: items.filter(i => i.availableQuantity < 10).length, color: 'text-orange-500' },
          { label: 'Expiring Soon', value: items.filter(i => new Date(i.expiryDate) < new Date(Date.now() + 90*24*60*60*1000)).length, color: 'text-red-600' },
          { label: 'Inventory Value', value: `₹${(items.reduce((acc, curr) => acc + (curr.sellingPrice * curr.availableQuantity), 0) / 1000).toFixed(1)}k`, color: 'text-indigo-600' }
        ].map((stat, idx) => (
          <div key={idx} className="med-card p-6 flex flex-col gap-1 min-h-[96px] justify-center">
            {loading ? (
              <div className="space-y-2">
                <Skeleton variant="text" className="w-20 h-3" />
                <Skeleton variant="title" className="w-16 h-7" />
              </div>
            ) : (
              <>
                <span className={`text-xs font-bold ${stat.color} tracking-widest uppercase mb-1 font-headline`}>{stat.label}</span>
                <span className="text-2xl font-headline font-bold text-on-surface">{stat.value}</span>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Inventory Management Table */}
      <section className="med-card overflow-hidden !rounded-3xl min-h-[600px] flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_auto] gap-4 px-8 py-5 border-b border-surface-container-high bg-slate-50/50">
          <span className="text-xs font-bold text-outline-variant uppercase tracking-wider font-headline">Product Name</span>
          <span className="text-xs font-bold text-outline-variant uppercase tracking-wider font-headline">Stock Level</span>
          <span className="text-xs font-bold text-outline-variant uppercase tracking-wider font-headline">Price</span>
          <span className="text-xs font-bold text-outline-variant uppercase tracking-wider font-headline">Expiry Date</span>
          <span className="text-xs font-bold text-outline-variant uppercase tracking-wider font-headline">Status</span>
          <span className="w-10"></span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-surface-container-low font-body flex-1">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_auto] gap-4 px-8 py-6 items-center">
                <div className="flex items-center gap-4">
                  <Skeleton variant="avatar" className="w-12 h-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton variant="title" className="w-40 h-5" />
                    <Skeleton variant="text" className="w-24 h-3" />
                  </div>
                </div>
                <Skeleton variant="text" className="w-16 h-4" />
                <Skeleton variant="text" className="w-12 h-4" />
                <Skeleton variant="text" className="w-20 h-4" />
                <Skeleton className="w-24 h-7 rounded-full" />
                <div className="flex gap-2">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            ))
          ) : items.length === 0 ? (
            <div className="py-24 text-center text-on-surface-variant font-medium">No items found in inventory.</div>
          ) : (
            items.map((item) => {
              const isLowStock = item.availableQuantity < 10;
              const isExpiring = new Date(item.expiryDate) < new Date(Date.now() + 90*24*60*60*1000);
              
              // Robust image selection logic - prefer dynamic variety, then database URL, then safe default
              const dbImage = item.imageUrl && item.imageUrl !== 'null' && item.imageUrl !== '' ? item.imageUrl : null;
              const fallbackImage = getDosageImage(item.dosage_form || item.dosageForm, item.name);
              const imgSrc = dbImage || fallbackImage;

              return (
                <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_auto] gap-4 px-8 py-6 items-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-primary overflow-hidden border border-slate-200">
                      <img 
                        className="w-full h-full object-cover transition-opacity duration-300" 
                        src={imgSrc} 
                        alt={item.name} 
                        loading="lazy"
                        onError={(e) => {
                          if (e.target.src !== fallbackImage) {
                            e.target.src = fallbackImage;
                          } else {
                            // Ultimate fallback if even categories fail
                            e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400';
                          }
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface text-base">{item.name}</p>
                      <p className="text-xs text-on-surface-variant uppercase tracking-tighter">{item.dosage_form || item.dosageForm || 'MEDICINE'}</p>
                    </div>
                  </div>

                  <div className={`text-sm font-semibold ${isLowStock ? 'text-orange-600' : 'text-on-surface'}`}>
                    {item.availableQuantity} Units
                  </div>
                  <div className="text-sm font-semibold text-on-surface">₹{item.sellingPrice}</div>
                  <div className={`text-sm ${isExpiring ? 'text-red-600 font-medium' : 'text-on-surface-variant'}`}>
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-tight inline-flex items-center gap-1.5 ${
                      isExpiring ? 'bg-red-100 text-red-700' : isLowStock ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isExpiring ? 'bg-red-600' : isLowStock ? 'bg-orange-500' : 'bg-emerald-600'
                      }`}></span>
                      {isExpiring ? 'Expiring' : isLowStock ? 'Low Stock' : 'In Stock'}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-8 py-6 flex items-center justify-between border-t border-surface-container-high bg-white">
          <span className="text-sm font-body text-on-surface-variant">
            {loading ? <Skeleton variant="text" className="w-32 h-4" /> : `Showing ${items.length} of ${total} items`}
          </span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold font-headline shadow-md shadow-primary/20">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/30 text-on-surface hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InventoryManagement;
