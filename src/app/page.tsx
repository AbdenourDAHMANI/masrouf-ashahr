import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mx-4 px-4 py-20 md:py-32 w-full max-w-full">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 shape-blob hidden md:block"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 shape-blob hidden md:block" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400 shape-blob hidden md:block" style={{animationDelay: '4s'}}></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-block mb-4 animate-fade-in-up">
            <span className="badge-premium text-white px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2 shadow-2xl">
              <span className="text-xl">🎉</span>
              توصيل مجاني للطلبات فوق 5000 دج
              <span className="text-xl">✨</span>
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            دير <span className="text-gradient">&quot;كورسة الشهر&quot;</span>
            <br />
            <span className="relative">
              أونلاين بكل سهولة
              <svg className="absolute -bottom-4 left-0 right-0 mx-auto w-full h-4" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8 Q 50 2, 100 8 T 200 8" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-medium" style={{animationDelay: '0.2s'}}>
            اختر باك جاهز، عدّل الكميات حسب حاجتك، وابعثلنا الطلب — الدفع نقدًا عند الاستلام 💰
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 animate-fade-in-up w-full" style={{animationDelay: '0.3s'}}>
            <Link href="/packs" className="btn-primary text-center text-lg shadow-2xl w-full sm:w-auto">
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">🛍️</span>
                شوف الباقات
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link href="/track" className="btn-secondary text-center text-lg w-full sm:w-auto">
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">📦</span>
                تتبع طلبك
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: '🛒',
            title: 'اختار باك',
            desc: 'باقات جاهزة: عائلة، طالب، زوجين، بريميوم',
            gradient: 'from-blue-500 to-blue-600'
          },
          {
            icon: '✏️',
            title: 'خصّص الكميات',
            desc: 'زيد أو نقص حسب احتياجاتك والسعر يتحدث تلقائيًا',
            gradient: 'from-purple-500 to-purple-600'
          },
          {
            icon: '🚚',
            title: 'توصيل سريع',
            desc: 'نوصلوا حتى عند الباب - الدفع نقدًا عند الاستلام',
            gradient: 'from-emerald-500 to-emerald-600'
          }
        ].map((feature, i) => (
          <div 
            key={i} 
            className="group card-hover glass rounded-3xl p-8 text-center space-y-4 border-2 border-white/50 shadow-xl"
            style={{animationDelay: `${i * 0.1}s`}}
          >
            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden rounded-3xl p-12 md:p-16 shadow-2xl">
        <div className="absolute inset-0 gradient-primary"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative grid md:grid-cols-3 gap-12 text-center text-white">
          {[
            { number: '500+', label: 'عميل راضي', icon: '😊' },
            { number: '4', label: 'باقات متنوعة', icon: '📦' },
            { number: '24/7', label: 'خدمة الزبائن', icon: '💬' }
          ].map((stat, i) => (
            <div key={i} className="space-y-3 group">
              <div className="text-6xl group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
              <div className="text-5xl md:text-6xl font-black">{stat.number}</div>
              <div className="text-emerald-100 text-xl font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl p-16 text-center space-y-8 glass border-2 border-white/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 opacity-50"></div>
        <div className="relative z-10 space-y-6">
          <div className="text-6xl mb-4 animate-float">🚀</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            جاهز تبدا؟
          </h2>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto font-medium">
            اختر الباك اللي يناسبك وخلي الباقي علينا
          </p>
          <div className="pt-4">
            <Link href="/packs" className="btn-primary inline-block text-xl shadow-2xl">
              <span className="flex items-center gap-3">
                شوف الباقات متاعنا
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
