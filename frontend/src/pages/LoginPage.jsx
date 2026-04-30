import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, ShieldCheck, Mail, Lock, ChevronRight, Stethoscope, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import supabase from '../utils/supabaseClient';
import Seo from '../components/common/SEO';

const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { login } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         await login(email, password);
         toast.success('Identity verified. Welcome back to MedCompare.');
         navigate('/dashboard');
      } catch (err) {
         toast.error(err.response?.data?.message || 'Authentication Protocol Failed');
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
            title="Login"
            description="Sign in to MedCompare to access pharmacy dashboards, saved searches, medicine comparisons, and personalized healthcare insights."
            path="/login"
            noIndex={true}
         />
         {/* Editorial Background Elements */}
         <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -ml-[400px] -mt-[400px]" />
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -mr-[300px] -mb-[300px]" />

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
                     Resume your <span className="text-gradient">Clinical Flow.</span>
                  </h1>
                  <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-lg">
                     Re-enter the atmospheric ecosystem of pharmaceutical intelligence and inventory excellence.
                  </p>
               </div>

               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                        <ShieldCheck size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-on-surface">Secure Multi-Pass</h4>
                        <p className="text-sm text-on-surface-variant/60 font-medium tracking-wide leading-relaxed">256-bit encryption for every clinical session.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                        <Stethoscope size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-on-surface">Real-time Insights</h4>
                        <p className="text-sm text-on-surface-variant/60 font-medium tracking-wide leading-relaxed">Your dashboard is synchronized with global medicine registries.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-[500px]">
               <form onSubmit={handleSubmit} className="med-card p-8 space-y-6 bg-white/90 backdrop-blur-xl">
                  <div className="space-y-2">
                     <h2 className="text-2xl font-headline font-bold text-on-surface">Authentication.</h2>
                     <p className="text-sm text-on-surface-variant font-medium">Verify your clinical credentials to proceed.</p>
                  </div>

                  <div className="space-y-5">
                     <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-outline ml-1">Work Email</label>
                        <div className="relative">
                           <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                           <input 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all" 
                              placeholder="jane@clinic.med" 
                              type="email" 
                           />
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-outline">Secure Password</label>
                           <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>
                        </div>
                        <div className="relative">
                           <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                           <input 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 outline-none font-body transition-all" 
                              placeholder="••••••••" 
                              type="password" 
                           />
                        </div>
                     </div>
                  </div>

                  <button 
                     type="submit"
                     disabled={isSubmitting}
                     className="btn-gradient w-full py-4 rounded-xl font-headline font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                     {isSubmitting ? 'Authenticating...' : 'Sign In Protocol'}
                     <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="text-center">
                     <p className="text-sm text-on-surface-variant font-medium">
                        New to the network? <Link to="/signup" className="text-primary font-bold hover:underline">Register Clinic</Link>
                     </p>
                  </div>

                  <div className="relative flex items-center my-6">
                     <div className="flex-grow border-t border-outline-variant/20"></div>
                     <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-outline">or continue with</span>
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

export default LoginPage;
