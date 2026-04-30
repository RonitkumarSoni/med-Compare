import React from 'react';

const InquiryRequests = () => {
  const inquiries = [
    {
      id: 1,
      user: "Sarah Jenkins",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5kkjmiS5fQ4wa25uTWagThOLisZYJviIueIvMcnFOArstcc29HQS2gHZnUZuNa362zQv8zDexJpRkoASRbSASUeUvbkfYcJGXkEfEff44FYWI3vwzApRxrYLLUVTLGoB_jwMi3IwfBbdzCxgwY2qLpzErJoU9P9V4YU6mkrQQDjbIrKFtBWu4nSUIxNnazEDoISxmzceamap4eWO3axyuSBVXuoBWITk3fsr6c-d5QsIeKXIRPrAttZqNQ2UKw6V9NaM_zuEmGAKt",
      time: "2 mins ago",
      status: "PENDING",
      statusColor: "bg-blue-50 text-blue-600",
      subject: "Amoxicillin 500mg (30 Caps)",
      preview: "Looking for a generic alternative that is in stock. Please advise on price...",
      active: true
    },
    {
      id: 2,
      user: "Mark Anthony",
      initials: "MA",
      time: "1 hour ago",
      status: "REPLIED",
      statusColor: "bg-emerald-50 text-emerald-600",
      subject: "Lisinopril 10mg",
      preview: "Is the shipment arriving this Wednesday as scheduled? I need to pick up...",
      active: false
    },
    {
      id: 3,
      user: "David Chen",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn6Qs2IHkkuoqeTebrK4GvjbTR1I1xY_QvtL69p6GTc-EmgD2yC1a-Be2P-fvnjBu_3yrvIm7QFuw25W2kRyz0N-lYnlB6ajjBpgdCffpFFplsd1B9eawU4KeGkR2nNMB_LnDU-kS3rWl-bvPcd1A8GjUZruNhJ7tH9L-7oxFjNplaIEb5RrLn3TsdLFTUXro8_kgIByHNHjNid8aem4G1nxNpOySb8wuDvz7oc5b5pOhRCgbsbRUMGfUjbOycZZepmyWbEaP9A2PR",
      time: "Yesterday",
      status: "CLOSED",
      statusColor: "bg-slate-100 text-slate-500",
      subject: "Metformin 500mg Extended",
      preview: "Confirming prescription transfer from previous provider...",
      active: false
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Page Header Section - Refined to match other pages */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-outline-variant/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-on-surface tracking-tighter font-headline">Medicine Inquiries</h1>
          <p className="text-on-surface-variant mt-2 font-medium font-body opacity-70">Manage active requests and clinical supply logistics.</p>
        </div>
        <div className="flex p-1.5 bg-surface-container-low rounded-2xl shadow-inner">
          <button className="px-8 py-2.5 rounded-xl bg-white text-primary font-bold text-sm shadow-sm transition-all font-headline">Active</button>
          <button className="px-8 py-2.5 rounded-xl text-on-surface-variant/60 hover:text-on-surface transition-colors font-bold text-sm font-headline">Archived</button>
        </div>
      </div>

      {/* Bento Inquiry Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Left Column: Inquiry List */}
        <div className="lg:col-span-4 flex flex-col gap-4 bg-slate-50/50 p-4 rounded-3xl border border-outline-variant/10">
          {inquiries.map((inquiry) => (
            <div 
              key={inquiry.id} 
              className={`p-6 rounded-3xl transition-all cursor-pointer group border-2 ${
                inquiry.active 
                  ? 'bg-blue-50/50 border-primary shadow-2xl shadow-primary/20 ring-4 ring-primary/10' 
                  : 'bg-white border-outline-variant/30 shadow-lg shadow-slate-300/50 hover:border-primary/40 hover:shadow-2xl'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {inquiry.avatar ? (
                    <img alt={inquiry.user} className="w-10 h-10 rounded-full object-cover" src={inquiry.avatar} />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-xs font-headline">
                      {inquiry.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-on-surface leading-none font-headline">{inquiry.user}</h4>
                    <p className="text-xs text-on-surface-variant mt-1 font-body">{inquiry.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded ${inquiry.statusColor} text-[10px] font-bold font-headline`}>{inquiry.status}</span>
              </div>
              <p className="text-sm font-semibold text-on-surface line-clamp-1 mb-1 font-headline">{inquiry.subject}</p>
              <p className="text-xs text-on-surface-variant line-clamp-2 font-body">{inquiry.preview}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Conversation View */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-3xl overflow-hidden min-h-[600px] shadow-xl shadow-slate-200/60 border border-outline-variant/20 relative">
          {/* Detail Header */}
          <div className="p-6 bg-slate-50/50 border-b border-outline-variant/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                alt="User" 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm1-hs_DqTLsaIcI5l3n6wb2q7er0kHSpqaBmda4PNu1QlTErMsdavLw6MeoV4iquA0Fqt7iICFS2p-lf3jDIvCta9VYXqLAyY9twp5YKFeZhiha8TdyAlEr8-7wjBB169iLJRgkfqFD7t0CRyc8ekBxX-R3m4BYvaozmNAfH69eBDJgF3zP5ZE03ETx4LfM1pBC_wZpouoqWiqSV8WjZwOM3wG6W2311s5M5FfucWDdBr-0_kgiO379_s-KPxZK60b9VYh9r4nOBc" 
              />
              <div>
                <h3 className="text-xl font-bold text-on-surface tracking-tight font-headline">Sarah Jenkins</h3>
                <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1 font-body">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online • Local Customer
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full bg-white shadow-sm hover:shadow-md text-slate-600 transition-all active:scale-95 flex items-center justify-center border border-outline-variant/10">
                <span className="material-symbols-outlined text-xl">call</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-white shadow-sm hover:shadow-md text-slate-600 transition-all active:scale-95 flex items-center justify-center border border-outline-variant/10">
                <span className="material-symbols-outlined text-xl">history</span>
              </button>
            </div>
          </div>

          {/* Chat Canvas */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6 flex flex-col bg-[#f3f6ff] font-body">
            {/* Date Badge */}
            <div className="self-center px-4 py-1 rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-700 uppercase tracking-widest mb-4 font-headline">
              Inquiry Started Today
            </div>
            
            {/* User Message */}
            <div className="max-w-[80%] self-start">
              <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-md text-sm leading-relaxed text-on-surface border border-outline-variant/10">
                Hello! I'm looking for <span className="font-bold text-primary">Amoxicillin 500mg</span> (30 capsules). Do you have it in stock? Also, could you tell me if there's a generic version available that's cheaper? My insurance covers it partially.
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 font-medium">10:42 AM</p>
            </div>

            {/* Context Badge / Inventory Alert */}
            <div className="self-center max-w-sm w-full bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex gap-3 shadow-md shadow-indigo-100/50">
              <span className="material-symbols-outlined text-indigo-600">info</span>
              <div className="text-xs text-indigo-900 leading-relaxed">
                <strong>Inventory Check:</strong> 54 units available in Aisle 4. Generic brand (Sandoz) is 20% cheaper.
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="mt-auto pt-8">
              <div className="bg-indigo-50/50 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-md shadow-indigo-100/30 transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  </div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider font-headline">Suggested Reply</p>
                </div>
                <p className="text-sm text-on-surface-variant italic mb-4">"Yes Sarah, we have Amoxicillin in stock. We also have a generic alternative that would save you roughly ₹850. Would you like me to reserve it for you?"</p>
                <button className="text-xs font-bold text-primary hover:underline font-headline">Apply Suggestion</button>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-8 bg-white/80 backdrop-blur-md border-t border-outline-variant/10">
            <div className="flex items-end gap-4">
              <div className="flex-1 relative bg-surface-container-lowest rounded-[1.5rem] p-5 flex flex-col gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-outline-variant/15 focus-within:border-primary/30 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-all">
                <textarea 
                  className="bg-transparent border-none focus:ring-0 w-full resize-none text-sm min-h-[60px] font-body text-on-surface placeholder:text-on-surface-variant/40 outline-none p-0" 
                  placeholder="Type your response..." 
                  rows="2"
                ></textarea>
                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/5">
                  <div className="flex gap-4">
                    <button className="text-on-surface-variant/60 hover:text-primary transition-all active:scale-90 flex items-center">
                      <span className="material-symbols-outlined text-[22px]">attach_file</span>
                    </button>
                    <button className="text-on-surface-variant/60 hover:text-primary transition-all active:scale-90 flex items-center">
                      <span className="material-symbols-outlined text-[22px]">image</span>
                    </button>
                    <button className="text-on-surface-variant/60 hover:text-primary transition-all active:scale-90 flex items-center">
                      <span className="material-symbols-outlined text-[22px]">mood</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] text-on-surface-variant/40 font-bold font-headline uppercase tracking-widest">Secure Portal</span>
                  </div>
                </div>
              </div>
              <button className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 hover:scale-105 transition-all active:scale-95">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryRequests;
