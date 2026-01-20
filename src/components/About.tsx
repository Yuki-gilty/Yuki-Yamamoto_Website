import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      <div className="absolute inset-0 bg-diagonal-stripe opacity-5"></div>
      
      {/* Technical background elements */}
      <div className="hidden md:block absolute top-1/4 right-10 text-[100px] font-black text-slate-50 select-none leading-none tracking-tighter">PILOT</div>
      <div className="hidden md:block absolute bottom-1/4 left-10 text-[100px] font-black text-slate-50 select-none leading-none tracking-tighter rotate-180" style={{ writingMode: 'vertical-rl' }}>DRONE</div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-8 md:mb-20">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="h-px w-8 md:w-12 bg-red-600"></div>
            <span className="text-red-600 font-mono text-xs md:text-sm tracking-widest uppercase">{t.about.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            Who is <span className="text-red-600">Yuki?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left: Basic Info (Tech Card style) */}
          <div className="lg:col-span-4 group">
            <div className="tech-border p-5 md:p-8 bg-white relative overflow-hidden group-hover:border-red-600/50 transition-colors shadow-xl shadow-slate-200/50">
              <div className="absolute top-3 md:top-4 right-3 md:right-4 text-[9px] md:text-[10px] font-mono text-slate-300">REF: 20100323</div>
              
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
                <User className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                {t.about.basicInfo}
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="relative">
                  <span className="block text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">{t.about.name}</span>
                  <span className="block text-base md:text-lg font-bold text-slate-900">{language === 'ja' ? '山本悠貴' : 'Yuki Yamamoto'}</span>
                </div>
                <div className="relative">
                  <span className="block text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">{t.about.birthdate}</span>
                  <span className="block text-base md:text-lg font-bold text-slate-900">{language === 'ja' ? '2010年3月23日 (15歳)' : 'March 23, 2010 (15 years old)'}</span>
                </div>
                <div className="relative">
                  <span className="block text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">{t.about.birthplace}</span>
                  <span className="block text-base md:text-lg font-bold text-slate-900">{language === 'ja' ? '東京都杉並区' : 'Suginami, Tokyo'}</span>
                </div>
                <div className="relative">
                  <span className="block text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">{t.about.affiliation}</span>
                  <span className="block text-base md:text-lg font-bold text-red-600">TEAM BRIDE</span>
                </div>
              </div>

              {/* Decorative scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-1/2 w-full -translate-y-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>
            </div>
          </div>
          
          {/* Right: Self Introduction */}
          <div className="lg:col-span-8">
            <div className="p-5 md:p-8 lg:p-12 bg-slate-50 border border-slate-100 relative">
              <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-slate-200"></div>
              <div className="absolute -bottom-2 md:-bottom-3 -left-2 md:-left-3 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-slate-200"></div>
              
              <div className="text-slate-600 leading-relaxed text-base md:text-lg space-y-4 md:space-y-6 font-medium">
                <p className="relative">
                  <span className="absolute -left-3 md:-left-4 top-0 text-red-600 font-serif text-3xl md:text-4xl opacity-30">"</span>
                  {t.about.intro1}
                </p>
                <p>{t.about.intro2}</p>
                <p>{t.about.intro3}</p>
              </div>

              <div className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4">
                <div className="px-4 md:px-6 py-1.5 md:py-2 bg-white border border-slate-200 text-slate-500 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 md:gap-3 shadow-sm">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {t.about.badge1}
                </div>
                <div className="px-4 md:px-6 py-1.5 md:py-2 bg-white border border-slate-200 text-slate-500 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 md:gap-3 shadow-sm">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {t.about.badge2}
                </div>
                <div className="px-4 md:px-6 py-1.5 md:py-2 bg-white border border-slate-200 text-slate-500 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 md:gap-3 shadow-sm">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {t.about.badge3}
                </div>
              </div>

              {/* Achievements Link Button */}
              <div className="mt-10 md:mt-14 flex flex-col items-end gap-3 md:gap-4">
                <Link 
                  to="/achievements"
                  className="group relative inline-flex items-center gap-3 md:gap-4 px-7 md:px-10 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-extrabold text-xs md:text-sm tracking-[0.18em] uppercase shadow-lg shadow-red-900/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/60 hover:translate-y-[-2px]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-white/90 animate-pulse"></span>
                    {language === 'ja' ? '国内外レース実績を見る' : 'View Achievements'}
                  </span>
                  <span className="relative z-10 w-10 md:w-12 h-[2px] bg-white/70 group-hover:w-14 md:group-hover:w-16 transition-all duration-300"></span>
                  <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>

                <Link
                  to="/sponsors"
                  className="group relative inline-flex items-center gap-3 md:gap-4 px-7 md:px-10 py-3.5 md:py-4 rounded-full bg-white text-red-600 border border-red-200 font-extrabold text-xs md:text-sm tracking-[0.18em] uppercase shadow-md shadow-red-100 transition-all duration-300 hover:border-red-400 hover:shadow-lg hover:translate-y-[-2px]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    {language === 'ja' ? 'スポンサープランのご相談はこちらから' : 'Become a Sponsor'}
                  </span>
                  <span className="relative z-10 w-10 md:w-12 h-[2px] bg-red-200 group-hover:w-14 md:group-hover:w-16 group-hover:bg-red-400 transition-all duration-300"></span>
                  <span className="absolute inset-0 rounded-full bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>

            {/* Additional "Telemetry" Footer */}
            <div className="mt-6 md:mt-8 flex justify-between items-center text-[9px] md:text-[10px] font-mono text-slate-300 tracking-tighter uppercase px-2">
              <span>System: Active</span>
              <span>Version: 2.0.26</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;