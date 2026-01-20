import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-12 md:pt-16 lg:pt-32 pb-10 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 lg:gap-20 mb-12 md:mb-20">
          <div className="max-w-sm w-full">
            <div className="flex flex-col mb-6 md:mb-8">
              <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 uppercase">
                Yuki Yamamoto
              </span>
              <span className="text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mt-1">
                FPV Pilot / Professional Racer
              </span>
            </div>
            <div className="flex gap-3 md:gap-4">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-red-600 animate-pulse"></div>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-200"></div>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-200"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
            <div>
              <h4 className="font-mono text-[9px] md:text-[10px] text-slate-300 uppercase tracking-widest mb-4 md:mb-6">{t.footer.menu}</h4>
              <nav className="flex flex-col gap-3 md:gap-4">
                <Link to="/" className="text-slate-500 hover:text-red-600 transition-colors text-xs md:text-sm font-medium">{t.header.home}</Link>
                <Link to="/#about" className="text-slate-500 hover:text-red-600 transition-colors text-xs md:text-sm font-medium">{t.header.about}</Link>
                <Link to="/achievements" className="text-slate-500 hover:text-red-600 transition-colors text-xs md:text-sm font-medium">{t.header.achievements}</Link>
                <Link to="/news" className="text-slate-500 hover:text-red-600 transition-colors text-xs md:text-sm font-medium">{t.header.news}</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-mono text-[9px] md:text-[10px] text-slate-300 uppercase tracking-widest mb-4 md:mb-6">{t.footer.social}</h4>
              <nav className="flex flex-col gap-3 md:gap-4">
                <a href="https://www.instagram.com/yukifpv_droneracer/" className="text-slate-500 hover:text-red-600 transition-colors text-xs md:text-sm font-medium">Instagram</a>
                <a href="https://twitter.com/Fpvyuki13222473" className="text-slate-500 hover:text-red-600 transition-colors text-xs md:text-sm font-medium">Twitter</a>
                <a href="https://www.youtube.com/@yukifpv9587" className="text-slate-500 hover:text-red-600 transition-colors text-xs md:text-sm font-medium">YouTube</a>
              </nav>
            </div>
            <div className="flex flex-col justify-end">
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-3 md:gap-4 group text-slate-400 hover:text-slate-900 transition-colors"
              >
                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest">{t.footer.backToTop}</span>
                <div className="p-1.5 md:p-2 border border-slate-200 group-hover:border-red-600 transition-colors">
                  <ChevronUp size={14} className="md:w-4 md:h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 md:pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="text-slate-400 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} 山本悠貴 (Yuki Yamamoto) / SYS_ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </div>
          <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] font-mono text-slate-200 uppercase tracking-widest">
            <span>Lat: 35.6895</span>
            <span>Lng: 139.6917</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
