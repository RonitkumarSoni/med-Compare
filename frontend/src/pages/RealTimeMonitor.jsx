import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Wifi, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  ShieldCheck,
  RefreshCw,
  Search,
  ChevronRight
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { cn } from '../lib/utils';


const LiveTickerItem = ({ drug, price, change, status }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between p-4 bg-white rounded-xl border border-outline-variant/10 shadow-sm"
  >
    <div className="flex items-center gap-3">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        status === 'up' ? "bg-error/10 text-error" : "bg-secondary/10 text-secondary"
      )}>
        {status === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      </div>
      <div>
        <p className="font-bold text-sm tracking-tight">{drug}</p>
        <p className="text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">Real-Time Flow</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-sm">₹{price}</p>
      <p className={cn("text-[10px] font-bold", status === 'up' ? "text-error" : "text-secondary")}>
        {status === 'up' ? '+' : ''}{change}%
      </p>
    </div>
  </motion.div>
);

const RealTimeMonitor = () => {
  const [activeSignals, setActiveSignals] = useState(452);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignals(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const alerts = [
    { type: 'Price Surge', drug: 'Amoxicillin 500mg', impact: 'High', time: '2m ago' },
    { type: 'Stock Drain', drug: 'Lisinopril 10mg', impact: 'Critical', time: '12m ago' },
    { type: 'Network Add', drug: 'MedPlus Hub', impact: 'Optimistic', time: '45m ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Live Clinical Feed</span>
          </div>
          <h1 className="text-5xl tracking-tight leading-none">The Pulse.</h1>
          <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-lg">
            A real-time atmospheric visualization of pharmaceutical movements across the global Aether Network.
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2"><RefreshCw size={12} className="text-primary/20 animate-spin-slow" /></div>
           <div className="text-right">
              <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/40 mb-1">Active Signals</p>
              <p className="text-4xl font-display leading-none text-primary">{activeSignals}</p>
           </div>
           <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Wifi size={24} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Live Ticker Area */}
         <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-display">Data Stream</h3>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary flex items-center gap-1">
                <ShieldCheck size={12} /> Syncing
              </span>
            </div>
            <div className="space-y-3">
              <LiveTickerItem drug="Metformin 850mg" price="342.00" change="2.4" status="up" />
              <LiveTickerItem drug="Atorvastatin 20mg" price="890.00" change="1.2" status="down" />
              <LiveTickerItem drug="Lisinopril 10mg" price="120.00" change="4.8" status="up" />
              <LiveTickerItem drug="Paracetamol 500" price="45.00" change="0.5" status="down" />
              <LiveTickerItem drug="Clavmox 625" price="380.00" change="1.1" status="up" />
            </div>
         </div>

         {/* Visual Pulse / Map Placeholder */}
         <div className="lg:col-span-2 space-y-8">
            <Card variant="glass" className="h-[400px] border-primary/20 bg-primary/5 flex flex-col items-center justify-center relative overflow-hidden group">
               {/* Background Glows */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
               
               {/* Central Pulse Element */}
               <div className="relative flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-40 h-40 bg-primary/20 rounded-full"
                  />
                  <div className="w-24 h-24 bg-white rounded-full shadow-ambient flex items-center justify-center text-primary relative z-10 border-4 border-primary/10">
                     <Activity size={40} className="animate-pulse" />
                  </div>
               </div>

               <div className="mt-12 text-center relative z-10">
                  <h3 className="text-2xl mb-2">Atmospheric Signal Strength: 98%</h3>
                  <p className="text-sm font-medium text-on-surface-variant/60 uppercase tracking-[0.3em]">Processing 4.2TB/s of clinical data</p>
               </div>
               
               {/* Floating Data Points */}
               <div className="absolute top-12 left-12 p-3 glass rounded-xl text-xs font-bold border-white/40 flex items-center gap-2">
                 <div className="w-2 h-2 bg-secondary rounded-full" /> New Delhi Cluster
               </div>
               <div className="absolute bottom-12 right-12 p-3 glass rounded-xl text-xs font-bold border-white/40 flex items-center gap-2">
                 <div className="w-2 h-2 bg-error rounded-full" /> Mumbai Drift Detected
               </div>
            </Card>

            {/* Critical Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="flex flex-col gap-6 p-8 border-none bg-surface-container-low shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-error/10 rounded-xl flex items-center justify-center text-error"><AlertCircle size={20} /></div>
                    <h4 className="text-xl font-display">System Anomalies</h4>
                  </div>
                  <div className="space-y-4">
                    {alerts.map((alert, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/5 last:border-0">
                        <div>
                          <p className="font-bold text-sm">{alert.drug}</p>
                          <p className="text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">{alert.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-error">{alert.impact}</p>
                          <p className="text-[10px] font-medium text-on-surface-variant/40">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-widest">Full Diagnostics</Button>
               </Card>

               <Card className="flex flex-col items-center justify-center gap-6 p-8 text-center bg-surface-container-lowest border border-outline-variant/10 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-50" />
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white relative z-10">
                    <TrendingUp size={28} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl mb-2">Automated Ops</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Your clinical floor is currently optimized. Total procurement efficiency is at a 6-month high.
                    </p>
                  </div>
                  <Button variant="tonal" className="w-full relative z-10">Audit Optimization</Button>
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;
