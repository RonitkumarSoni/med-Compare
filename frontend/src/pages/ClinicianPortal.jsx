import React from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  User, 
  FileText, 
  Plus, 
  Search, 
  ShieldCheck, 
  Activity,
  History,
  Info,
  Clock
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { cn } from '../lib/utils';


const PatientRecord = ({ patient }) => (
  <Card variant="flat" className="flex items-center justify-between p-6 group hover:bg-surface-container-low transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">
        <User size={24} />
      </div>
      <div>
        <h4 className="font-bold">{patient.name}</h4>
        <p className="text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">{patient.id} • {patient.age}y • {patient.gender}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-on-surface-variant mb-1">Last Update</p>
      <div className="flex items-center gap-1.5 text-secondary text-[10px] font-extrabold uppercase tracking-widest">
        <Clock size={12} /> {patient.lastSeen}
      </div>
    </div>
  </Card>
);

const ClinicianPortal = () => {
  const patients = [
    { name: 'Rahul Sharma', id: 'PA-9921', age: 45, gender: 'Male', lastSeen: '2h ago' },
    { name: 'Ananya Patel', id: 'PA-8820', age: 32, gender: 'Female', lastSeen: '1d ago' },
    { name: 'Vikram Singh', id: 'PA-7712', age: 58, gender: 'Male', lastSeen: '3d ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Clinician Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-6 border-b border-outline-variant/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Stethoscope size={24} />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">Clinician Oversight</span>
          </div>
          <h1 className="text-5xl tracking-tight">Patient Diagnostics.</h1>
          <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-lg">
            A specialized portal for medical professionals to map patient prescriptions to the Aether Data Grid.
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          New Patient Record
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Patient Selection Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-display">Active Records</h3>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">View All</Button>
          </div>
          <div className="space-y-3">
            {patients.map((p, i) => (
              <PatientRecord key={i} patient={p} />
            ))}
          </div>
        </div>

        {/* Diagnostic Workspace */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-10 space-y-8 border-primary/10 shadow-ambient bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity size={120} strokeWidth={1} />
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <h2 className="text-3xl font-display">Rahul Sharma</h2>
                <p className="text-on-surface-variant font-medium uppercase tracking-widest text-[10px]">Primary Diagnosis: Chronic Hypertension</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-extrabold tracking-widest uppercase">Verified History</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/40 mb-4">Medication Matching</h4>
                <div className="p-4 bg-surface-container-low rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Amoxicillin 500mg</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">Match: 100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full" />
                  </div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Lisinopril 10mg</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600">Match: 82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[82%]" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/40 mb-4">Clinical Notes</h4>
                 <div className="space-y-3">
                   <div className="p-4 border border-outline-variant/10 rounded-2xl text-xs leading-relaxed text-on-surface-variant font-medium">
                      Patient responded well to Aether-verified batches in previous cycle. Recommend continuation of current flow.
                   </div>
                   <Button variant="outline" className="w-full text-[10px] uppercase font-bold tracking-widest py-3">Add Consultation Tag</Button>
                 </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10 flex justify-end gap-3">
              <Button variant="tonal">Download Record</Button>
              <Button>Authorize Fulfillment</Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="glass" className="bg-primary/5 border-primary/20 p-8 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white"><FileText size={24} /></div>
              <h3 className="text-xl">Prescription Flow</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                Automatically sync this diagnostic record with local pharmacy clusters for real-time fulfillment.
              </p>
              <Button variant="outline" className="w-full mt-2">Sync Account</Button>
            </Card>

            <Card className="p-8 flex flex-col gap-4 border-none bg-surface-container-low">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-on-surface-variant shadow-sm"><History size={24} /></div>
              <h3 className="text-xl">Atmospheric History</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                View the 12-month clinical trajectory of medication switches and cost optimizations for this patient.
              </p>
              <Button variant="ghost" className="w-full mt-2 font-bold uppercase tracking-widest text-xs">View Timeline</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicianPortal;
