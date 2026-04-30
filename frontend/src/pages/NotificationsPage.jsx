import React from 'react';

const NotificationsPage = () => {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] left-[10%] w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Page Header */}
      <header className="pb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-on-surface-variant font-headline font-semibold uppercase tracking-[0.2em] text-[10px] mb-3">Activity & Insights</h2>
            <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">Notifications</h1>
          </div>
          {/* Filter Toggle */}
          <div className="p-1 bg-surface-container-high rounded-full flex gap-1 h-fit">
            <button className="px-6 py-2 rounded-full text-sm font-semibold transition-all bg-surface-container-lowest text-primary card-shadow">All</button>
            <button className="px-6 py-2 rounded-full text-sm font-semibold transition-all text-on-surface-variant hover:text-on-surface">Unread</button>
            <button className="px-6 py-2 rounded-full text-sm font-semibold transition-all text-on-surface-variant hover:text-on-surface">Important</button>
          </div>
        </div>
      </header>

      {/* Notifications Canvas */}
      <section className="pb-24 grid grid-cols-12 gap-8">
        {/* Today's Activity Group */}
        <div className="col-span-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] flex-1 bg-slate-200"></span>
            <span className="text-on-surface-variant font-semibold text-[10px] tracking-widest uppercase font-headline">Today, Oct 24</span>
            <span className="h-[1px] flex-1 bg-slate-200"></span>
          </div>
        </div>

        {/* Bento Grid Layout for Notifications */}
        
        {/* Alert: Price Drop (Large Card) */}
        <div className="col-span-12 md:col-span-8">
          <div className="glass-effect p-8 rounded-[2rem] transition-all hover:translate-y-[-4px] hover:card-shadow-hover relative group">
            <div className="absolute top-8 right-8">
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-[10px] font-bold uppercase tracking-wider font-headline">Price Alert</span>
            </div>
            <div className="flex gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-headline font-bold mb-2">Lipitor 20mg Price Reduction</h3>
                <p className="text-on-surface-variant leading-relaxed max-w-2xl mb-4 font-body">
                  The lowest price for your watched item <span className="font-semibold text-on-surface">Lipitor 20mg (30 Tablets)</span> has dropped to <span className="text-primary font-bold">$14.50</span> at City Health Pharmacy.
                </p>
                <div className="flex items-center gap-6">
                  <button className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all font-headline">
                    View Comparison <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <span className="text-on-surface-variant/40 text-xs font-medium font-body">10:42 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Card */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-surface-container-low p-8 rounded-[2rem] h-full flex flex-col border border-transparent hover:border-primary/10 transition-colors group">
            <div className="w-12 h-12 rounded-full overflow-hidden mb-6 shadow-md border-2 border-white">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPQQnNGA8lHF0vhEntgtEWCwfdmKVpe00Ap8OHpI2DpxM_OKANShQsTm8QCIxjYfbIs5z42Vpt5wHaYsIIXtfEjAa_SsEJnlg7lTQHyn25DHEtjrfSjW_i2YtFYA84O4FPzJCjnu0D1bcv4yjJxRJpfTFkn7k2VEi9yU--jqfZtev_BTAcFKs-LHEJF7tm0a2avhUMeBZ7MmCB3zxLAZZVOJhX5waojhPtoFcYRyQkts1VqkR--dw4op98xcPw0bpY3AFhhJ-ZCvTG" 
              />
            </div>
            <h3 className="text-lg font-headline font-bold mb-2">Pharmacy Inquiry</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-1 font-body">
              Dr. Aris Thorne sent a query regarding bulk inventory of <span className="italic">Amoxicillin</span> for the upcoming quarter.
            </p>
            <div className="pt-6 mt-auto border-t border-slate-200 flex justify-between items-center font-headline">
              <span className="text-primary font-bold text-sm cursor-pointer hover:underline">Reply Now</span>
              <span className="text-on-surface-variant/40 text-[10px] font-bold uppercase">2h ago</span>
            </div>
          </div>
        </div>

        {/* System Update */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-surface-container-lowest p-8 rounded-[2rem] h-full border border-surface-container-low card-shadow transition-all hover:card-shadow-hover">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white mb-6 shadow-lg">
              <span className="material-symbols-outlined text-xl">update</span>
            </div>
            <h3 className="text-lg font-headline font-bold mb-2">System Maintenance</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-body">
              Scheduled maintenance for the pricing engine tonight at 02:00 AM. Comparison results may be delayed for 15 minutes.
            </p>
            <div className="mt-6 text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-tighter font-headline">09:15 AM</div>
          </div>
        </div>

        {/* Watchlist Sync Progress */}
        <div className="col-span-12 md:col-span-8">
          <div className="glass-effect p-8 rounded-[2rem] h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-headline font-bold">Watchlist Sync</h3>
              <span className="text-xs text-on-surface-variant font-medium font-body bg-slate-50 px-3 py-1 rounded-full">3 items updated</span>
            </div>
            <div className="space-y-6">
              {[
                { name: "Metformin 500mg", drop: "-$2.10", width: "65%", icon: "pill" },
                { name: "Lisinopril 10mg", drop: "-$1.45", width: "40%", icon: "medication" },
                { name: "Amlodipine 5mg", drop: "-$0.90", width: "25%", icon: "vaccines" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer transition-all hover:translate-x-1">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1 font-headline">
                      <span className="font-bold text-on-surface">{item.name}</span>
                      <span className="text-emerald-600 font-bold">{item.drop}</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-1000" style={{ width: item.width }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Yesterday's Activity Group */}
        <div className="col-span-12 mt-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] flex-1 bg-slate-200"></span>
            <span className="text-on-surface-variant font-semibold text-[10px] tracking-widest uppercase font-headline">Yesterday, Oct 23</span>
            <span className="h-[1px] flex-1 bg-slate-200"></span>
          </div>
        </div>

        <div className="col-span-12">
          <div className="bg-surface-container-low/50 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between opacity-70 hover:opacity-100 transition-opacity group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-on-surface-variant/10 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">inventory</span>
              </div>
              <div>
                <h4 className="font-bold text-lg font-headline">Inventory Threshold Met</h4>
                <p className="text-sm text-on-surface-variant font-body">Inventory levels for <span className="font-medium text-on-surface">Ibuprofen 400mg</span> were restocked successfully.</p>
              </div>
            </div>
            <span className="text-on-surface-variant font-bold text-[10px] uppercase font-headline tracking-wider mt-4 md:mt-0">Oct 23, 4:45 PM</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotificationsPage;
