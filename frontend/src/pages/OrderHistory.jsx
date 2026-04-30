import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  Truck, 
  FileText,
  ChevronRight,
  ShieldCheck,
  Package
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { cn } from '../lib/utils';


const OrderStatus = ({ status }) => {
  const styles = {
    'Delivered': 'bg-secondary/10 text-secondary',
    'Processing': 'bg-primary/10 text-primary',
    'In Transit': 'bg-amber-500/10 text-amber-600',
    'Cancelled': 'bg-on-surface-variant/10 text-on-surface-variant'
  };
  const Icons = {
    'Delivered': CheckCircle2,
    'Processing': Clock,
    'In Transit': Truck,
    'Cancelled': Package
  };
  const Icon = Icons[status] || Package;

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest", styles[status])}>
      <Icon size={12} />
      {status}
    </div>
  );
};

const OrderHistory = () => {
  const orders = [
    { 
      id: 'ORD-7721-AX', 
      date: 'April 20, 2026', 
      items: 'Amoxicillin 500mg, Metformin 850mg', 
      total: '₹4,250.00', 
      status: 'Delivered', 
      pharmacy: 'Apollo Central' 
    },
    { 
      id: 'ORD-7601-CL', 
      date: 'April 18, 2026', 
      items: 'Lisinopril 10mg', 
      total: '₹1,200.00', 
      status: 'In Transit', 
      pharmacy: 'MedPlus Hub' 
    },
    { 
      id: 'ORD-7592-WF', 
      date: 'April 15, 2026', 
      items: 'Atorvastatin 20mg x 5', 
      total: '₹8,900.00', 
      status: 'Delivered', 
      pharmacy: 'Wellness Forever' 
    },
    { 
      id: 'ORD-7440-PC', 
      date: 'April 12, 2026', 
      items: 'Clavmox 625, Paracetamol 500', 
      total: '₹2,100.00', 
      status: 'Processing', 
      pharmacy: 'Apollo Central' 
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline-variant/10 pb-10">
        <div>
          <h1 className="text-5xl mb-3">Order History.</h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg leading-relaxed">
            Your clinical audit trail of pharmaceutical procurement and network logistics.
          </p>
        </div>
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl">
          <Button variant="tonal" size="sm" className="bg-white shadow-sm">All Orders</Button>
          <Button variant="ghost" size="sm">Pending</Button>
          <Button variant="ghost" size="sm">Completed</Button>
        </div>
      </div>

      {/* Main Order List */}
      <div className="space-y-4">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="flat" className="group hover:bg-surface-container-low transition-all cursor-pointer p-0 border-outline-variant/5">
              <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                {/* ID & Date */}
                <div className="flex items-center gap-6 shrink-0 md:w-48">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40 mb-0.5">{order.date}</p>
                    <p className="font-mono text-sm font-bold tracking-tighter">{order.id}</p>
                  </div>
                </div>

                {/* Items Description */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40 mb-1">Clinic Requisition</p>
                  <p className="font-semibold truncate text-on-surface group-hover:text-primary transition-colors">{order.items}</p>
                  <p className="text-xs text-on-surface-variant/60 font-medium">Fulfilled by <span className="font-bold">{order.pharmacy}</span></p>
                </div>

                {/* Status & Total */}
                <div className="shrink-0 flex items-center md:items-end gap-8 md:flex-col md:gap-2 md:w-32">
                   <OrderStatus status={order.status} />
                   <p className="text-xl font-display font-bold">{order.total}</p>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="text-on-surface-variant/20 hover:text-primary transition-colors">
                      <Download size={20} />
                   </Button>
                   <Button variant="tonal" size="icon" className="rounded-xl">
                      <ChevronRight size={20} />
                   </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Network Verification Footer */}
      <div className="flex flex-col items-center justify-center gap-4 py-20 border-t border-outline-variant/10">
        <div className="flex items-center gap-3 text-secondary">
          <ShieldCheck size={40} strokeWidth={1} />
          <div className="text-left">
            <h4 className="font-display text-xl leading-none">Aether Verified Protocol</h4>
            <p className="text-xs text-on-surface-variant/60 font-medium tracking-wide uppercase mt-1">100% Clinical Traceability Guaranteed</p>
          </div>
        </div>
        <p className="text-sm text-on-surface-variant max-w-md text-center leading-relaxed font-medium">
          Every order in your history is backed by the atmospheric data stream, ensuring batch-level authenticity and supply chain integrity.
        </p>
      </div>
    </div>
  );
};

export default OrderHistory;
