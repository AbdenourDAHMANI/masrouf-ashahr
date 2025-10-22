'use client';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PackItem {
  id: string;
  name: string;
  unit: string;
  unit_price: number;
  default_qty: number;
}

interface Pack {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export default function PackDetails({ params }: { params: Promise<{ slug: string }> }) {
  const [pack, setPack] = useState<Pack | null>(null);
  const [items, setItems] = useState<PackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', unit: '', unit_price: 0, default_qty: 1 });
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editItem, setEditItem] = useState({ name: '', unit: '', unit_price: 0, default_qty: 1 });
  
  const deliveryFee = 300;
  
  const packIcons: Record<string, string> = {
    family: '👨‍👩‍👧‍👦',
    student: '🎓',
    couple: '💑',
    premium: '⭐'
  };
  
  const packGradients: Record<string, string> = {
    family: 'from-blue-500 to-blue-600',
    student: 'from-purple-500 to-purple-600',
    couple: 'from-pink-500 to-pink-600',
    premium: 'from-amber-500 to-amber-600'
  };

  useEffect(() => {
    async function loadPack() {
      const { slug } = await params;
      const { data: packData } = await supabase.from('packs').select('*').eq('slug', slug).single();
      const { data: itemsData } = await supabase.from('pack_items').select('*').eq('pack_id', packData?.id);
      
      setPack(packData);
      setItems(itemsData || []);
      setLoading(false);
    }
    loadPack();
  }, [params]);

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;
    
    const { error } = await supabase.from('pack_items').delete().eq('id', itemId);
    if (error) {
      alert('خطأ في حذف العنصر');
      return;
    }
    
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pack) return;
    
    const { error } = await supabase.from('pack_items').insert({
      pack_id: pack.id,
      name: newItem.name,
      unit: newItem.unit,
      unit_price: newItem.unit_price,
      default_qty: newItem.default_qty
    });
    
    if (error) {
      alert('خطأ في إضافة العنصر');
      return;
    }
    
    // Refresh items
    const { data: itemsData } = await supabase.from('pack_items').select('*').eq('pack_id', pack.id);
    setItems(itemsData || []);
    setNewItem({ name: '', unit: '', unit_price: 0, default_qty: 1 });
    setShowAddForm(false);
  };

  const handleEditItem = async (itemId: string) => {
    if (!editingItem) return;
    
    const { error } = await supabase.from('pack_items').update({
      name: editItem.name,
      unit: editItem.unit,
      unit_price: editItem.unit_price,
      default_qty: editItem.default_qty
    }).eq('id', itemId);
    
    if (error) {
      alert('خطأ في تحديث العنصر');
      return;
    }
    
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, ...editItem }
        : item
    ));
    setEditingItem(null);
  };

  const startEdit = (item: PackItem) => {
    setEditingItem(item.id);
    setEditItem({
      name: item.name,
      unit: item.unit,
      unit_price: item.unit_price,
      default_qty: item.default_qty
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-900">جاري التحميل...</h2>
        </div>
      </div>
    );
  }

  const icon = packIcons[pack?.slug || ''] || '📦';
  const gradient = packGradients[pack?.slug || ''] || 'from-gray-500 to-gray-600';

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-8 md:p-12 text-white overflow-hidden`}>
        <div className="absolute top-0 right-0 text-9xl opacity-20">{icon}</div>
        <div className="relative z-10 space-y-4">
          <Link href="/packs" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
            <span className="text-xl">→</span>
            رجوع للباقات
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">{pack?.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{pack?.description}</p>
        </div>
      </div>

      {/* Items Management */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-gray-900">🛒 إدارة المواد</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary px-6 py-3 shadow-lg"
          >
            ➕ إضافة مادة جديدة
          </button>
        </div>

        {/* Add New Item Form */}
        {showAddForm && (
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-2xl p-4 md:p-6 space-y-4 w-full">
            <h3 className="text-xl font-bold text-gray-900">إضافة مادة جديدة</h3>
            <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المادة *</label>
                <input 
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none"
                  placeholder="مثال: زيت الزيتون"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الوحدة *</label>
                <input 
                  required
                  value={newItem.unit}
                  onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none"
                  placeholder="مثال: L, kg, 250g"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">السعر (دج) *</label>
                <input 
                  required
                  type="number"
                  value={newItem.unit_price}
                  onChange={(e) => setNewItem({...newItem, unit_price: Number(e.target.value)})}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none"
                  placeholder="مثال: 250"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الكمية الافتراضية *</label>
                <input 
                  required
                  type="number"
                  value={newItem.default_qty}
                  onChange={(e) => setNewItem({...newItem, default_qty: Number(e.target.value)})}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none"
                  placeholder="مثال: 2"
                />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="btn-primary px-6 py-3">
                  ✅ إضافة المادة
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary px-6 py-3"
                >
                  ❌ إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="group bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all">
              {editingItem === item.id ? (
                // Edit Mode
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  <div>
                    <input 
                      value={editItem.name}
                      onChange={(e) => setEditItem({...editItem, name: e.target.value})}
                      className="w-full border-2 border-emerald-300 rounded-xl px-3 py-2 font-semibold"
                    />
                  </div>
                  <div>
                    <input 
                      value={editItem.unit}
                      onChange={(e) => setEditItem({...editItem, unit: e.target.value})}
                      className="w-full border-2 border-emerald-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <input 
                      type="number"
                      value={editItem.unit_price}
                      onChange={(e) => setEditItem({...editItem, unit_price: Number(e.target.value)})}
                      className="w-full border-2 border-emerald-300 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEditItem(item.id)}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      ✅ حفظ
                    </button>
                    <button 
                      onClick={() => setEditingItem(null)}
                      className="btn-secondary px-4 py-2 text-sm"
                    >
                      ❌ إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-lg truncate">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.unit_price} دج / {item.unit} • الكمية الافتراضية: {item.default_qty}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <input 
                      name={`qty_${item.id}`} 
                      defaultValue={item.default_qty} 
                      min={0} 
                      step={1} 
                      type="number" 
                      className="w-20 border-2 border-gray-300 rounded-xl px-3 py-2 text-center font-semibold focus:border-emerald-500 focus:outline-none"
                    />
                    <button 
                      onClick={() => startEdit(item)}
                      className="text-emerald-600 hover:text-emerald-700 p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Form */}
      <form action="/order" method="GET" className="space-y-6">
        <input type="hidden" name="pack" value={pack?.id} />
        
        {/* Delivery Info */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚚</span>
              <div>
                <div className="font-semibold text-gray-900">تكلفة التوصيل</div>
                <div className="text-sm text-gray-600">توصيل لحد الدار</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-700">{deliveryFee} دج</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link 
            href="/packs" 
            className="flex-1 btn-secondary text-center py-4 text-lg"
          >
            رجوع
          </Link>
          <button 
            type="submit"
            className="flex-1 btn-primary py-4 text-lg"
          >
            متابعة الطلب ←
          </button>
        </div>
      </form>

      {/* Help */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 text-center">
        <p className="text-gray-700">
          💡 <span className="font-semibold">نصيحة:</span> يمكنك إضافة مواد جديدة، تعديل الموجودة، أو حذفها حسب احتياجاتك
        </p>
      </div>
    </div>
  );
}

