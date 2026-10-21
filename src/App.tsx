import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, InfirmaryTab } from './components/Navbar';
import { InfirmaryPromptHub } from './components/InfirmaryPromptHub';
import { InfirmaryAdmissions } from './components/InfirmaryAdmissions';
import { InfirmaryInventory } from './components/InfirmaryInventory';
import { InfirmaryReferrals } from './components/InfirmaryReferrals';
import { InfirmaryReports } from './components/InfirmaryReports';
import { InfirmaryCompliance } from './components/InfirmaryCompliance';
import type { InventoryItem, ReferralRecord } from './data/infirmaryData';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import { loadInventory, loadReferrals, saveInventory, saveReferrals } from './lib/infirmaryApi';

export default function App() {
 const [activeTab,setActiveTab]=useState<InfirmaryTab>('prompt');
 const [inventory,setInventoryState]=useState<InventoryItem[]>([]);
 const [referrals,setReferralsState]=useState<ReferralRecord[]>([]);
 const [loadingData,setLoadingData]=useState(true);
 const [dataError,setDataError]=useState('');
 useEffect(()=>{
  if(!isSupabaseConfigured || !supabase){setLoadingData(false);return;}
  let alive=true;
  Promise.all([loadInventory(),loadReferrals()]).then(([items,records])=>{if(alive){setInventoryState(items);setReferralsState(records);setDataError('');}})
   .catch((e:unknown)=>{if(alive)setDataError(e instanceof Error?e.message:'Could not load infirmary records.');})
   .finally(()=>{if(alive)setLoadingData(false);});
  return ()=>{alive=false;};
 },[]);
 const setInventory=useCallback<React.Dispatch<React.SetStateAction<InventoryItem[]>>>((action)=>{
  setInventoryState(previous=>{const next=typeof action==='function'?action(previous):action;void saveInventory(next).catch((e:unknown)=>setDataError(e instanceof Error?e.message:'Inventory save failed.'));return next;});
 },[]);
 const setReferrals=useCallback<React.Dispatch<React.SetStateAction<ReferralRecord[]>>>((action)=>{
  setReferralsState(previous=>{const next=typeof action==='function'?action(previous):action;void saveReferrals(next).catch((e:unknown)=>setDataError(e instanceof Error?e.message:'Referral save failed.'));return next;});
 },[]);
 const lowStockCount=inventory.filter(i=>i.remainingStock<=i.minimumLevel).length;
 const handleReferralCreated=(newRef:ReferralRecord)=>setReferrals(prev=>[newRef,...prev]);
 return <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
  <Navbar activeTab={activeTab} setActiveTab={setActiveTab} lowStockCount={lowStockCount}/>
  {dataError&&<div role="alert" className="mx-auto mt-3 max-w-7xl rounded-lg border border-red-800 bg-red-950/70 px-4 py-3 text-sm text-red-200">Database error: {dataError}</div>}
  {loadingData&&<div className="mx-auto mt-3 max-w-7xl px-4 text-xs text-slate-400">Loading saved infirmary records…</div>}
  <main className="flex-1 pb-16">
   {activeTab==='prompt'&&<InfirmaryPromptHub/>}
   {activeTab==='admissions'&&<InfirmaryAdmissions inventory={inventory} setInventory={setInventory} onReferralCreated={handleReferralCreated}/>}
   {activeTab==='inventory'&&<InfirmaryInventory inventory={inventory} setInventory={setInventory}/>}
   {activeTab==='referrals'&&<InfirmaryReferrals referrals={referrals} setReferrals={setReferrals}/>}
   {activeTab==='reports'&&<InfirmaryReports inventory={inventory}/>}
   {activeTab==='compliance'&&<InfirmaryCompliance/>}
  </main>
  <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-400"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"><div><p className="font-semibold text-slate-300">Smart School Infirmary System — AfricAcademy Arusha Science</p><p className="text-[11px] text-slate-500">Founders: Conan Morgan, Daniel Machota, Zuberi Mpeta, Sarah Ikupa, Antony Joseph.</p></div><div className="flex items-center gap-3 text-[11px] text-slate-500"><span>Clinical Records & Triage</span><span>•</span><span>Automated Stock Deduction</span><span>•</span><span>Price-Free Engineering Specification</span></div></div></footer>
 </div>;
}
