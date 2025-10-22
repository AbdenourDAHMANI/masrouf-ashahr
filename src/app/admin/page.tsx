'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const statuses = ['pending','confirmed','preparing','out_for_delivery','delivered','cancelled'];

export default function Admin(){
  const [orders, setOrders] = useState<Array<{
    id: string;
    order_number: string;
    name: string;
    phone: string;
    total: number;
    status: string;
    created_at: string;
  }>>([]);

  async function load(){
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data||[]);
  }
  useEffect(()=>{ load(); },[]);

  async function updateStatus(id:string, status:string){
    const token = '116479d269cbfe2fa568721f545ba560197f76d2495a22b15c8fe5b45402dbf8';
    await fetch('/api/admin/orders/'+id, {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ status })
    });
    load();
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">الطلبات</h1>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b"><th>رقم</th><th>اسم</th><th>هاتف</th><th>مجموع</th><th>حالة</th><th>تحديث</th></tr>
          </thead>
          <tbody>
            {orders.map(o=> (
              <tr key={o.id} className="border-b">
                <td>{o.order_number}</td>
                <td>{o.name}</td>
                <td>{o.phone}</td>
                <td>{o.total} دج</td>
                <td>{o.status}</td>
                <td>
                  <select className="border rounded-xl px-2 py-1" value={o.status} onChange={e=>updateStatus(o.id, e.target.value)}>
                    {statuses.map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

