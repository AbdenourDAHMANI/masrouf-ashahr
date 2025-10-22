import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default async function PacksPage() {
  const { data } = await supabase.from('packs').select('*').order('name');
  
  const packIcons: Record<string, string> = {
    family: '👨‍👩‍👧‍👦',
    student: '🎓',
    couple: '💑',
    premium: '⭐'
  };
  
  const packColors: Record<string, string> = {
    family: 'from-blue-500 to-blue-600',
    student: 'from-purple-500 to-purple-600',
    couple: 'from-pink-500 to-pink-600',
    premium: 'from-amber-500 to-amber-600'
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="inline-block">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900">
            اختر الباك المناسب ليك 
            <span className="text-6xl md:text-7xl ml-3">🛍️</span>
          </h1>
          <svg className="mx-auto mt-4 w-48 h-3" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8 Q 50 2, 100 8 T 200 8" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
          كل باك مصمم خصيصًا حسب احتياجاتك اليومية بأسعار تنافسية وجودة ممتازة
        </p>
      </div>

      {/* Packs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {data?.map((pack, index) => {
          const icon = packIcons[pack.slug] || '📦';
          const gradient = packColors[pack.slug] || 'from-gray-500 to-gray-600';
          
          return (
            <Link 
              key={pack.id} 
              href={`/packs/${pack.slug}`} 
              className="group card-hover glass rounded-3xl overflow-hidden border-2 border-white/50 shadow-2xl"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Icon Header with Gradient */}
              <div className={`relative h-56 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>
                
                {/* Icon */}
                <div className="relative z-10 text-8xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {icon}
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg">
                  باك
                </div>
                
                {/* Premium indicator for premium pack */}
                {pack.slug === 'premium' && (
                  <div className="absolute top-4 left-4 badge-premium text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ مميز
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4 bg-white/80">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-gradient transition-all">
                  {pack.name}
                </h3>
                <p className="text-gray-700 line-clamp-2 min-h-[3rem] leading-relaxed font-medium">
                  {pack.description}
                </p>
                <div className="pt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-emerald-600 font-bold text-lg group-hover:gap-4 transition-all">
                    شوف التفاصيل
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Help Section */}
      <div className="mt-16 relative overflow-hidden glass rounded-3xl p-12 text-center space-y-6 border-2 border-white/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 opacity-50"></div>
        <div className="relative z-10 space-y-6">
          <div className="text-6xl animate-float">🤔</div>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900">محتار؟ احنا هنا لمساعدتك!</h3>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            تقدر تخصص أي باك حسب احتياجاتك، زيد أو نقص الكميات كيف تحب
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="inline-flex items-center gap-3 bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
              <span className="text-2xl">✅</span>
              <span className="font-bold text-gray-900">تخصيص كامل</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-gray-900">أسعار شفافة</span>
            </div>
            <div className="inline-flex items-center gap-3 bg-white/80 px-6 py-3 rounded-2xl shadow-lg">
              <span className="text-2xl">🚚</span>
              <span className="font-bold text-gray-900">توصيل سريع</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

