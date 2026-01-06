import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center pt-20 md:pt-20 pb-16 md:pb-0 overflow-hidden bg-black"
    >
      {/* Sliding Background Content */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-[0.4] saturate-75 contrast-75 blur-[2px]"
        >
          <source src="/videos/Website_Video_480p.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to keep the background video/images while making foreground content readable */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          <div className="flex-1 text-left w-full lg:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white mb-4 md:mb-6 leading-[0.9] animate-slide-up relative">
              <span>Yuki <br />Yamamoto</span>
              {/* Artistic underline */}
              <div className="absolute -bottom-3 md:-bottom-4 left-0 w-[18rem] sm:w-[24rem] md:w-[34rem] lg:w-[42rem] h-0.5 md:h-1 bg-red-500 rounded-full"></div>
            </h1>
            
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-100 mb-6 md:mb-8 max-w-xl leading-relaxed tracking-wide animate-slide-up-delay">
              <span className="text-red-400">FPV Drone Racer</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-200">Japan</span>
            </h2>
            
            {/* シンプルな構成にするため、数字のカードなどは削除 */}

            <div className="flex flex-col items-start gap-2 animate-fade-in-delay">
              <Link 
                to="/about"
                className="group relative px-6 md:px-10 py-3 md:py-4 bg-red-600 text-white rounded-none font-bold text-sm md:text-base lg:text-lg transition-all hover:bg-red-500 overflow-hidden text-center shadow-lg shadow-red-900/40"
              >
                <span className="relative z-10">{t.hero.viewProfile}</span>
              </Link>
              <Link 
                to="/achievements"
                className="mt-1 px-3 md:px-4 py-1 md:py-1.5 bg-transparent text-gray-300/70 border border-gray-500/60 rounded-none font-medium text-[10px] md:text-[11px] lg:text-xs transition-all text-center self-start"
              >
                <span className="relative z-10">{t.hero.achievements}</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in w-full lg:w-auto">
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-sm mx-auto aspect-[4/5] animate-float">
              {/* subtle light behind the photo to blend with dark background */}
              <div className="pointer-events-none absolute -inset-6 md:-inset-10 rounded-[2rem] md:rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.06)_40%,transparent_70%)] opacity-60 md:opacity-80 blur-xl md:blur-2xl"></div>
              <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl shadow-xl shadow-black/60 transition-all duration-700 bg-white/5">
                <img 
                  src="/images/yuki_yamamoto.jpg"
                  alt={t.hero.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => {
          const upcomingSection = document.getElementById('upcoming');
          if (upcomingSection) {
            upcomingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-6 md:bottom-4 left-1/2 -translate-x-1/2 text-gray-400 hover:text-red-600 transition-colors animate-bounce z-30"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={20} className="md:w-6 md:h-6" />
      </button>
    </section>
  );
};

export default Hero;
