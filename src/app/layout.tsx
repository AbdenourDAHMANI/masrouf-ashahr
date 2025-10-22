import './globals.css';
import Link from 'next/link';

export const metadata = { 
  title: 'مصروف الشهر - باكات شهرية للمواد الغذائية', 
  description: 'اطلب باكات شهرية جاهزة للمواد الغذائية - عائلة، طالب، زوجين، بريميوم. توصيل مجاني والدفع عند الاستلام.' 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen text-gray-900">
        {/* Header */}
        <header className="sticky top-0 glass border-b border-white/20 z-50 shadow-xl w-full">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:py-5 w-full">
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 gradient-primary rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-lg group-hover:scale-110 transition-transform">
                    م
                  </div>
                </div>
                <div className="space-y-0.5 hidden sm:block">
                  <div className="font-black text-lg sm:text-2xl text-gradient group-hover:scale-105 transition-transform origin-right inline-block">
                    مصروف الشهر
                  </div>
                  <div className="text-xs text-gray-600 font-semibold">توصيل سريع • دفع عند الاستلام</div>
                </div>
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-4">
                <Link href="/packs" className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-bold transition-colors hover:bg-emerald-50 rounded-xl">
                  🛍️ الباقات
                </Link>
                <Link href="/track" className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-bold transition-colors hover:bg-emerald-50 rounded-xl">
                  📦 تتبع الطلب
                </Link>
                <Link href="/order" className="btn-primary px-6 py-3 shadow-xl">
                  أطلب الآن
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex-shrink-0">
                <Link href="/packs" className="btn-primary px-4 py-2 text-sm shadow-xl">
                  القائمة
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-6xl px-4 py-8 md:py-12 min-h-[calc(100vh-200px)] overflow-x-hidden">
          <div className="w-full max-w-full">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative border-t border-gray-200 mt-20 overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 opacity-50"></div>
          <div className="relative mx-auto max-w-6xl px-4 py-16 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full">
              {/* About */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 gradient-primary rounded-xl blur opacity-75"></div>
                    <div className="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-black shadow-lg">
                      م
                    </div>
                  </div>
                  <span className="font-black text-xl text-gradient">مصروف الشهر</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  باكات شهرية جاهزة للمواد الغذائية بأسعار مناسبة وجودة ممتازة 🎯
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-5">
                <h3 className="font-black text-lg text-gray-900">روابط سريعة</h3>
                <ul className="space-y-3">
                  <li><Link href="/packs" className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors inline-flex items-center gap-2">
                    <span>🛍️</span>الباقات
                  </Link></li>
                  <li><Link href="/track" className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors inline-flex items-center gap-2">
                    <span>📦</span>تتبع الطلب
                  </Link></li>
                  <li><Link href="/order" className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors inline-flex items-center gap-2">
                    <span>🛒</span>أطلب الآن
                  </Link></li>
                </ul>
              </div>

              {/* Features */}
              <div className="space-y-5">
                <h3 className="font-black text-lg text-gray-900">مميزاتنا</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 font-semibold">
                    <span className="text-lg">✅</span>توصيل مجاني
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 font-semibold">
                    <span className="text-lg">✅</span>دفع عند الاستلام
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 font-semibold">
                    <span className="text-lg">✅</span>جودة مضمونة
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 font-semibold">
                    <span className="text-lg">✅</span>خدمة 24/7
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-5">
                <h3 className="font-black text-lg text-gray-900">تواصل معنا</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 font-semibold">
                    <span className="text-xl">📱</span>
                    <span>واتساب: متاح</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 font-semibold">
                    <span className="text-xl">⏰</span>
                    <span>طوال الأسبوع</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 font-semibold">
                    <span className="text-xl">📍</span>
                    <span>توصيل لجميع الولايات</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-16 pt-8 border-t-2 border-gray-200 text-center">
              <p className="text-gray-600 font-bold">
                © {new Date().getFullYear()} <span className="text-gradient">مصروف الشهر</span> • جميع الحقوق محفوظة
              </p>
              <p className="text-sm text-gray-500 mt-2 font-semibold">صُمم بكل ❤️ في الجزائر 🇩🇿</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
