import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    { type: 'video', url: '/videos/Website_Video_480p.mp4' },
    { type: 'image', url: '/images/WDRC TEAM JAPAN PHOTO.jpg' },
    { type: 'image', url: '/images/WTW CUP 2024.jpeg' },
    { type: 'image', url: '/images/FAI Korea Photo.jpeg' },
    { type: 'image', url: '/images/FAI Riyadh.jpg' },
    { type: 'image', url: '/images/drone-night.jpeg' }
  ];

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    // 動画スライドの場合は自動スライドを停止する
    if (slides[currentSlideIndex].type === 'video') {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlideIndex, slides.length]);

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center pt-16 md:pt-20 pb-12 md:pb-0 overflow-hidden bg-white"
    >
      {/* Sliding Background Content */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover brightness-[0.7] grayscale-[0.1]"
              >
                <source src={slide.url} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={slide.url}
                alt="" 
                className="w-full h-full object-cover brightness-[0.7] grayscale-[0.1]"
              />
            )}
            {/* Subtle white overlay to blend with the white theme while keeping content visible */}
            <div className="absolute inset-0 bg-white/60"></div>
          </div>
        ))}
        
        <div className="absolute inset-0 bg-diagonal-stripe opacity-10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-slate-50/50 to-transparent skew-x-12 translate-x-32 z-0 hidden lg:block border-l border-slate-100/50"></div>
        
        {/* Organic accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-left w-full lg:w-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-[0.2em] uppercase mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              FPV Drone Racer
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 mb-6 leading-[0.9] animate-slide-up relative">
              {language === 'ja' ? (
                <div className="flex flex-col">
                  <span>山本悠貴</span>
                  <span className="text-xl sm:text-2xl font-mono text-red-600 tracking-tighter mt-2 opacity-80 uppercase">Yuki Yamamoto</span>
                </div>
              ) : (
                <span>Yuki <br />Yamamoto</span>
              )}
              {/* Artistic underline */}
              <div className="absolute -bottom-4 left-0 w-24 h-1.5 bg-red-600 rounded-full"></div>
              <div className="absolute -bottom-4 left-28 w-4 h-1.5 bg-red-600/20 rounded-full"></div>
            </h1>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 mb-10 max-w-xl leading-relaxed animate-slide-up-delay">
              {t.hero.subtitle}
            </h2>
            
            <div className="flex flex-wrap gap-8 md:gap-16 mb-12 animate-fade-in-delay">
              <div className="relative group">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-slate-200 group-hover:bg-red-600 transition-colors"></div>
                <span className="block text-4xl md:text-5xl font-black text-slate-900 tabular-nums tracking-tighter">15</span>
                <span className="text-[10px] font-bold text-slate-900 mt-1 uppercase tracking-[0.2em]">{t.hero.age}</span>
              </div>
              <div className="relative group">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-slate-200 group-hover:bg-red-600 transition-colors"></div>
                <span className="block text-4xl md:text-5xl font-black text-slate-900 tabular-nums tracking-tighter">15+</span>
                <span className="text-[10px] font-bold text-slate-900 mt-1 uppercase tracking-[0.2em]">{t.hero.wins}</span>
              </div>
              <div className="relative group">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-slate-200 group-hover:bg-red-600 transition-colors"></div>
                <span className="block text-4xl md:text-5xl font-black text-slate-900 tabular-nums tracking-tighter">5</span>
                <span className="text-[10px] font-bold text-slate-900 mt-1 uppercase tracking-[0.2em]">{t.hero.experience}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
              <Link 
                to="/about"
                className="group relative px-8 py-4 bg-slate-900 text-white rounded-none font-bold transition-all hover:bg-red-600 overflow-hidden text-center"
              >
                <span className="relative z-10">{t.hero.viewProfile}</span>
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600 group-hover:w-0 transition-all"></div>
              </Link>
              <Link 
                to="/achievements"
                className="px-8 py-4 bg-transparent text-slate-900 border border-slate-200 rounded-none font-bold hover:border-red-600 hover:text-white transition-all relative overflow-hidden group text-center"
              >
                <span className="relative z-10">{t.hero.achievements}</span>
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in w-full lg:w-auto">
            <div className="relative z-10 w-full max-w-sm mx-auto aspect-[4/5] animate-float">
              {/* Tech frame around image */}
              <div className="absolute -inset-4 border border-slate-100 pointer-events-none"></div>
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-red-600"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-red-600"></div>
              
              <div className="w-full h-full overflow-hidden shadow-2xl transition-all duration-700 ring-1 ring-slate-100 relative bg-slate-100">
                <img 
                  src="/images/yuki_yamamoto.jpg"
                  alt={t.hero.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Telemetry data overlay */}
              <div className="absolute -bottom-8 -left-8 bg-white border border-slate-100 p-4 hidden md:block shadow-xl">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Status</div>
                <div className="text-xs font-mono text-green-600 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-600 animate-ping"></span>
                  READY_TO_FLY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Slider Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-slate-800 hover:bg-white/40 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-slate-800 hover:bg-white/40 transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Background Slider Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlideIndex ? 'bg-red-600 w-4' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to background slide ${index + 1}`}
          />
        ))}
      </div>

      <button 
        onClick={() => {
          const newsSection = document.getElementById('news');
          if (newsSection) {
            newsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 hover:text-red-600 transition-colors animate-bounce z-30"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
