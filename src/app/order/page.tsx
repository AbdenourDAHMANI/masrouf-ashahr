'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

function OrderPageContent() {
  const sp = useSearchParams();
  const packId = sp.get('pack');
  const [items, setItems] = useState<Array<{
    id: string;
    name: string;
    unit: string;
    unit_price: number;
    default_qty: number;
    qty: number;
  }>>([]);
  const [pack, setPack] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);
  const [form, setForm] = useState({ name:'', phone:'', address:'', notes:'' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deliveryFee = 300;

  useEffect(()=>{
    async function load(){
      if(!packId) return;
      const { data: p } = await supabase.from('packs').select('*').eq('id', packId).single();
      const { data: its } = await supabase.from('pack_items').select('*').eq('pack_id', packId);
      const mapped = its?.map((it: {
        id: string;
        name: string;
        unit: string;
        unit_price: number;
        default_qty: number;
      })=> ({
        ...it,
        qty: Number(sp.get(`qty_${it.id}`) ?? it.default_qty)
      })) || [];
      setPack(p);
      setItems(mapped);
    }
    load();
  },[packId, sp]);

  const subtotal = useMemo(()=> items.reduce((s,it)=> s + it.unit_price * (it.qty||0), 0), [items]);
  const total = subtotal + deliveryFee;

  async function submitOrder(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setIsSubmitting(true);
    
    const orderNumber = 'DZ' + Math.random().toString(36).slice(2,8).toUpperCase();
    const payload = {
      order_number: orderNumber,
      pack_id: pack?.id,
      items: items.map(it=> ({ itemId: it.id, name: it.name, unit_price: it.unit_price, qty: it.qty, line_total: it.unit_price * it.qty })),
      name: form.name, phone: form.phone, address: form.address, notes: form.notes,
      subtotal, delivery_fee: deliveryFee, total
    };
    
    const { error } = await supabase.from('orders').insert(payload);
    if(error){ 
      alert('خطأ في إنشاء الطلب'); 
      setIsSubmitting(false);
      return; 
    }

    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    const text = encodeURIComponent(
      `طلب جديد ${orderNumber}%0Aاسم: ${form.name}%0Aهاتف: ${form.phone}%0Aعنوان: ${form.address}%0Aالمجموع: ${total} دج`
    );
    const wa = number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
    window.location.href = wa;
  }

  if (!pack) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 py-12">
        <div className="text-6xl">📦</div>
        <h2 className="text-2xl font-bold text-gray-900">لم تختر باك بعد</h2>
        <p className="text-gray-600">اختر باك من القائمة عشان تكمل الطلب</p>
        <Link href="/packs" className="btn-primary inline-block">
          شوف الباقات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">تأكيد الطلب 📝</h1>
        <p className="text-lg text-gray-600">راجع طلبك وأدخل بياناتك</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">📦 ملخص الطلب</h2>
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <div className="font-bold text-lg text-emerald-900">{pack.name}</div>
              </div>
              
              {items.filter(it=>it.qty>0).map(it=> (
                <div key={it.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{it.name}</div>
                    <div className="text-sm text-gray-600">الكمية: {it.qty} × {it.unit_price} دج</div>
                  </div>
                  <div className="font-semibold text-gray-900">{it.unit_price*it.qty} دج</div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t-2 border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي</span>
                <span className="font-semibold">{subtotal} دج</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>التوصيل</span>
                <span className="font-semibold">{deliveryFee} دج</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2">
                <span>المجموع</span>
                <span className="text-emerald-600">{total} دج</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submitOrder} className="space-y-6">
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">👤 معلومات التوصيل</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل *</label>
                <input 
                  required 
                  placeholder="محمد بن علي" 
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors" 
                  value={form.name} 
                  onChange={e=>setForm({...form, name:e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف *</label>
                <input 
                  required 
                  type="tel"
                  placeholder="0555 12 34 56" 
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors" 
                  value={form.phone} 
                  onChange={e=>setForm({...form, phone:e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان الكامل *</label>
                <textarea 
                  required 
                  rows={3}
                  placeholder="الولاية، البلدية، الحي، رقم المنزل..." 
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors resize-none" 
                  value={form.address} 
                  onChange={e=>setForm({...form, address:e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ملاحظات (اختياري)</label>
                <textarea 
                  rows={2}
                  placeholder="أي ملاحظات إضافية..."
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors resize-none" 
                  value={form.notes} 
                  onChange={e=>setForm({...form, notes:e.target.value})} 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>⏳ جاري المعالجة...</>
            ) : (
              <>📱 إرسال عبر واتساب</>
            )}
          </button>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-sm text-gray-700 text-center">
            💡 بعد تأكيد الطلب، سيتم تحويلك لواتساب لإتمام الطلب
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-900">جاري التحميل...</h2>
        </div>
      </div>
    }>
      <OrderPageContent />
    </Suspense>
  );
}

