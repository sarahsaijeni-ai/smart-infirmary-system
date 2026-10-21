import React, { useState } from 'react';
import { 
  InventoryItem 
} from '../data/infirmaryData';
import { 
  Pill, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  TrendingDown, 
  TrendingUp, 
  Building2, 
  Sparkles,
  Download
} from 'lucide-react';

interface InventoryProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

export const InfirmaryInventory: React.FC<InventoryProps> = ({
  inventory,
  setInventory
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedItemForRestock, setSelectedItemForRestock] = useState<string>(inventory[0]?.id || '');
  const [restockQty, setRestockQty] = useState<number>(50);

  const lowStockItems = inventory.filter(i => i.remainingStock <= i.minimumLevel);
  
  // Items expiring within ~60 days (around late 2026 / early 2027)
  const expiringItems = inventory.filter(i => {
    const exp = new Date(i.expiryDate).getTime();
    const now = new Date('2026-10-21').getTime();
    const diffDays = (exp - now) / (1000 * 3600 * 24);
    return diffDays <= 90 && diffDays > 0;
  });

  const filteredItems = inventory.filter(i => {
    const matchesCat = categoryFilter === 'All' || i.category === categoryFilter;
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                          i.supplierName.toLowerCase().includes(search.toLowerCase()) ||
                          i.batchNumber.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleApplyRestock = (e: React.FormEvent) => {
    e.preventDefault();
    setInventory(prev => prev.map(item => {
      if (item.id === selectedItemForRestock) {
        return {
          ...item,
          remainingStock: item.remainingStock + restockQty,
          lastRestocked: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
    setShowRestockModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Pill className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Medical Supplies & Medicine Inventory
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Section 7B Medical Inventory & Section 7C Stock Analysis: Real-time stock levels, batch expiry monitoring, and procurement needs.
          </p>
        </div>

        <button
          onClick={() => setShowRestockModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Receive New Stock / Replenish</span>
        </button>
      </div>

      {/* Section 16 Risk Alerts: Low Stock & Expiring Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Low Stock Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
          lowStockItems.length > 0 
            ? 'bg-amber-950/60 border-amber-800/80 text-amber-200' 
            : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm">
              Minimum Stock Alerts ({lowStockItems.length} items):
            </span>
            {lowStockItems.length > 0 ? (
              <p className="mt-1 leading-relaxed text-[11px]">
                {lowStockItems.map(i => `${i.name} (${i.remainingStock}/${i.minimumLevel} ${i.unit})`).join(' • ')}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-400">All supplies exceed minimum threshold.</p>
            )}
          </div>
        </div>

        {/* Expiring Items Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
          expiringItems.length > 0 
            ? 'bg-red-950/60 border-red-800/80 text-red-200' 
            : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <Clock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm">
              Expiry Approaching Alert ({expiringItems.length} items):
            </span>
            {expiringItems.length > 0 ? (
              <p className="mt-1 leading-relaxed text-[11px]">
                {expiringItems.map(i => `${i.name} (Batch: ${i.batchNumber}, Exp: ${i.expiryDate})`).join(' • ')}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-400">No supplies expiring within 90 days.</p>
            )}
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          {['All', 'Oral Medicine', 'Topical & Antiseptic', 'First Aid & Dressing', 'PPE & Consumables'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search medicine, batch, supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Live Inventory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Item Name & Category</th>
                <th className="py-3 px-4">Remaining Stock</th>
                <th className="py-3 px-4">Min. Level</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredItems.map((item) => {
                const isLow = item.remainingStock <= item.minimumLevel;
                const isExpiring = expiringItems.some(e => e.id === item.id);

                return (
                  <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.category}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-mono text-sm font-extrabold ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {item.remainingStock}
                      </span>
                      <span className="text-[11px] text-slate-500 ml-1">{item.unit}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {item.minimumLevel} {item.unit}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {item.batchNumber}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className={isExpiring ? 'text-red-400 font-bold' : 'text-slate-300'}>
                        {item.expiryDate}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {item.supplierName}
                    </td>
                    <td className="py-3.5 px-4">
                      {isLow ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                          Reorder Required
                        </span>
                      ) : isExpiring ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-800">
                          Expiring Soon
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Optimal
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              <span>Receive New Stock / Consignments</span>
            </h3>

            <form onSubmit={handleApplyRestock} className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Item:</label>
                <select
                  value={selectedItemForRestock}
                  onChange={(e) => setSelectedItemForRestock(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  {inventory.map(i => (
                    <option key={i.id} value={i.id}>
                      {i.name} (Current: {i.remainingStock} {i.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Quantity Received:</label>
                <input
                  type="number"
                  min="1"
                  value={restockQty}
                  onChange={(e) => setRestockQty(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRestockModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Apply Stock Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
