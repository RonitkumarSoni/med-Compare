import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  MoreVertical,
  History,
  ShieldAlert
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { cn } from '../lib/utils';


const StockBadge = ({ status }) => {
  const styles = {
    'In Stock': 'bg-secondary/10 text-secondary',
    'Low Stock': 'bg-amber-500/10 text-amber-600',
    'Out of Stock': 'bg-error/10 text-error',
    'Expired': 'bg-on-surface-variant/10 text-on-surface-variant'
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest", styles[status])}>
      {status}
    </span>
  );
};

const InventoryFlow = () => {
  const inventoryItems = [
    { name: 'Amoxicillin 500mg', batch: 'BAT-9921', stock: 450, status: 'In Stock', expiry: 'Dec 2026' },
    { name: 'Lisinopril 10mg', batch: 'BAT-4122', stock: 12, status: 'Low Stock', expiry: 'Feb 2027' },
    { name: 'Metformin 850mg', batch: 'BAT-8810', stock: 0, status: 'Out of Stock', expiry: 'Expired' },
    { name: 'Atorvastatin 20mg', batch: 'BAT-3321', stock: 1200, status: 'In Stock', expiry: 'Jan 2028' },
    { name: 'Ibuprofen 400mg', batch: 'BAT-2219', stock: 85, status: 'Low Stock', expiry: 'Oct 2026' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl mb-2 tracking-tight">Inventory Flow.</h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-lg leading-relaxed">
            Monitor the physical movement of pharmaceutical batches through our clinical atmospheric lens.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="tonal" className="gap-2">
            <History size={18} />
            History
          </Button>
          <Button className="gap-2">
            <Plus size={18} />
            New Batch
          </Button>
        </div>
      </div>

      {/* Critical Alerts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glass" className="bg-amber-500/5 border-amber-500/20 p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h3 className="font-display text-xl mb-1 text-amber-900">Atmospheric Alert</h3>
            <p className="text-sm text-amber-800/70 font-medium">
              3 batches across <span className="font-bold underline">Antibiotics</span> are approaching expiration within 30 days.
            </p>
          </div>
        </Card>

        <Card variant="glass" className="bg-error/5 border-error/20 p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-error/10 rounded-2xl flex items-center justify-center text-error shrink-0">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h3 className="font-display text-xl mb-1 text-error">Supply Chain Drift</h3>
            <p className="text-sm text-error/70 font-medium">
              Lisinopril availability is suffering a <span className="font-bold">12% drift</span> in your local pharmacy cluster.
            </p>
          </div>
        </Card>
      </div>

      {/* Main Inventory Controller */}
      <Card className="overflow-hidden border-outline-variant/10 shadow-sm">
        <div className="p-8 border-b border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter by batch, ID or name..." 
              className="w-full bg-surface-container-low py-2.5 pl-12 pr-4 rounded-xl outline-none focus:bg-white focus:shadow-sm border border-transparent focus:border-primary/20 transition-all font-medium text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2 text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/60">
              <Filter size={14} />
              Refine Search
            </Button>
            <div className="h-6 w-[1px] bg-outline-variant/20 mx-2" />
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">5 Total Batches</span>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/10">
                <th className="px-8 py-5 text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">Medicine Details</th>
                <th className="px-8 py-5 text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">Batch ID</th>
                <th className="px-8 py-5 text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">Current Units</th>
                <th className="px-8 py-5 text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">Status</th>
                <th className="px-8 py-5 text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40">Expiry</th>
                <th className="px-8 py-5 text-[10px] uppercase font-extrabold tracking-widest text-on-surface-variant/40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {inventoryItems.map((item, i) => (
                <tr key={i} className="group hover:bg-surface-container-low transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant/60 group-hover:bg-primary group-hover:text-white transition-all">
                        <Package size={16} />
                      </div>
                      <span className="font-bold">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono text-xs font-bold text-on-surface-variant/60 tracking-tighter">
                    {item.batch}
                  </td>
                  <td className="px-8 py-6 font-bold text-lg">
                    {item.stock}
                  </td>
                  <td className="px-8 py-6">
                    <StockBadge status={item.status} />
                  </td>
                  <td className="px-8 py-6 text-sm font-semibold text-on-surface-variant/80">
                    {item.expiry}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors text-on-surface-variant/40 hover:text-primary">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Navigation */}
        <div className="p-6 bg-surface-container-low/50 border-t border-outline-variant/10 flex items-center justify-center">
            <Button variant="ghost" size="sm" className="text-[10px] uppercase font-extrabold tracking-widest text-primary gap-2">
              Sync with Global Registry <CheckCircle2 size={14} />
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default InventoryFlow;
