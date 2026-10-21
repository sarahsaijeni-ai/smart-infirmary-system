import { supabase } from './supabase';
import type { InventoryItem, ReferralRecord } from '../data/infirmaryData';
function requireClient() { if (!supabase) throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.'); return supabase; }
export async function loadInventory(): Promise<InventoryItem[]> {
 const { data, error } = await requireClient().from('inventory_items').select('*').order('name');
 if (error) throw error;
 return (data ?? []).map((r: any) => ({ id:r.id, name:r.name, category:r.category, remainingStock:r.remaining_stock, minimumLevel:r.minimum_level, unit:r.unit, batchNumber:r.batch_number, expiryDate:r.expiry_date, supplierName:r.supplier_name ?? '', lastRestocked:r.last_restocked ?? '' }));
}
export async function saveInventory(items: InventoryItem[]) {
 const rows = items.map(i => ({id:i.id,name:i.name,category:i.category,remaining_stock:i.remainingStock,minimum_level:i.minimumLevel,unit:i.unit,batch_number:i.batchNumber,expiry_date:i.expiryDate,supplier_name:i.supplierName || null,last_restocked:i.lastRestocked || null}));
 if (!rows.length) return;
 const {error}=await requireClient().from('inventory_items').upsert(rows); if(error) throw error;
}
export async function loadReferrals(): Promise<ReferralRecord[]> {
 const {data,error}=await requireClient().from('referrals').select('*').order('referred_at',{ascending:false}); if(error) throw error;
 return (data ?? []).map((r:any)=>({id:r.id,visitId:r.visit_id ?? 'VIS-MANUAL',patientName:r.patient_name,patientType:r.patient_type,hospitalName:r.hospital_name,urgency:r.urgency,reasonForReferral:r.reason_for_referral,transportMode:r.transport_mode ?? '',parentNotified:r.parent_notified,status:r.status,date:new Date(r.referred_at).toLocaleString()}));
}
export async function saveReferrals(referrals: ReferralRecord[]) {
 const rows=referrals.map(r=>({id:r.id,visit_id:null,patient_id:null,patient_name:r.patientName,patient_type:r.patientType,hospital_name:r.hospitalName,urgency:r.urgency,reason_for_referral:r.reasonForReferral,transport_mode:r.transportMode || null,parent_notified:r.parentNotified,status:r.status,referred_at:new Date(r.date).toISOString()}));
 if(!rows.length) return;
 const {error}=await requireClient().from('referrals').upsert(rows); if(error) throw error;
}
