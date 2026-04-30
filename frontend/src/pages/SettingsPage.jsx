import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe, 
  Lock, 
  Settings,
  ChevronRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { cn } from '../lib/utils';


const SettingItem = ({ icon: Icon, label, desc, active = false }) => (
  <button className={cn(
    "w-full flex items-center justify-between p-4 rounded-xl transition-all group border border-transparent",
    active ? "bg-primary/5 border-primary/10 text-primary" : "hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface"
  )}>
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
        active ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant/60 group-hover:bg-primary group-hover:text-white"
      )}>
        <Icon size={20} />
      </div>
      <div className="text-left">
        <p className="font-bold text-sm leading-none mb-1">{label}</p>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">{desc}</p>
      </div>
    </div>
    <ChevronRight size={16} className={cn("transition-transform group-hover:translate-x-1", active ? "text-primary" : "text-on-surface-variant/20")} />
  </button>
);

const SettingsPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl tracking-tight">System Settings.</h1>
        <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-lg">
          Configure your clinical atmospheric presence and data protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Navigation Sidebar */}
        <div className="space-y-4">
          <SettingItem icon={User} label="Clinic Profile" desc="Identity & Metadata" active />
          <SettingItem icon={Shield} label="Security Protocol" desc="Encryption & Access" />
          <SettingItem icon={Bell} label="Data Alerts" size={12} desc="Atmospheric Notifications" />
          <SettingItem icon={CreditCard} label="Clinical Subscription" desc="Plan & Billing" />
          <SettingItem icon={Globe} label="Network Visibility" desc="Pharmacy Outreach" />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-10 space-y-10 border-outline-variant/10 shadow-sm">
            {/* profile Header */}
            <div className="flex items-center gap-6 pb-10 border-b border-outline-variant/10">
              <div className="w-24 h-24 rounded-3xl bg-surface-container-high border-2 border-primary/10 flex items-center justify-center text-primary relative overflow-hidden">
                <Stethoscope size={48} strokeWidth={1} />
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-black/20 flex items-center justify-center text-[8px] font-bold uppercase tracking-widest text-white cursor-pointer hover:bg-black/40 transition-colors">Change</div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-display">Sanjeevani Health Clinic</h2>
                <p className="text-on-surface-variant font-medium">Provider ID: <span className="font-mono text-xs font-bold tracking-tighter">CL-882-QX</span></p>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-secondary/10 text-secondary rounded text-[10px] font-extrabold uppercase tracking-widest mt-2">
                  <ShieldCheck size={12} /> verified provider
                </div>
              </div>
            </div>

            {/* Form Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input id="clinic-name" label="Clinic Legal Name" defaultValue="Sanjeevani Health Clinic" />
              <Input id="clinic-id" label="Primary Medical License" defaultValue="MED-8829-001" placeholder="Enter Registration #" />
              <Input id="email" label="Clinical Endpoint Email" defaultValue="contact@sanjeevani.in" type="email" />
              <Input id="phone" label="Authorized Phone" defaultValue="+91 98220 00112" />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-on-surface-variant ml-1">Clinic Narrative (Bio)</label>
              <textarea 
                className="w-full bg-surface-container-low p-5 rounded-2xl border border-transparent focus:border-primary/20 focus:bg-white focus:shadow-sm outline-none transition-all text-on-surface leading-relaxed min-h-[120px]"
                defaultValue="A leading-edge facility focused on atmospheric healthcare comparison and patient-centric pharmacy data flow."
              />
            </div>

            <hr className="border-outline-variant/10" />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold">System Discovery</h3>
                <p className="text-xs text-on-surface-variant font-medium">Allow pharmacies to find your clinical endpoint automatically.</p>
              </div>
              {/* Simple Toggle Placeholder */}
              <div className="w-14 h-8 bg-primary rounded-full relative p-1 cursor-pointer">
                <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-4">
              <Button variant="ghost" className="font-bold uppercase tracking-widest text-xs">Reset Changes</Button>
              <Button size="lg" className="px-10">Update Protocol</Button>
            </div>
          </Card>

          {/* Secondary Info Card */}
          <Card variant="glass" className="bg-error/5 border-error/10 p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center text-error shrink-0">
              <Lock size={32} />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-display text-error">Security Anchor</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                Your account is currently using <span className="font-bold underline">Standard Encryption</span>. Upgrade to Atmospheric Vault for compliance with the 2026 Medical Data Act.
              </p>
            </div>
            <Button variant="outline" className="shrink-0 border-error/20 text-error hover:bg-error hover:text-white">Upgrade Security</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
