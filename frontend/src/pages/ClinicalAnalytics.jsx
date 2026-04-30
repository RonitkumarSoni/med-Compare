import React from 'react';

const ClinicalAnalytics = () => {
  const chartBars = [40, 55, 48, 62, 75, 68, 85, 80, 92, 88];
  const months = ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];

  const categorySavings = [
    { icon: 'pill', name: 'Cardiovascular', saved: '₹4.2L', growth: '18% Monthly growth', trend: 'trending_up' },
    { icon: 'psychology', name: 'Neurology', saved: '₹1.9L', growth: '5% Monthly growth', trend: 'trending_up' },
    { icon: 'respiratory_rate', name: 'Respiratory', saved: '₹3.1L', growth: '12% Monthly growth', trend: 'trending_up' },
    { icon: 'gastroenterology', name: 'Gastro', saved: '₹89K', growth: 'Steady state', trend: 'horizontal_rule' }
  ];

  return (
    <div className="flex-1 space-y-12">
      {/* Top Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-container-lowest p-8 rounded-xl card-shadow border border-outline-variant/10 transition-transform hover:translate-y-[-4px]">
          <p className="text-on-surface-variant text-sm font-medium mb-1 font-body">Total Savings Generated</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-extrabold text-primary font-headline">₹1,24,28,890</h3>
            <span className="text-emerald-600 font-bold text-xs mb-1 flex items-center font-headline">
              <span className="material-symbols-outlined text-xs">trending_up</span> 12%
            </span>
          </div>
          <div className="mt-6 h-1 w-full bg-surface-container-low rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-[78%]"></div>
          </div>
          <p className="mt-2 text-xs text-on-surface-variant/60 italic font-body">vs last fiscal quarter</p>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-xl card-shadow border border-outline-variant/10 transition-transform hover:translate-y-[-4px]">
          <p className="text-on-surface-variant text-sm font-medium mb-1 font-body">Price Competitiveness</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-extrabold text-on-surface font-headline">94.2%</h3>
            <span className="text-emerald-600 font-bold text-xs mb-1 flex items-center font-headline">
              <span className="material-symbols-outlined text-xs">check_circle</span> Top Tier
            </span>
          </div>
          <div className="mt-6 flex gap-1 items-end h-8">
            <div className="flex-1 bg-surface-container-high h-[40%] rounded-sm"></div>
            <div className="flex-1 bg-surface-container-high h-[60%] rounded-sm"></div>
            <div className="flex-1 bg-primary h-[90%] rounded-sm"></div>
            <div className="flex-1 bg-surface-container-high h-[75%] rounded-sm"></div>
            <div className="flex-1 bg-surface-container-high h-[55%] rounded-sm"></div>
          </div>
          <p className="mt-2 text-xs text-on-surface-variant/60 italic font-body">Regional leader status</p>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-xl card-shadow border border-outline-variant/10 transition-transform hover:translate-y-[-4px]">
          <p className="text-on-surface-variant text-sm font-medium mb-1 font-body">Patient Retention</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-extrabold text-on-surface font-headline">8,421</h3>
            <span className="text-emerald-600 font-bold text-xs mb-1 flex items-center font-headline">
              <span className="material-symbols-outlined text-xs">group</span> +432
            </span>
          </div>
          <div className="mt-6 flex justify-between items-center text-xs font-bold text-on-surface-variant/40 font-headline">
            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span>
          </div>
          <p className="mt-2 text-xs text-on-surface-variant/60 italic font-body">Active unique patient IDs</p>
        </div>
      </section>

      {/* Main Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Price Trend Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-10 rounded-xl card-shadow border border-outline-variant/10 relative overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl font-bold text-on-surface font-headline">Price Trend Analysis</h3>
              <p className="text-on-surface-variant font-body text-sm mt-1">Comparative generic vs brand name fluctuations (12m)</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold font-headline uppercase tracking-wider">Generic</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-on-surface-variant text-[10px] font-bold font-headline uppercase tracking-wider">Brand</span>
            </div>
          </div>
          <div className="h-80 w-full relative flex items-end justify-between px-2">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              {[1, 2, 3, 4].map((_, i) => <div key={i} className="border-b border-black w-full h-0"></div>)}
            </div>
            {chartBars.map((h, i) => (
              <div 
                key={i} 
                className="z-10 w-10 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg transition-all duration-700 hover:scale-x-110 cursor-pointer group relative"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ₹{h * 120} avg
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between px-2 text-[10px] font-bold text-slate-400 tracking-widest font-headline">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>

        {/* Scorecard */}
        <div className="lg:col-span-4 bg-surface-container p-8 rounded-xl flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-bold mb-1 font-headline">Pharmacy Scorecard</h3>
            <p className="text-sm text-on-surface-variant font-body">Regional performance metrics</p>
          </div>
          <div className="space-y-6">
            {[
              { label: "Fulfillment Speed", score: "9.2/10", color: "bg-emerald-500", width: "92%" },
              { label: "Price Transparency", score: "8.8/10", color: "bg-primary", width: "88%" },
              { label: "Data Accuracy", score: "9.7/10", color: "bg-indigo-600", width: "97%" }
            ].map((metric, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="font-semibold text-on-surface">{metric.label}</span>
                  <span className="text-primary font-bold font-headline">{metric.score}</span>
                </div>
                <div className="h-1.5 w-full bg-white rounded-full">
                  <div className={`h-full ${metric.color} rounded-full transition-all duration-1000`} style={{ width: metric.width }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto bg-white/50 p-4 rounded-lg border border-white/20">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">stars</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter font-headline">Current Rank</p>
                <p className="text-lg font-extrabold font-headline">#3 in Region</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Impact Visualization */}
      <section className="bg-surface-container-low rounded-2xl p-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h3 className="text-3xl font-extrabold text-on-surface font-headline">Savings Impact Visualization</h3>
            <p className="text-on-surface-variant max-w-xl mt-2 font-body leading-relaxed">A deep-dive into how MedCompare's pricing logic has directly influenced consumer choice and collective healthcare savings across major medication categories.</p>
          </div>
          <div className="flex gap-4 font-headline">
            <button className="px-6 py-2.5 bg-white text-on-surface font-bold rounded-lg border border-outline-variant/30 text-sm hover:bg-slate-50 transition-colors shadow-sm active:scale-95">Export Report</button>
            <button className="px-6 py-2.5 bg-on-surface text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity shadow-lg active:scale-95">Share Insights</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorySavings.map((cat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl card-shadow space-y-4 border border-outline-variant/10 transition-all hover:translate-y-[-4px] group">
              <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h4 className="font-bold text-lg font-headline mb-1">{cat.name}</h4>
              <div className="text-2xl font-black text-on-surface font-headline">{cat.saved} <span className="text-xs font-normal text-on-surface-variant tracking-normal font-body">saved</span></div>
              <div className={`flex items-center gap-2 text-xs font-bold mt-2 font-headline ${cat.trend === 'horizontal_rule' ? 'text-on-surface-variant/40' : 'text-secondary'}`}>
                <span className="material-symbols-outlined text-xs">{cat.trend}</span> {cat.growth}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Intelligence */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
        <div className="space-y-6">
          <h3 className="text-3xl font-extrabold font-headline">Market Intelligence</h3>
          <p className="text-on-surface-variant text-lg leading-relaxed font-body">Our proprietary algorithms process over 1.4M daily price updates. MedCompare's analytics layer provides pharmacies with the predictive insights needed to maintain competitive edges while ensuring patient affordability.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container rounded-lg">
              <div className="text-primary font-black text-3xl font-headline">4.2s</div>
              <div className="text-xs text-on-surface-variant font-bold font-headline uppercase tracking-widest mt-1">Avg Update Latency</div>
            </div>
            <div className="p-4 bg-surface-container rounded-lg">
              <div className="text-primary font-black text-3xl font-headline">99.9%</div>
              <div className="text-xs text-on-surface-variant font-bold font-headline uppercase tracking-widest mt-1">API Reliability</div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl relative min-h-[350px] group">
          <img 
            alt="Medical Technology" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIn1UHOy4WTBKDIn_dcjtMIS0rY0ML4sq0mSaSxA_whlT5AoVXg4LjH9l072O87EGJrgE9dW5s6Be4hIJ70OtQQYX1EzxwGlsegr9bx0krw7D0x3nRaSDtEuOeASC03rBjthBvq_ueeKgiiGs4EYAGuWgDfAh0bNpR8664xGZrLSyisfLIzeYglgX0hs18aFz9yY6uWAvHsAcu9KKrHlg598ZksrjQunyZ3ZX_BQ3lClZiLLAJ9lnItyA_rYhV-TkBKAcbCa0oo06Q"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-primary/20 to-transparent flex items-end p-10">
            <div className="text-white">
              <p className="font-bold text-2xl font-headline mb-2">AI-Driven Predictions</p>
              <p className="text-sm opacity-80 font-body max-w-sm">Anticipating price surges and demand shifts before they happen, giving you the strategic advantage.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClinicalAnalytics;
