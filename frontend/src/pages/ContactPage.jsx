import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Globe, ChevronRight, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Seo from '../components/common/SEO';

const ContactMethod = ({ icon: Icon, title, value, desc }) => (
  <Card variant="glass" className="flex flex-col gap-6 px-10 py-10 border-primary/5 hover:border-primary/20 transition-all group hover:shadow-2xl hover:shadow-primary/5 bg-white/50 backdrop-blur-xl">
    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
      <Icon size={28} />
    </div>
    <div className="space-y-3">
      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60">{title}</p>
      <h3 className="text-xl md:text-2xl font-bold text-on-surface break-words">{value}</h3>
      <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{desc}</p>
    </div>
  </Card>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    clinicId: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call for sending email
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Signal Transmitted! Our clinical team will contact you shortly.', { theme: 'dark' });
      setFormData({ fullName: '', email: '', clinicId: '', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 md:space-y-24 pt-28 md:pt-36 pb-20 md:pb-28 px-6">
      <Seo
        title="Contact MedCompare"
        description="Reach the MedCompare team for pharmacy onboarding, support questions, and enterprise healthcare partnership inquiries in India."
        path="/contact"
      />
      {/* Editorial Header */}
      <div className="max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20">
           <MessageSquare size={16} className="animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Clinical Liaison</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display tracking-tight leading-[1.05] text-on-surface">
          Let's talk about <br className="hidden md:block" /><span className="text-gradient">Integrity.</span>
        </h1>
        <p className="text-xl md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-2xl">
          Connect with our clinical support team or reach out to our network architects for partnership inquiries across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-5 space-y-12">
          <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12 bg-white/40 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm backdrop-blur-sm">
             <div className="space-y-4">
                <h2 className="text-3xl font-display text-on-surface">Inquiry Protocol</h2>
                <p className="text-on-surface-variant font-medium">Please provide your clinic or pharmacy details.</p>
             </div>
             
             <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                   <Input id="fullName" value={formData.fullName} onChange={handleChange} label="Legal Full Name" placeholder="Dr. Arjun Sharma" />
                   <Input id="email" value={formData.email} onChange={handleChange} label="Clinical Endpoint Email" type="email" placeholder="arjun.sharma@clinic.in" />
                </div>
                <Input id="clinicId" value={formData.clinicId} onChange={handleChange} label="Provider ID (Optional)" placeholder="MC-IND-2024-Q4" />
                <div className="space-y-3">
                   <label className="text-sm font-semibold text-on-surface-variant ml-1">The Narrative (Inquiry Message)</label>
                   <textarea 
                     id="message"
                     value={formData.message}
                     onChange={handleChange}
                     className="w-full bg-surface-container-low p-6 rounded-3xl border border-slate-100 focus:border-primary/30 focus:bg-white focus:shadow-ambient outline-none transition-all text-on-surface leading-relaxed min-h-[180px] font-body"
                     placeholder="Describe your inquiry with clinical precision..."
                   />
                </div>
                <Button type="submit" size="lg" className="w-full py-6 group text-lg rounded-2xl shadow-xl shadow-primary/20" disabled={isSubmitting}>
                   {isSubmitting ? (
                     <span className="flex items-center">
                       <Loader2 size={22} className="mr-3 animate-spin" /> Transmitting...
                     </span>
                   ) : (
                     <span className="flex items-center justify-center font-bold">
                       Transmit Signal
                       <ArrowRight size={22} className="ml-3 transition-transform group-hover:translate-x-2" />
                     </span>
                   )}
                </Button>
             </div>
          </form>
        </div>

        {/* Info & Side Elements */}
        <div className="lg:col-span-7 space-y-12 md:space-y-16">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ContactMethod 
                icon={Mail} 
                title="Endpoint Support" 
                value="support@medcompare.in" 
                desc="Aether priority response within 2 clinical hours."
              />
              <ContactMethod 
                icon={Phone} 
                title="Command Center" 
                value="+91 98765 43210" 
                desc="Direct line for critical network outages."
              />
              <ContactMethod 
                icon={MapPin} 
                title="Global Hub" 
                value="Connaught Place, New Delhi" 
                desc="Our architectural headquarters in the heart of India."
              />
              <ContactMethod 
                icon={Globe} 
                title="Pharmacy Network" 
                value="15K+ Active Nodes" 
                desc="Verified across 50+ major Indian cities."
              />
           </div>

           {/* Premium Priority Access Section */}
           <div className="p-10 md:p-16 bg-slate-950 text-white space-y-10 relative overflow-hidden group rounded-[3rem] shadow-2xl border border-white/5">
              {/* Dynamic Background Elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-125 transition-transform duration-1000 opacity-60" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-[80px] -ml-32 -mb-32 opacity-40" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                 <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-secondary shadow-inner border border-white/20 group-hover:rotate-12 transition-transform duration-500">
                    <ShieldCheck size={40} strokeWidth={1.5} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white">Priority Access.</h3>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                 </div>
              </div>

              <p className="text-white/80 leading-relaxed font-body text-lg md:text-xl relative z-10 max-w-2xl">
                 Enterprise partners with active atmospheric monitoring protocols receive dedicated clinical liaisons for Indian supply chain verification and real-time network audits.
              </p>

              <div className="pt-6 relative z-10 flex flex-wrap gap-6">
                 <Button variant="outline" className="w-full md:w-auto border-white/20 text-white hover:bg-white hover:text-slate-950 px-10 py-6 rounded-2xl font-bold text-lg transition-all group/btn">
                    Upgrade to Enterprise
                    <ArrowRight size={20} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                 </Button>
                 <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-white/90 uppercase tracking-widest">Nodes Active</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
