import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function TrackOrder({ params }: { params: Promise<{ order: string }> }){
  const { order } = await params;
  const { data } = await supabase.from('orders').select('*').eq('order_number', order).maybeSingle();
  
  if(!data){ 
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-12">
        <div className="text-6xl">📭</div>
        <h2 className="text-2xl font-bold text-gray-900">لم نجد طلب بهذا الرقم</h2>
        <p className="text-gray-600">تأكد من رقم الطلب وحاول مرة أخرى</p>
        <Link href="/track" className="btn-primary inline-block">
          رجوع للبحث
        </Link>
      </div>
    );
  }
  
  const statusInfo: Record<string, {label: string, icon: string, color: string}> = {
    pending: { label: 'قيد الانتظار', icon: '⏳', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    confirmed: { label: 'تم التأكيد', icon: '✅', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    preparing: { label: 'قيد التجهيز', icon: '📦', color: 'bg-purple-100 text-purple-700 border-purple-300' },
    out_for_delivery: { label: 'في الطريق', icon: '🚚', color: 'bg-amber-100 text-amber-700 border-amber-300' },
    delivered: { label: 'تم التوصيل', icon: '🎉', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
    cancelled: { label: 'ملغى', icon: '❌', color: 'bg-red-100 text-red-700 border-red-300' }
  };
  
  const steps = ['pending','confirmed','preparing','out_for_delivery','delivered'] as const;
  const currentStepIndex = steps.indexOf(data.status as typeof steps[number]);
  const currentStatus = statusInfo[data.status] || statusInfo.pending;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 ${currentStatus.color} font-bold text-lg`}>
          <span className="text-2xl">{currentStatus.icon}</span>
          {currentStatus.label}
        </div>
        <h1 className="text-4xl font-bold text-gray-900">الطلب #{data.order_number}</h1>
        <p className="text-gray-600">تتبع حالة طلبك بالتفصيل</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-8 right-0 left-0 h-1 bg-gray-200 rounded-full" style={{zIndex: 0}}>
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
              style={{width: `${(currentStepIndex / (steps.length - 1)) * 100}%`}}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between" style={{zIndex: 1}}>
            {steps.map((step, i) => {
              const info = statusInfo[step];
              const isActive = i <= currentStepIndex;
              // const isCurrent = i === currentStepIndex;
              
              return (
                <div key={step} className="flex flex-col items-center gap-3 flex-1">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 transition-all ${
                    isActive 
                      ? 'bg-emerald-500 border-emerald-600 scale-110' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <span className={isActive ? 'grayscale-0' : 'grayscale opacity-40'}>
                      {info.icon}
                    </span>
                  </div>
                  <div className={`text-center ${isActive ? 'font-bold text-gray-900' : 'text-gray-400'}`}>
                    <div className="text-sm">{info.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>📋</span> تفاصيل الطلب
          </h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-600">رقم الطلب:</span>
              <span className="font-semibold">{data.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المجموع:</span>
              <span className="font-bold text-emerald-600 text-lg">{data.total} دج</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تاريخ الطلب:</span>
              <span className="font-semibold">{new Date(data.created_at).toLocaleDateString('ar-DZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>👤</span> معلومات التوصيل
          </h3>
          <div className="space-y-3 text-gray-700">
            <div>
              <div className="text-sm text-gray-600">الاسم:</div>
              <div className="font-semibold">{data.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">الهاتف:</div>
              <div className="font-semibold">{data.phone}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">العنوان:</div>
              <div className="font-semibold">{data.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link href="/track" className="flex-1 btn-secondary text-center py-4">
          تتبع طلب آخر
        </Link>
        <Link href="/packs" className="flex-1 btn-primary text-center py-4">
          طلب جديد
        </Link>
      </div>
    </div>
  );
}

