import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Globe, 
  Zap, 
  AlertTriangle, 
  Users, 
  BarChart3,
  Server,
  ArrowUpRight,
  Search,
  MessageSquare,
  Lock
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { cn } from '../lib/utils';


const NetworkNode = ({ name, location, load, status }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-ambient transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
        status === 'Healthy' ? "bg-secondary/10 text-secondary" : "bg-error/10 text-error"
      )}>
        <Server size={20} />
      </div>
      <div>
        <p className="font-bold text-sm leading-none mb-1 group-hover:text-primary transition-colors">{name}</p>
        <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/40">{location}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-on-surface-variant">{load}% Load</p>
      <div className={cn(
        "text-[8px] uppercase font-extrabold tracking-[0.2em] mt-1",
        status === 'Healthy' ? "text-secondary" : "text-error"
      )}>
        {status}
      </div>
    </div>
  </div>
);

const AdminOversight = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-outline-variant/10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-on-surface text-white rounded-full">
            <Lock size={12} />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Restricted: Admin Protocol</span>
          </div>
          <h1 className="text-5xl tracking-tight leading-none">Network Command.</h1>
          <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-lg">
            Complete architectural oversight of the Aether Pharmacy Network and data integrity clusters.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Search size={18} />
            Audit Logs
          </Button>
          <Button className="gap-2 bg-on-surface text-white hover:bg-on-surface/90">
            <Zap size={18} />
            System Override
          </Button>
        </div>
      </div>

      {/* Global Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue Flow', val: '₹142.8M', trend: '+14%', icon: Building2 },
          { label: 'Network Uptime', val: '99.998%', trend: 'Stable', icon: ShieldCheck },
          { label: 'Total Clinic Pods', val: '12,402', trend: '+452', icon: Globe },
          { label: 'Active Data Streams', val: '89.2K', trend: '+2K', icon: Zap },
        ].map((stat, i) => (
          <Card key={i} variant="flat" className="flex flex-col gap-4 border-none shadow-sm hover:shadow-ambient transition-all">
             <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-secondary">{stat.trend}</span>
             </div>
             <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/40 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-display">{stat.val}</h3>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Network Infrastructure Nodes */}
        <div className="space-y-6">
           <h3 className="text-2xl font-display px-2">Regional Clusters</h3>
           <div className="space-y-3">
              <NetworkNode name="North India Hub" location="New Delhi" load={42} status="Healthy" />
              <NetworkNode name="Southern Corridor" location="Bangalore" load={88} status="Healthy" />
              <NetworkNode name="Coastal Alpha" location="Mumbai" load={94} status="Healthy" />
              <NetworkNode name="Eastern Grid" location="Kolkata" load={12} status="Healthy" />
              <NetworkNode name="Central Ops" location="Nagpur" load={65} status="Warning" />
           </div>
           <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest text-primary gap-2">
              Scale Network <ArrowUpRight size={14} />
           </Button>
        </div>

        {/* Global Heatmap Placeholder & Insights */}
        <div className="lg:col-span-2 space-y-10">
           <Card variant="glass" className="h-[450px] bg-on-surface/5 border-on-surface/10 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'radial-gradient(circle at center, #0055c9 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
              <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
              
              <div className="relative flex items-center justify-center">
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className="w-64 h-64 border-2 border-dashed border-primary/20 rounded-full"
                 />
                 <div className="absolute w-16 h-16 bg-white rounded-2xl shadow-ambient flex items-center justify-center text-primary animate-bounce">
                    <Globe size={40} />
                 </div>
              </div>

              <div className="mt-12 text-center relative z-10 space-y-2">
                 <h3 className="text-3xl font-display">Atmospheric Heat Rendering</h3>
                 <p className="text-sm font-medium text-on-surface-variant/60 uppercase tracking-[0.4em]">Visualizing 12,402 Active Instances</p>
              </div>

              {/* Floating Labels */}
              <div className="absolute top-20 left-20 glass p-3 rounded-xl border-white/20 text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" /> Peak Load: 98.2%
              </div>
              <div className="absolute bottom-20 right-20 glass p-3 rounded-xl border-white/20 text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" /> Optimization Active
              </div>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="flex flex-col gap-6 p-8 border-none bg-surface-container-low">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-on-surface-variant shadow-sm"><Users size={20} /></div>
                   <h4 className="text-xl font-display">Governance Oversight</h4>
                 </div>
                 <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                    Monitor clinician and admin access patterns. Ensure strict compliance with the Atmospheric Data protocol.
                 </p>
                 <Button variant="outline" className="w-full">Access Registry</Button>
              </Card>

              <Card className="flex flex-col gap-6 p-8 border-none bg-primary/5 text-primary">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm"><MessageSquare size={20} /></div>
                   <h4 className="text-xl font-display text-on-surface">Concierge Inbox</h4>
                 </div>
                 <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                    Manage direct communications with top-tier clinical partners and enterprise pharmacy chains.
                 </p>
                 <Button variant="primary" className="w-full">Open Inbox</Button>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOversight;
