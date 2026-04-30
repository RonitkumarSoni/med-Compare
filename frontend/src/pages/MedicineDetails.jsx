import React from 'react';
import { Link } from 'react-router-dom';

const MedicineDetails = () => {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 mb-16">
        <div className="relative rounded-[2rem] overflow-hidden min-h-[500px] flex items-center bg-surface-container-low">
          <div className="absolute inset-0">
            <img 
              className="w-full h-full object-cover opacity-10" 
              alt="high-end pharmaceutical laboratory interior with blurred sterile equipment and clean bright atmosphere" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcnxp2MXPXzh6xgKnFIcXYGn7OiJyJr5m-UUXBjearpakkUkjTdd2SpqIUdrfuatqSAC0rX6GCZV4I4bpvgd5vp7jpr7s9C7LLnU8RB9bhn5b7jDs0_tyMGUONuFXCaduKYpIhBubxD-PexXot-4mXabeZ4fc9sN02vN0Xnrl7MRw-NQ3kyPuAwfDT3zw3M8cHye4mkDorTHSDnPS1UoqyoYDit85yYqJYwxLs6Q41BtCzssRnA6MG-kv_vK5lRadI24Yl9G1mi687"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/80 to-transparent"></div>
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 w-full px-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex gap-3">
                <span className="px-4 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold tracking-wider">CDSCO APPROVED</span>
                <span className="px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-wider">PRESCRIPTION REQUIRED</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-headline font-extrabold text-on-surface leading-tight tracking-tighter">Atorvastatin Calcium</h1>
              <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-2xl">
                A statin medication used to prevent cardiovascular disease in those at high risk and treat abnormal lipid levels. Designed for precision lipid control.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-on-primary font-headline font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-900/10 active:scale-95 transition-transform">
                  Add to Watchlist
                </button>
                <button className="bg-surface-container-lowest text-primary font-headline font-bold px-8 py-4 rounded-xl shadow-sm active:scale-95 transition-transform border border-outline-variant/20">
                  Find Nearest Pharmacy
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                <img 
                  className="relative w-80 h-80 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
                  alt="ultra close-up of a white medicine bottle on a reflective white surface with soft blue professional lighting" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmghRculPTjPTG6cIrzglpu857YWBH1G1lfXNBlP7vaOXXmzSMEeQKtOgqGkfqqlaPB--FgWUppvEVZrt8LlPTLtcs9VDySzMCFTJD0MK--9UWTIHWiZ6rLLbcG8xV2RSadzZUWz8n30YNCVjTxFNKaZ_g4FJjlM0_kGobCQ8CEq3UMnCivwDUVU32SajAI92qWmMvMo7SSjyCrS7SXUyKXz8jwUL94S54-dGBXyHyFQbFyvwxLyNsDERH435DVDtaqm5vucBFVo0M"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Information Grid */}
      <section className="max-w-[1440px] mx-auto px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Dosage & Usage */}
          <div className="md:col-span-8 med-card p-10">
            <h3 className="text-3xl font-headline font-bold text-on-surface mb-8">Clinical Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined">medication</span>
                  <h4 className="font-headline font-bold text-lg">Dosage Instructions</h4>
                </div>
                <p className="text-on-surface-variant leading-relaxed font-body">
                  Typical starting dose is 10 mg or 20 mg once daily. For those who require a large reduction in LDL-C (more than 45%), therapy may be started at 40 mg once daily.
                </p>
                <ul className="space-y-2 pt-2 font-body">
                  <li className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    Take at the same time each day.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    Can be taken with or without food.
                  </li>
                </ul>
              </div>
              <div className="space-y-4 font-body">
                <div className="flex items-center gap-3 text-error font-headline">
                  <span className="material-symbols-outlined">warning</span>
                  <h4 className="font-bold text-lg">Precautions</h4>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Avoid drinking large amounts of grapefruit juice while taking this medicine. Grapefruit can increase the amount of the drug in your blood.
                </p>
                <div className="p-4 bg-error-container/20 rounded-xl border border-error/10">
                  <p className="text-xs font-bold text-on-error-container uppercase tracking-widest mb-1 font-headline">Critical Interaction</p>
                  <p className="text-sm text-on-error-container/80">Tell your doctor about all other medicines you use, especially other cholesterol drugs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Effects Card */}
          <div className="md:col-span-4 bg-surface-container-high p-10 rounded-[2rem] flex flex-col justify-between med-card border-none shadow-none hover:shadow-xl">
            <div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-6">Side Effects</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">sentiment_neutral</span>
                  </div>
                  <div className="font-body">
                    <p className="font-bold text-on-surface">Common</p>
                    <p className="text-sm text-on-surface-variant">Nasopharyngitis, arthralgia, diarrhea.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-error shadow-sm">
                    <span className="material-symbols-outlined">health_metrics</span>
                  </div>
                  <div className="font-body">
                    <p className="font-bold text-on-surface">Rare &amp; Serious</p>
                    <p className="text-sm text-on-surface-variant">Unexplained muscle pain or weakness.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-on-surface/5">
              <Link to="#" className="text-primary font-bold inline-flex items-center gap-2 group font-headline">
                Read Full Pharmacist Notes
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacy Price Comparison */}
      <section className="max-w-[1440px] mx-auto px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">Pharmacy Price Comparison</h2>
            <p className="text-on-surface-variant text-lg font-body">Compare real-time availability and costs at verified local pharmacies.</p>
          </div>
          <div className="flex bg-surface-container-low p-1.5 rounded-2xl gap-2 font-headline">
            <button className="bg-surface-container-lowest px-6 py-2 rounded-xl shadow-sm text-primary font-bold">List View</button>
            <button className="px-6 py-2 rounded-xl text-on-surface-variant font-medium hover:bg-white/50 transition-colors">Map View</button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Pharmacy Row 1 */}
          <div className="med-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex items-center gap-6 lg:w-1/3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="clean modern pharmacy counter" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuwzyDV7hQRD20xSN2fdHzzFrYD2scYDNNJfVG24Q_QJX9nihytvam_b4Ft1UaVGwK-ts5sNy2pz1nPbHz88yFDL6Y2ZgTtB9SStplVhA6272vuslnAyxlRjFIL6p57xeem7Fm-USXOx9P1wPcvQtqpRvgJ4X2rEuKK0NfiRVdfUy7F637Ug7eG9im-thn6wkhjPXXlhN1-mnQLM97GKm49c-9X8RMu8NVegY0v-cMdRz7Ky8Dgp1ZqjNg0aJC4Oi49HNyJaB-396p"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">Apollo Pharmacy</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm mt-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>0.8 km away • HSR Layout</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8 border-t lg:border-t-0 lg:border-l border-outline-variant/10 pt-6 lg:pt-0 lg:pl-8 items-center">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Availability</p>
                  <div className="flex items-center gap-2 text-secondary font-bold">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    In Stock (High)
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Generic Price</p>
                  <div className="text-2xl font-headline font-extrabold text-on-surface">₹145.00</div>
                </div>
                <div className="col-span-2 lg:col-span-1 flex justify-end">
                  <button className="w-full lg:w-auto bg-primary/10 hover:bg-primary hover:text-on-primary text-primary font-bold px-8 py-3 rounded-xl transition-all duration-200">
                    Select Pharmacy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pharmacy Row 2 */}
          <div className="med-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex items-center gap-6 lg:w-1/3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="professional pharmacy storefront" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQqa5I28b1xQdLlHjIJSLgyR7mSMfNDJI3lQWy8FGKY05URapJI6W6wEWgQP0Ahnc5hratid-3l7NDJD_Q7y-xzSRIPKpPJKbrp-40WPnyGC2qN6wtvGoS2gukIY-e6Hggx_o9X3tPpXnrmIg7W_9DJUjxlzlv3TKaH60MPQTiwxoeklzSjlVslZRwKTEjU1xZEJHg05gvyjslmal_ua4A-fGrOZZjj-qSlpwERXtZsavuaClctFNqJV66iTglLk0JQNhcwtv3MK_w"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">MedPlus Pharmacy</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm mt-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>1.5 km away • Indiranagar</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8 border-t lg:border-t-0 lg:border-l border-outline-variant/10 pt-6 lg:pt-0 lg:pl-8 items-center">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Availability</p>
                  <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                    Low Stock (2 remaining)
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Generic Price</p>
                  <div className="text-2xl font-headline font-extrabold text-on-surface">₹182.00</div>
                </div>
                <div className="col-span-2 lg:col-span-1 flex justify-end">
                  <button className="w-full lg:w-auto bg-primary/10 hover:bg-primary hover:text-on-primary text-primary font-bold px-8 py-3 rounded-xl transition-all duration-200">
                    Select Pharmacy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pharmacy Row 3 */}
          <div className="med-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex items-center gap-6 lg:w-1/3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="modern minimalist pharmacy interior" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTFkCuBtJpJ3gbgQvei3QqlMleDR1KpDRCTNivLCicdhqQfdIWxjHK-L6CsLjXHZwDKYlpG0dSTZEFRVn1ZfiHOJDmatOIqKmHbeUm26hI90hrIeSP1ABDbBBhc2Ke8t-o6sYnVs_z4rPMu3NgeLDrCH1Xvo3x8j0sjXM9DVGZwslH9nSL3T3fh-qCRm2dGwER4xXs-ac-4DN_GNpByne1gasqcYBms5HEhNevciWCDcSUjCnUF-Lxs9hZfaZ7qAHOCM7Z_SAcaYxJ"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">Wellness Forever</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm mt-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>2.8 km away • Koramangala</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-8 border-t lg:border-t-0 lg:border-l border-outline-variant/10 pt-6 lg:pt-0 lg:pl-8 items-center">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Availability</p>
                  <div className="flex items-center gap-2 text-secondary font-bold">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    In Stock
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Generic Price</p>
                  <div className="text-2xl font-headline font-extrabold text-on-surface">₹129.99</div>
                </div>
                <div className="col-span-2 lg:col-span-1 flex justify-end">
                  <button className="w-full lg:w-auto bg-primary/10 hover:bg-primary hover:text-on-primary text-primary font-bold px-8 py-3 rounded-xl transition-all duration-200">
                    Select Pharmacy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MedicineDetails;
