import React from 'react';
import { motion } from 'framer-motion';
import { 
  Pill, 
  Globe, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Users, 
  Target, 
  Eye,
  Activity
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { cn } from '../lib/utils';


const StatItem = ({ val, label }) => (
  <div className="text-center space-y-2">
    <h3 className="text-5xl font-display text-primary">{val}</h3>
    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant/40">{label}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-32 py-20 px-6 overflow-hidden">
      {/* Hero Narrative */}
      <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
        <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary"
        >
           <Pill size={32} />
        </motion.div>
        <h1 className="text-7xl font-display leading-[1.05] tracking-tight">
          Architecting the <span className="text-gradient">Atmospheric</span> future of healthcare.
        </h1>
        <p className="text-2xl text-on-surface-variant font-medium leading-relaxed max-w-2xl">
          MedCompare was born from a singular clinical vision: to bridge the transparency gap in global pharmaceutical distribution.
        </p>
      </div>

      {/* Mission & Vision Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/5 text-secondary rounded-full">
               <Target size={14} />
               <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Our Mission</span>
            </div>
            <h2 className="text-5xl font-display leading-tight">Verification at <span className="italic">scale</span>.</h2>
            <p className="text-on-surface-variant font-medium text-lg leading-relaxed">
              We empower providers with the data narrative needed to ensure every patient receives the most authentic, cost-optimized medication through our Aether Verified hub.
            </p>
            <div className="pt-4 flex items-center gap-8">
               <StatItem val="12.4K" label="Active Hubs" />
               <div className="w-[1px] h-12 bg-outline-variant/20" />
               <StatItem val="99.9%" label="Accuracy" />
               <div className="w-[1px] h-12 bg-outline-variant/20" />
               <StatItem val="42" label="Clusters" />
            </div>
         </div>
         <Card variant="glass" className="h-[500px] border-secondary/10 bg-secondary/5 relative overflow-hidden group">
            <div className="absolute inset-x-0 bottom-0 p-12 space-y-6 z-10 transition-transform duration-700 group-hover:-translate-y-4">
               <h3 className="text-3xl text-secondary">The Clinical Pulse</h3>
               <p className="text-on-surface-variant font-medium leading-relaxed">
                 Our proprietary monitoring system tracks pharmaceutical drift in real-time, preventing supply-chain anomalies before they reach the patient.
               </p>
            </div>
            {/* Visual Abstract */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
               <Activity size={320} className="text-secondary animate-pulse" strokeWidth={1} />
            </div>
         </Card>
      </div>

      {/* The Pillars Section */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
           <h2 className="text-5xl font-display">Our Design Pillars.</h2>
           <p className="text-on-surface-variant font-medium text-lg">How we maintain the editorial authority of medical data.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Clinical Integrity', desc: 'Every data point is cross-verified against multiple global registries.', icon: ShieldCheck },
             { title: 'Global Reach', desc: 'Expanding medical transparency across all clinical corridors and regions.', icon: Globe },
             { title: 'Instantaneous Flow', desc: 'Real-time sync protocols ensure zero-latency pharmaceutical comparisons.', icon: Zap }
           ].map((pillar, i) => (
             <Card key={i} className="p-12 space-y-8 border-outline-variant/10 hover:shadow-ambient transition-all">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white">
                   <pillar.icon size={28} />
                </div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-display">{pillar.title}</h3>
                   <p className="text-on-surface-variant font-medium leading-relaxed">{pillar.desc}</p>
                </div>
             </Card>
           ))}
        </div>
      </div>

      {/* Call to Action Row */}
      <Card variant="surface" className="p-20 text-center bg-on-surface text-white space-y-10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64" />
         <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-6xl font-display leading-tight">Ready to integrate the <span className="text-gradient">Atmospheric</span> protocol?</h2>
            <p className="text-white/60 text-xl font-light leading-relaxed">
              Join 12,402 clinicians who have already transformed their procurement narratives.
            </p>
            <div className="flex justify-center gap-6 pt-4">
               <Button size="lg" className="px-10">Establish Identity</Button>
               <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-on-surface px-10">Talk to Liaison</Button>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default AboutPage;
