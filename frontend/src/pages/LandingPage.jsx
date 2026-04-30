import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const trustSectionRef = useRef(null);
  const [isTrustInView, setIsTrustInView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/medicine-compare?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTrustInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (trustSectionRef.current) {
      observer.observe(trustSectionRef.current);
    }

    return () => {
      if (trustSectionRef.current) {
        observer.unobserve(trustSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-background text-on-surface font-body antialiased">
      {/* TopNavBar */}
      <Navbar fullWidth={true} />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-8 pt-16 pb-32 overflow-hidden">
          <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold mb-6">
                <span className="material-symbols-outlined text-sm text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                TRUSTED BY 10k+ CLINICS
              </div>
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1]">
                Same medicine, <br />
                <span className="text-primary">different prices.</span>
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
                Instantly compare prescription costs across thousands of pharmacies. Stop overpaying for essential healthcare with real-time price transparency.
              </p>
              {/* Search Bar Component */}
              <div className="relative max-w-2xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
                <div className="relative flex items-center bg-surface-container-lowest rounded-xl p-2 shadow-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined ml-4 text-outline">search</span>
                  <input
                    className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-4 text-lg font-medium text-on-surface placeholder:text-on-surface-variant/50 outline-none"
                    placeholder="Enter medicine name (e.g. Atorvastatin)"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <button 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-bold text-lg active:scale-95 transition-transform"
                  >
                    Compare Now
                  </button>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-outline-variant/10">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
                  </div>
                  <div>
                    <p className="text-on-surface font-bold">Avg. ₹45,000</p>
                    <p className="text-on-surface-variant text-xs">Annual Savings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-outline-variant/10">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_pharmacy</span>
                  </div>
                  <div>
                    <p className="text-on-surface font-bold">12,000+</p>
                    <p className="text-on-surface-variant text-xs">Verified Pharmacies</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Hero Image & Floating Cards */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img alt="Professional healthcare provider" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpwCc-dyFIYDyuR3jEW3FXL9j6zcSDtBo9kC2-NfmmgV7ujC6MMqll8tCGnvfG0hdAocr17Fi22IXzm8I7M6oVgiddQme8KU6AhKzOLpH9u5D0Lb6RZyNvlu_14ciCd6aatUBldU_Ydsc8Wq0D-rQKsINAGmMexEfvr1CzQw3tbprXfjbK8oGPabPmZdtUfpvNKiY6jV9h2BfUQZArqsAMYwMIKH5M4UgWGKJp5nhQbEBUPKkj_57pGgzDnhQbCyehzLVZ1i8LIA6D" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              {/* Floating Stat Cards */}
              <div className="absolute -left-12 top-1/4 med-card p-6 w-64">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <span className="font-headline font-bold text-sm">Verified Network</span>
                </div>
                <p className="text-on-surface-variant text-xs leading-relaxed font-body">Every pharmacy on our platform undergoes a rigorous 12-point certification process.</p>
              </div>
              <div className="absolute -right-8 bottom-24 med-card p-6 w-64">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary-container text-on-primary-container rounded-xl shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">update</span>
                  </div>
                  <span className="font-headline font-bold text-sm">Real-time Updates</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-on-surface-variant font-body">Live price sync</span>
                </div>
              </div>
              <div className="absolute left-1/4 -bottom-10 med-card p-6 w-72">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline font-bold text-sm">Savings Insights</span>
                  <span className="text-emerald-600 font-bold text-sm font-body">-₹1,240.00</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-medium font-headline">
                    <span>CURRENT PRICE</span>
                    <span>OPTIMIZED PRICE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Trust Section */}
        <section ref={trustSectionRef} className={`py-24 bg-surface-container-low overflow-hidden transition-opacity duration-1000 ${isTrustInView ? 'in-view opacity-100' : 'opacity-0'}`}>
          <div className="max-w-[1440px] mx-auto px-8 text-center mb-16">
            <h2 className="font-headline text-sm font-extrabold tracking-[0.2em] text-primary uppercase">Partnered with Industry Leaders</h2>
          </div>
          
          <div className="flex flex-col gap-10">
            {/* Row 1: Moving Left */}
            <div className="relative flex overflow-x-hidden pause-row">
              <div className="flex animate-marquee-left gap-20 items-center whitespace-nowrap px-10">
                {[
                  { name: "CVS Pharmacy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjMWU5QR1bDqruOCZ2BA8eGTjr8_slEBJ2Q&s" },
                  { name: "Walgreens", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Walgreens_2020_primary_logo.svg/3840px-Walgreens_2020_primary_logo.svg.png" },
                  { name: "Apollo Pharmacy", img: "https://companieslogo.com/img/orig/APOLLOHOSP.NS_BIG-7f75df62.png?t=1745075250" },
                  { name: "Walmart", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Walmart_logo_%282025%3B_Stacked_alt%29.svg/960px-Walmart_logo_%282025%3B_Stacked_alt%29.svg.png" },
                  { name: "MedPlus", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzFehrK_TNkN1idUO5oKelnJPgT5lPIQl1w&s" },
                  { name: "Pharmeasy", img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/PharmEasy_logo.png" },
                ].concat([
                  { name: "CVS Pharmacy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjMWU5QR1bDqruOCZ2BA8eGTjr8_slEBJ2Q&s" },
                  { name: "Walgreens", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Walgreens_2020_primary_logo.svg/3840px-Walgreens_2020_primary_logo.svg.png" },
                  { name: "Apollo Pharmacy", img: "https://companieslogo.com/img/orig/APOLLOHOSP.NS_BIG-7f75df62.png?t=1745075250" },
                  { name: "Walmart", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Walmart_logo_%282025%3B_Stacked_alt%29.svg/960px-Walmart_logo_%282025%3B_Stacked_alt%29.svg.png" },
                  { name: "MedPlus", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzFehrK_TNkN1idUO5oKelnJPgT5lPIQl1w&s" },
                  { name: "Pharmeasy", img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/PharmEasy_logo.png" },
                ]).map((brand, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="h-20 w-56 bg-white rounded-2xl p-4 border border-slate-200/50 shadow-sm flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-900/10">
                      <img 
                        alt={brand.name} 
                        className={`h-12 w-auto max-w-[85%] object-contain transition-transform duration-500 ${brand.scale || 'scale-100'}`} 
                        src={brand.img} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Moving Right */}
            <div className="relative flex overflow-x-hidden pause-row">
              <div className="flex animate-marquee-right gap-20 items-center whitespace-nowrap px-10">
                {[
                  { name: "Tata 1mg", img: "https://yt3.googleusercontent.com/Nc8ZeH-sYnGEuIuqUICpsFQ2BK8ew8V6BaDf0fp-zQtvf4YNybnAzj6AR0NbWz3JNAHB3nT9CZc=s900-c-k-c0x00ffffff-no-rj" },
                  { name: "Wellness Forever", img: "https://images.yourstory.com/cs/images/companies/Wellness-Forever-1620908476976.png", scale: "scale-[1.5]" },
                  { name: "Rite Aid", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Rite_Aid.svg/960px-Rite_Aid.svg.png" },
                  { name: "Netmeds", img: "https://vectorseek.com/wp-content/uploads/2023/09/Netmeds-Logo-Vector.svg-.png" },
                  { name: "Noble Plus", img: "https://static.cdnlogo.com/logos/n/46/noble.svg", scale: "scale-[1.6]" },
                  { name: "Reliance Retail", img: "https://upload.wikimedia.org/wikipedia/en/a/a9/Reliance_Retail.svg" },
                ].concat([
                  { name: "Tata 1mg", img: "https://yt3.googleusercontent.com/Nc8ZeH-sYnGEuIuqUICpsFQ2BK8ew8V6BaDf0fp-zQtvf4YNybnAzj6AR0NbWz3JNAHB3nT9CZc=s900-c-k-c0x00ffffff-no-rj" },
                  { name: "Wellness Forever", img: "https://images.yourstory.com/cs/images/companies/Wellness-Forever-1620908476976.png", scale: "scale-[1.5]" },
                  { name: "Rite Aid", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Rite_Aid.svg/960px-Rite_Aid.svg.png" },
                  { name: "Netmeds", img: "https://vectorseek.com/wp-content/uploads/2023/09/Netmeds-Logo-Vector.svg-.png" },
                  { name: "Noble Plus", img: "https://static.cdnlogo.com/logos/n/46/noble.svg", scale: "scale-[1.6]" },
                  { name: "Reliance Retail", img: "https://upload.wikimedia.org/wikipedia/en/a/a9/Reliance_Retail.svg" },
                ]).map((brand, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="h-20 w-56 bg-white rounded-2xl p-4 border border-slate-200/50 shadow-sm flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-900/10">
                      <img 
                        alt={brand.name} 
                        className={`h-12 w-auto max-w-[85%] object-contain transition-transform duration-500 ${brand.scale || 'scale-100'}`} 
                        src={brand.img} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Moving Left */}
            <div className="relative flex overflow-x-hidden pause-row">
              <div className="flex animate-marquee-left gap-20 items-center whitespace-nowrap px-10">
                {[
                  { name: "Cipla", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5odkCAwWJnIhUmADU_OSyFzYWlkIx-U7uTA&s" },
                  { name: "Sun Pharma", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3xWZRT0SwFeRm1WBVhSOxSOukK98EC-YB-Q&s" },
                  { name: "Dr. Reddy's", img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Dr._Reddy%27s_Laboratories_logo.svg/3840px-Dr._Reddy%27s_Laboratories_logo.svg.png" },
                  { name: "Lupin", img: "https://logodix.com/logo/2070612.png" },
                  { name: "Zydus", img: "https://companieslogo.com/img/orig/ZYDUSLIFE.NS-ed3a9e6f.png?t=1720244494" },
                  { name: "Glenmark", img: "https://www.freelogovectors.net/wp-content/uploads/2020/09/glenmark-logo-180x85.png", scale: "scale-[1.4]" },
                  { name: "Aster Pharmacy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRH3m8H28BZhom9kFPwqVobxib8VNGJ8qbSw&s" },
                  { name: "Himalaya Wellness", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/The_Himalaya_Drug_Company_logo.svg/1280px-The_Himalaya_Drug_Company_logo.svg.png" },
                ].concat([
                  { name: "Cipla", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5odkCAwWJnIhUmADU_OSyFzYWlkIx-U7uTA&s" },
                  { name: "Sun Pharma", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3xWZRT0SwFeRm1WBVhSOxSOukK98EC-YB-Q&s" },
                  { name: "Dr. Reddy's", img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Dr._Reddy%27s_Laboratories_logo.svg/3840px-Dr._Reddy%27s_Laboratories_logo.svg.png" },
                  { name: "Lupin", img: "https://logodix.com/logo/2070612.png" },
                  { name: "Zydus", img: "https://companieslogo.com/img/orig/ZYDUSLIFE.NS-ed3a9e6f.png?t=1720244494" },
                  { name: "Glenmark", img: "https://www.freelogovectors.net/wp-content/uploads/2020/09/glenmark-logo-180x85.png", scale: "scale-[1.4]" },
                  { name: "Aster Pharmacy", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRH3m8H28BZhom9kFPwqVobxib8VNGJ8qbSw&s" },
                  { name: "Himalaya Wellness", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/The_Himalaya_Drug_Company_logo.svg/1280px-The_Himalaya_Drug_Company_logo.svg.png" },
                ]).map((brand, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="h-20 w-56 bg-white rounded-2xl p-4 border border-slate-200/50 shadow-sm flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-900/10">
                      <img 
                        alt={brand.name} 
                        className={`h-12 w-auto max-w-[85%] object-contain transition-transform duration-500 ${brand.scale || 'scale-100'}`} 
                        src={brand.img} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section className="py-32 px-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-6">Simple steps to <span className="text-primary">significant savings.</span></h2>
                <p className="text-on-surface-variant text-base">We've removed the complexity from healthcare costs. In three simple steps, you'll find the best value for your prescriptions.</p>
              </div>
              <Link to="/medicine-details" className="inline-flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all duration-300">
                View Detailed Guide <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="med-card p-10 flex flex-col gap-8 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500">
                  <span className="material-symbols-outlined text-3xl">search</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-4">1. Search</h3>
                  <p className="text-on-surface-variant leading-relaxed font-body">Type your medication name and dosage to see a comprehensive list of local pharmacies.</p>
                </div>
              </div>
              <div className="med-card p-10 flex flex-col gap-8 group">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-500">
                  <span className="material-symbols-outlined text-3xl">compare_arrows</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-4">2. Compare</h3>
                  <p className="text-on-surface-variant leading-relaxed font-body">Filter by distance, price, or pharmacy rating to find your perfect match.</p>
                </div>
              </div>
              <div className="med-card p-10 flex flex-col gap-8 group">
                <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors duration-500">
                  <span className="material-symbols-outlined text-3xl">qr_code_2</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-4">3. Save</h3>
                  <p className="text-on-surface-variant leading-relaxed font-body">Bring the MedCompare coupon code to the pharmacy and pay the lower price.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Feature Highlight */}
        <section className="py-32 px-8 bg-on-background text-inverse-on-surface overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-headline text-5xl font-bold leading-tight mb-8">Data-driven decisions for your health.</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">insights</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Historical Pricing</h4>
                      <p className="text-inverse-on-surface/60">Track price fluctuations over the last 12 months to know exactly when to refill.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Smart Geofencing</h4>
                      <p className="text-inverse-on-surface/60">Get push notifications when you're near a pharmacy with a better price for your meds.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">family_restroom</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Household Profiles</h4>
                      <p className="text-inverse-on-surface/60">Manage prescriptions for the whole family under one secure dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/5">
                      <p className="text-3xl font-headline font-bold mb-2">98%</p>
                      <p className="text-sm opacity-60">Price Accuracy</p>
                    </div>
                    <div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-3xl">
                      <p className="text-3xl font-headline font-bold mb-2">24/7</p>
                      <p className="text-sm opacity-80">Pharmacist Support</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/5 aspect-square flex flex-col justify-end">
                      <p className="text-sm font-bold tracking-widest uppercase mb-4">Patient Choice</p>
                      <p className="text-lg">Empowering users to choose value over convenience.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/5">
                      <img alt="Technology in healthcare" className="w-full h-32 object-cover rounded-xl mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2pYceGlTypAdn_NDVdpWGeICFs7_VJ5lZ9Po2fzsnUpWopLwVvAUn-7VHEBGEZIkfHJjJ-aSkN8RA_r4c25e9Ps0YfoP0NxU5RV-M0Y2X2qmB5oWCBxHqx76YLZkcmBch0ePtlS1_oCWOTYrMfmZV7wka0_ck_Q4fbxl9lDlpH1pesGZS0m1zmrA0UJgwhPdieHbliYSEaE4t3Ko7RVYnDCpcm42dRGLjiipWIlwaYcq7nwst2LDRx4dYXTU6n4NRF0fU22s8dZRF" />
                      <p className="text-sm font-medium">Integrated digital health records for seamless comparison.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-32 px-8">
          <div className="max-w-[1440px] mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-[3rem] p-16 md:p-24 relative overflow-hidden text-center flex flex-col items-center">
            <div className="relative z-10 max-w-3xl">
              <h2 className="font-headline text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready to stop overpaying?</h2>
              <p className="text-white/80 text-xl mb-12 leading-relaxed">Join 2 million Americans who use MedCompare to save on their life-saving medications every single day.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/signup">
                  <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-xl">Start Saving Today</button>
                </Link>
                <button className="bg-primary-container/20 border border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors">Partner With Us</button>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-48 h-48 border-[20px] border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 border-[40px] border-white rounded-full"></div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-16 border-t border-slate-100 bg-white">
        <div className="flex flex-col items-center justify-center gap-8 px-8 max-w-[1440px] mx-auto">
          <span className="font-headline font-bold text-slate-900 text-3xl tracking-tight">MedCompare<span className="text-primary">.</span></span>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-headline font-semibold">
            <Link to="/privacy" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/partner" className="text-slate-500 hover:text-primary transition-colors">Partner with Us</Link>
            <Link to="/contact" className="text-slate-500 hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="w-24 h-1 bg-slate-100 rounded-full"></div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-headline">Atmospheric Trust in Healthcare</p>
            <p className="text-slate-500 text-sm leading-relaxed text-center max-w-xl font-body">
              © 2026 MedCompare. Empowering patients with transparency and clinical precision. Built for the future of Indian Healthcare.
            </p>
          </div>

          {/* Premium Social Links */}
          <div className="flex gap-4">
            <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100 group shadow-sm">
              <i className="fa-brands fa-linkedin-in text-lg group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all border border-slate-100 group shadow-sm">
              <i className="fa-brands fa-x-twitter text-lg group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all border border-slate-100 group shadow-sm">
              <i className="fa-brands fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" className="h-11 w-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100 group shadow-sm">
              <i className="fa-brands fa-facebook-f text-lg group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
