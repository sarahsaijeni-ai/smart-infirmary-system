/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, InfirmaryTab } from './components/Navbar';
import { InfirmaryPromptHub } from './components/InfirmaryPromptHub';
import { InfirmaryAdmissions } from './components/InfirmaryAdmissions';
import { InfirmaryInventory } from './components/InfirmaryInventory';
import { InfirmaryReferrals } from './components/InfirmaryReferrals';
import { InfirmaryReports } from './components/InfirmaryReports';
import { InfirmaryCompliance } from './components/InfirmaryCompliance';
import { 
  INITIAL_INVENTORY, 
  INITIAL_REFERRALS, 
  InventoryItem, 
  ReferralRecord 
} from './data/infirmaryData';

export default function App() {
  const [activeTab, setActiveTab] = useState<InfirmaryTab>('prompt');
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [referrals, setReferrals] = useState<ReferralRecord[]>(INITIAL_REFERRALS);

  const lowStockCount = inventory.filter(i => i.remainingStock <= i.minimumLevel).length;

  const handleReferralCreated = (newRef: ReferralRecord) => {
    setReferrals(prev => [newRef, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lowStockCount={lowStockCount} 
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'prompt' && <InfirmaryPromptHub />}
        {activeTab === 'admissions' && (
          <InfirmaryAdmissions 
            inventory={inventory} 
            setInventory={setInventory} 
            onReferralCreated={handleReferralCreated}
          />
        )}
        {activeTab === 'inventory' && (
          <InfirmaryInventory 
            inventory={inventory} 
            setInventory={setInventory} 
          />
        )}
        {activeTab === 'referrals' && (
          <InfirmaryReferrals 
            referrals={referrals} 
            setReferrals={setReferrals} 
          />
        )}
        {activeTab === 'reports' && (
          <InfirmaryReports 
            inventory={inventory} 
          />
        )}
        {activeTab === 'compliance' && (
          <InfirmaryCompliance />
        )}
      </main>

      {/* Persistent Footer with Official Institutional Attribution */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-300">
              Smart School Infirmary System — AfricAcademy Arusha Science
            </p>
            <p className="text-[11px] text-slate-500">
              Founders: Conan Morgan, Daniel Machota, Zuberi Mpeta, Sarah Ikupa, Antony Joseph.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>Clinical Records & Triage</span>
            <span>•</span>
            <span>Automated Stock Deduction</span>
            <span>•</span>
            <span>Price-Free Engineering Specification</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
