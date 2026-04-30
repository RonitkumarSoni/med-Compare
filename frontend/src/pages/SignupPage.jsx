import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, ShieldCheck, Mail, Lock, User, Building2, ChevronRight, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import supabase from '../utils/supabaseClient';
import Seo from '../components/common/SEO';

const SignupPage = () => {
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      shopName: '',
      email: '',
      phone: '',
      password: '',
      role: 'pharmacy'
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { signup } = useAuth();
   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const name = `${formData.firstName} ${formData.lastName}`;
         await signup({
            name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.role,
            shopName: formData.shopName
         });
         toast.success('Registration successful!');
         navigate('/dashboard');
      } catch (err) {
         // Display specific validation error if available
         const msg = err.response?.data?.errors?.[0] 
            ? Object.values(err.response.data.errors[0])[0] 
            : (err.response?.data?.message || 'Registration failed');
         toast.error(msg);
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleSocialLogin = async (provider) => {
      try {
         const { error } = await supabase.auth.signInWithOAuth({
            provider: provider.toLowerCase(),
            options: {
               redirectTo: window.location.origin + '/dashboard'
            }
         });
         if (error) throw error;
      } catch (err) {
         toast.error(`${provider} login failed: ${err.message}`);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-6 py-12 relative overflow-hidden font-body">
         <Seo
            title="Sign Up"
            description="Create a MedCompare account to compare medicine prices, register your pharmacy, and unlock healthcare pricing intelligence."
            path="/signup"
            noIndex={true}
         />
         {/* Editorial Background Elements */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -mr-[400px] -mt-[400px]" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -ml-[300px] -mb-[300px]" />

         <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
            {/* Left Side: Branding & Value Prop */}
            <div className="flex-1 space-y-12">
               <Link to="/" className="inline-flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-ambient group-hover:rotate-6 transition-transform">
                     <Pill size={28} />
                  </div>
                  <span className="text-3xl font-display font-bold tracking-tight text-on-surface">MedCompare.</span>
               </Link>

               <div className="space-y-6">
                  <h1 className="text-5xl font-display leading-[1.1] tracking-tight text-on-surface">
                     Create your <span className="text-gradient">Clinical Identity.</span>
                  </h1>
                  <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-lg">
                     Join the elite network of healthcare providers leveraging atmospheric data for pharmaceutical excellence.
                  </p>
               </div>

               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                        <ShieldCheck size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-on-surface">Aether Verification</h4>
                        <p className="text-sm text-on-surface-variant/60 font-medium tracking-wide leading-relaxed">Instant verification against global provider registries.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                        <Stethoscope size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-on-surface">Specialist Tooling</h4>
                        <p className="text-sm text-on-surface-variant/60 font-medium tracking-wide leading-relaxed">Advanced diagnostics for clinicians and pharmacists alike.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Side: Signup Form */}
            <div className="w-full lg:w-[500px]">
               <form onSubmit={handleSubmit} className="med-card p-8 space-y-5 bg-white/90 backdrop-blur-xl">
                  <div className="space-y-2">
                     <h2 className="text-2xl font-headline font-bold text-on-surface">Get Started.</h2>
                     <p className="text-sm text-on-surface-variant font-medium">Choose your account type and join us.</p>
                  </div>

                  {/* Role Selection */}
                  <div className="grid grid-cols-2 gap-4 pb-2">
                     <button 
                        type="button"
                        onClick={() => setFormData({...formData, role: 'user'})}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'user' ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' : 'border-outline-variant/10 text-on-surface-variant hover:border-outline-variant/30'}`}
                     >
                        <User size={24} />
                        <span className="text-xs font-bold font-headline tracking-wider uppercase">Consumer</span>
                     </button>
                     <button 
                        type="button"
                        onClick={() => setFormData({...formData, role: 'pharmacy'})}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'pharmacy' ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' : 'border-outline-variant/10 text-on-surface-variant hover:border-outline-variant/30'}`}
                     >
                        <Building2 size={24} />
                        <span className="text-xs font-bold font-headline tracking-wider uppercase">Pharmacy</span>
                     </button>
                  </div>

                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">First Name</label>
                           <input 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all" 
                              placeholder="Jane" 
                              type="text" 
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Last Name</label>
                           <input 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all" 
                              placeholder="Cooper" 
                              type="text" 
                           />
                        </div>
                     </div>

                     {formData.role === 'pharmacy' && (
                        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Pharmacy Name</label>
                           <div className="relative">
                              <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                              <input 
                                 name="shopName"
                                 value={formData.shopName}
                                 onChange={handleChange}
                                 required
                                 className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all" 
                                 placeholder="e.g. Apollo Pharmacy" 
                                 type="text" 
                              />
                           </div>
                        </div>
                     )}

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Work Email</label>
                           <div className="relative">
                              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                              <input 
                                 name="email"
                                 value={formData.email}
                                 onChange={handleChange}
                                 required
                                 className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all text-sm" 
                                 placeholder="jane@clinic.med" 
                                 type="email" 
                              />
                           </div>
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Phone Number</label>
                           <div className="relative">
                              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                              <input 
                                 name="phone"
                                 value={formData.phone}
                                 onChange={handleChange}
                                 required
                                 className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all text-sm" 
                                 placeholder="+91 9876543210" 
                                 type="tel" 
                              />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Secure Password</label>
                        <div className="relative">
                           <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                           <input 
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all" 
                              placeholder="••••••••" 
                              type="password" 
                           />
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                     <input type="checkbox" required id="terms" className="w-4 h-4 mt-0.5 rounded border-outline-variant/20 accent-primary" />
                     <label htmlFor="terms" className="text-[11px] text-on-surface-variant font-medium leading-tight">
                        I agree to the <span className="text-primary font-bold underline cursor-pointer">Atmospheric Terms of Service</span> and clinical data policy.
                     </label>
                  </div>

                  <button 
                     type="submit"
                     disabled={isSubmitting}
                     className="btn-gradient w-full py-4 rounded-xl font-headline font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                     {isSubmitting ? 'Establishing...' : 'Establish Identity'}
                     <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="text-center">
                     <p className="text-sm text-on-surface-variant font-medium">
                        Already registered? <Link to="/login" className="text-primary font-bold hover:underline">Sign In Protocol</Link>
                     </p>
                  </div>

                  <div className="relative flex items-center my-6">
                     <div className="flex-grow border-t border-outline-variant/20"></div>
                     <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-outline">or sign up with</span>
                     <div className="flex-grow border-t border-outline-variant/20"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <button 
                        type="button"
                        onClick={() => handleSocialLogin('Google')}
                        className="flex items-center justify-center gap-3 py-3 bg-white rounded-xl shadow-sm border border-outline-variant/10 hover:bg-surface-container-low transition-all group"
                     >
                        <img alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" />
                        <span className="text-xs font-bold font-headline">Google</span>
                     </button>
                     <button 
                        type="button"
                        onClick={() => handleSocialLogin('Apple')}
                        className="flex items-center justify-center gap-3 py-3 bg-white rounded-xl shadow-sm border border-outline-variant/10 hover:bg-surface-container-low transition-all group"
                     >
                        <svg className="w-5 h-5 fill-current text-on-surface group-hover:scale-110 transition-transform" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-11.7-111.9zM280.3 114.3c29.8-34.3 21.9-66.2 21.9-66.2s-32.3 2.1-56.9 30.5c-27.3 31.4-19.8 63.6-19.8 63.6s30.8 1 54.8-27.9z" /></svg>
                        <span className="text-xs font-bold font-headline">Apple</span>
                     </button>
                  </div>
               </form>

               <p className="text-center mt-8 text-[10px] uppercase font-bold tracking-[0.2em] text-outline/50">
                  Backed by 256-bit clinical encryption
               </p>
            </div>
         </div>
      </div>
   );
};

export default SignupPage;
