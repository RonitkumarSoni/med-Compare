import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, Globe, Eye, CheckCircle2, ChevronRight, Scale } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const LegalSection = ({ title, content, icon: Icon }) => (
  <div className="space-y-6 pt-12 first:pt-0 border-t border-outline-variant/10 first:border-0 group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      <h2 className="text-3xl font-display">{title}</h2>
    </div>
    <div className="space-y-4 text-on-surface-variant font-medium leading-[1.8] pl-14">
      {content.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  </div>
);

const PrivacyPage = () => {
  const sections = [
    {
      title: "Atmospheric Data Protocol",
      icon: Eye,
      content: [
        "The Aether Data Protocol governs the collection and synchronization of all clinical signals within the MedCompare network. We prioritize the integrity of pharmaceutical metadata over individual provider specifics.",
        "Data 'drift' is monitored in real-time to ensure that no single endpoint can manipulate the global pricing narratives. Your clinical activity is encrypted using 256-bit Atmospheric Vault technology."
      ]
    },
    {
      title: "Clinical Confidentiality",
      icon: Lock,
      content: [
        "Patient-level data is never stored on Aether primary nodes. All diagnostic matching performed in the Clinician Portal remains at the edge of your local clinical environment.",
        "MedCompare acts only as a gateway for pharmaceutical comparison and logistics, never as a repository for sensitive health records (PHI)."
      ]
    },
    {
      title: "Network Transparency",
      icon: Globe,
      content: [
         "Pharmacy availability and pricing are public signals within the authorized provider network. By participating in the Aether hub, pharmacies agree to clinical-grade transparency for the benefit of patient procurement.",
         "Automated audits are performed every 12 clinical hours to maintain the veracity of the global inventory flow."
      ]
    },
    {
      title: "Governance & Scale",
      icon: Scale,
      content: [
        "The MedCompare governance board reserves the right to suspend clinical endpoints that exhibit anomalous behavior or attempt to disrupt the integrity of the comparison grid.",
        "Terms are updated periodically to reflect the evolving landscape of global medical data acts and pharmaceutical regulations (2026 Edition)."
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
        {/* Sticky Sidebar Navigation */}
        <div className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center gap-3 mb-10">
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Shield size={20} />
               </div>
               <span className="text-xl font-display font-bold">Legal Portal</span>
            </div>
            
            <nav className="space-y-4">
              {sections.map((s, i) => (
                <button key={i} className="flex items-center justify-between w-full text-left group">
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-all">{s.title}</span>
                  <ChevronRight size={14} className="text-on-surface-variant/20 group-hover:text-primary transition-all" />
                </button>
              ))}
            </nav>

            <hr className="border-outline-variant/10" />

            <div className="space-y-4">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant/40">Last Updated</p>
              <p className="font-bold text-sm">April 22, 2026</p>
            </div>

            <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-widest gap-2">
               <FileText size={16} />
               Public Audit
            </Button>
          </div>
        </div>

        {/* Main Document Content */}
        <div className="lg:col-span-3 space-y-20">
           {/* Editorial Header */}
           <div className="space-y-8 pb-10 border-b border-outline-variant/10">
              <h1 className="text-7xl font-display tracking-tight leading-[1.05]">
                Protocol & <span className="text-gradient">Terms.</span>
              </h1>
              <p className="text-2xl text-on-surface-variant font-medium leading-relaxed max-w-2xl">
                The foundational principles governing the Aether Data Grid and the clinical integrity of the MedCompare ecosystem.
              </p>
           </div>

           {/* Sections */}
           <div className="space-y-0">
             {sections.map((section, index) => (
               <LegalSection key={index} {...section} />
             ))}
           </div>

           {/* Acceptance Footer */}
           <Card variant="surface" className="p-16 bg-surface-container-low border-none text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="max-w-xl mx-auto space-y-6 relative z-10">
                 <div className="inline-flex items-center gap-2 text-secondary">
                    <CheckCircle2 size={24} />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest">Aether Verified Policy</span>
                 </div>
                 <h3 className="text-3xl font-display">Compliant with the 2026 Medical Data Act.</h3>
                 <p className="text-on-surface-variant font-medium leading-relaxed text-sm">
                   By using our clinical endpoints, you acknowledge the atmospheric transparency protocols required for global pharmacy sync.
                 </p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
