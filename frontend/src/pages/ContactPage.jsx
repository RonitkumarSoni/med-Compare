import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Globe, ChevronRight, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const ContactMethod = ({ icon: Icon, title, value, desc }) => (
  <Card variant="glass" className="flex flex-col gap-6 p-8 border-primary/5 hover:border-primary/20 transition-all group">
    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
      <Icon size={24} />
    </div>
    <div className="space-y-2">
      <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/40">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-sm text-on-surface-variant/60 font-medium leading-relaxed">{desc}</p>
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
    <div className="max-w-6xl mx-auto space-y-20 py-20 px-6">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full">
           <MessageSquare size={14} />
           <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Clinical Liaison</span>
        </div>
        <h1 className="text-7xl font-display tracking-tight leading-[1.05]">
          Let's talk about <span className="text-gradient">Integrity.</span>
        </h1>
        <p className="text-2xl text-on-surface-variant font-medium leading-relaxed">
          Connect with our clinical support team or reach out to our network architects for enterprise-level inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
           <div className="space-y-6">
              <h2 className="text-3xl font-display">Inquiry Protocol</h2>
              <p className="text-on-surface-variant font-medium">Please provide your clinic or pharmacy ID for prioritized routing.</p>
           </div>
           
           <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input id="fullName" value={formData.fullName} onChange={handleChange} label="Legal Full Name" placeholder="Dr. Jane Cooper" />
                 <Input id="email" value={formData.email} onChange={handleChange} label="Clinical Endpoint Email" type="email" placeholder="jane@clinic.med" />
              </div>
              <Input id="clinicId" value={formData.clinicId} onChange={handleChange} label="Provider ID (Optional)" placeholder="CL-882-QX" />
              <div className="space-y-3">
                 <label className="text-sm font-semibold text-on-surface-variant ml-1">The Narrative (Inquiry Message)</label>
                 <textarea 
                   id="message"
                   value={formData.message}
                   onChange={handleChange}
                   className="w-full bg-surface-container-low p-6 rounded-3xl border border-transparent focus:border-primary/20 focus:bg-white focus:shadow-ambient outline-none transition-all text-on-surface leading-relaxed min-h-[180px]"
                   placeholder="Describe your inquiry with clinical precision..."
                 />
              </div>
              <Button type="submit" size="lg" className="w-full py-6 group text-lg" disabled={isSubmitting}>
                 {isSubmitting ? (
                   <span className="flex items-center">
                     <Loader2 size={20} className="mr-2 animate-spin" /> Transmitting...
                   </span>
                 ) : (
                   <span className="flex items-center">
                     Transmit Signal
                     <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                   </span>
                 )}
              </Button>
           </div>
        </form>

        {/* Info & Side Elements */}
        <div className="space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContactMethod 
                icon={Mail} 
                title="Endpoint Support" 
                value="support@medcompare.is" 
                desc="Aether priority response within 2 clinical hours."
              />
              <ContactMethod 
                icon={Phone} 
                title="Command Center" 
                value="+91 22 8820 0011" 
                desc="Direct line for critical network outages."
              />
              <ContactMethod 
                icon={MapPin} 
                title="Global Hub" 
                value="Sector 5, Medical Sq." 
                desc="Our architectural headquarters in New Delhi."
              />
              <ContactMethod 
                icon={Globe} 
                title="Pharmacy Network" 
                value="12.4K+ Nodes" 
                desc="Active across 42 clinical clusters."
              />
           </div>

           <Card className="p-12 bg-on-surface text-white space-y-8 border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000" />
              
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-secondary">
                    <ShieldCheck size={32} />
                 </div>
                 <h3 className="text-3xl font-display">Priority Access.</h3>
              </div>
              <p className="text-white/60 leading-relaxed font-light text-lg relative z-10">
                 Enterprise partners with active atmospheric monitoring protocols receive dedicated clinical liaisons.
              </p>
              <div className="pt-4 relative z-10">
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-on-surface px-8">Upgrade to Enterprise</Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
