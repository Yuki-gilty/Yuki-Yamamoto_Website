import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-32 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{t.about.title}</h2>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 items-stretch">
          {/* Left: Basic Info */}
          <div className="lg:w-1/3 flex">
            <div className="w-full p-6 sm:p-8 md:p-10 bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-rose-50 flex items-center justify-center mr-3">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                </div>
                {t.about.basicInfo}
              </h3>
              
              <div className="space-y-4 md:space-y-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 border-b border-gray-50 pb-3 md:pb-4">
                  <span className="text-gray-400 text-xs sm:text-sm font-medium">{t.about.name}</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{language === 'ja' ? '山本悠貴' : 'Yuki Yamamoto'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 border-b border-gray-50 pb-3 md:pb-4">
                  <span className="text-gray-400 text-xs sm:text-sm font-medium">{t.about.birthdate}</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{language === 'ja' ? '2010年3月23日 (15歳)' : 'March 23, 2010 (15 years old)'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 border-b border-gray-50 pb-3 md:pb-4">
                  <span className="text-gray-400 text-xs sm:text-sm font-medium">{t.about.birthplace}</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{language === 'ja' ? '東京都杉並区' : 'Suginami, Tokyo'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                  <span className="text-gray-400 text-xs sm:text-sm font-medium mt-1">{t.about.affiliation}</span>
                  <span className="font-bold text-gray-900 text-right leading-snug text-sm sm:text-base">
                    TEAM BRIDE
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Self Introduction */}
          <div className="lg:w-2/3 flex">
            <div className="w-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8">{t.about.selfIntroduction}</h3>
              
              <div className="text-gray-600 leading-relaxed text-base sm:text-lg space-y-4 md:space-y-6 flex-1">
                <p>
                  {t.about.intro1}
                </p>
                
                <p>
                  {t.about.intro2}
                </p>
                
                <p>
                  {t.about.intro3}
                </p>
              </div>

              <div className="mt-8 md:mt-12 flex flex-wrap gap-2 md:gap-3">
                <div className="px-4 md:px-5 py-2 md:py-2.5 bg-slate-50 border border-slate-100 rounded-full text-slate-600 text-xs sm:text-sm font-bold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 md:mr-2.5"></span>
                  {t.about.badge1}
                </div>
                
                <div className="px-4 md:px-5 py-2 md:py-2.5 bg-slate-50 border border-slate-100 rounded-full text-slate-600 text-xs sm:text-sm font-bold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 md:mr-2.5"></span>
                  {t.about.badge2}
                </div>
                
                <div className="px-4 md:px-5 py-2 md:py-2.5 bg-slate-50 border border-slate-100 rounded-full text-slate-600 text-xs sm:text-sm font-bold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-800 mr-2 md:mr-2.5"></span>
                  {t.about.badge3}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;