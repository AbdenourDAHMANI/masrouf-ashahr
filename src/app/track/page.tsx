'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TrackIndex(){
  const [id, setId] = useState('');
  
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-6xl">📦</div>
        <h1 className="text-4xl font-bold text-gray-900">تتبع طلبك</h1>
        <p className="text-xl text-gray-600">أدخل رقم الطلب عشان تشوف الحالة</p>
      </div>

      {/* Search Form */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 space-y-6">
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-900">
            رقم الطلب
          </label>
          <input 
            placeholder="أدخل رقم الطلب (مثال: DZAB12C)" 
            className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:border-emerald-500 focus:outline-none transition-colors" 
            value={id} 
            onChange={e=>setId(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && id && (window.location.href = `/track/${id}`)}
          />
          <p className="text-sm text-gray-600">
            💡 تلقى رقم الطلب في رسالة التأكيد على واتساب
          </p>
        </div>
        
        <Link 
          href={`/track/${id}`} 
          className={`btn-primary w-full py-4 text-lg text-center block ${!id ? 'opacity-50 pointer-events-none' : ''}`}
        >
          🔍 عرض حالة الطلب
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {[
          { icon: '⚡', title: 'تتبع مباشر', desc: 'شوف حالة طلبك في الوقت الفعلي' },
          { icon: '🔔', title: 'تنبيهات فورية', desc: 'نعلمك بكل تحديث على طلبك' },
          { icon: '📱', title: 'سهل الاستخدام', desc: 'فقط أدخل رقم الطلب' }
        ].map((item, i) => (
          <div key={i} className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-100 rounded-2xl p-6 text-center space-y-2">
            <div className="text-4xl">{item.icon}</div>
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 text-center">
        <p className="text-gray-700">
          <span className="font-semibold">محتاج مساعدة؟</span> تواصل معنا عبر واتساب على أي وقت
        </p>
      </div>
    </div>
  );
}

