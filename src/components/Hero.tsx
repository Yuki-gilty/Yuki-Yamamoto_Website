import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center pt-16 md:pt-20 pb-12 md:pb-0 overflow-hidden bg-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-50/50 skew-x-12 translate-x-32 z-0 hidden lg:block"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <div className="flex-1 text-left w-full lg:w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-[1.1] animate-slide-up">
              {language === 'ja' ? (
                <>山本悠貴 <span className="font-normal block sm:inline">(Yuki Yamamoto)</span></>
              ) : (
                <>Yuki Yamamoto</>
              )}
            </h1>
            
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 mb-6 md:mb-10 animate-slide-up-delay">
              {t.hero.subtitle}
            </h2>
            
            <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 animate-fade-in-delay">
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">15</span>
                <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">{t.hero.age}</span>
              </div>
              <div className="w-px bg-gray-200 h-10 md:h-12 self-center"></div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">15+</span>
                <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">{t.hero.wins}</span>
              </div>
              <div className="w-px bg-gray-200 h-10 md:h-12 self-center"></div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">5</span>
                <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">{t.hero.experience}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 animate-fade-in-delay">
              <a 
                href="#about"
                className="px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-1 text-sm md:text-base text-center"
              >
                {t.hero.viewProfile}
              </a>
              <a 
                href="#achievements"
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all text-sm md:text-base text-center"
              >
                {t.hero.achievements}
              </a>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in w-full lg:w-auto mt-8 lg:mt-0">
            <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
              <img 
                src="/images/yuki_yamamoto.jpg"
                alt={t.hero.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-rose-100 rounded-full -z-10 blur-3xl opacity-60 hidden sm:block"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 md:w-60 md:h-60 bg-blue-100 rounded-full -z-10 blur-3xl opacity-60 hidden sm:block"></div>
          </div>
        </div>
      </div>

      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-rose-600 transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default Hero;