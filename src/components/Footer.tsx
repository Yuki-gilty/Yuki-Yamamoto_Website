import React from 'react';
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
    <footer className="bg-white border-t border-gray-100 pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-10 md:mb-12 lg:mb-16">
          <div className="max-w-sm w-full">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 md:mb-6">
              <span className="font-bold text-xl sm:text-2xl tracking-tight text-gray-900">
                Yuki Yamamoto
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 md:mb-6 text-sm sm:text-base">{t.footer.menu}</h4>
              <nav className="flex flex-col gap-3 md:gap-4">
                <a href="#home" className="text-gray-500 hover:text-rose-600 transition-colors text-xs sm:text-sm">{t.header.home}</a>
                <a href="#about" className="text-gray-500 hover:text-rose-600 transition-colors text-xs sm:text-sm">{t.header.about}</a>
                <a href="#achievements" className="text-gray-500 hover:text-rose-600 transition-colors text-xs sm:text-sm">{t.header.achievements}</a>
                <a href="#news" className="text-gray-500 hover:text-rose-600 transition-colors text-xs sm:text-sm">{t.header.news}</a>
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 md:mb-6 text-sm sm:text-base">{t.footer.social}</h4>
              <nav className="flex flex-col gap-3 md:gap-4">
                <a href="https://www.instagram.com/yukifpv_droneracer/" className="text-gray-500 hover:text-rose-600 transition-colors text-xs sm:text-sm">Instagram</a>
                <a href="https://twitter.com/Fpvyuki13222473" className="text-gray-500 hover:text-rose-600 transition-colors text-xs sm:text-sm">Twitter</a>
                <a href="https://www.youtube.com/@yukifpv9587" className="text-gray-500 hover:text-rose-600 transition-colors text-xs sm:text-sm">YouTube</a>
              </nav>
            </div>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 sm:gap-3 group text-gray-400 hover:text-gray-900 transition-colors self-start"
            >
              <span className="text-xs sm:text-sm font-bold">{t.footer.backToTop}</span>
              <div className="p-1.5 sm:p-2 rounded-full border border-gray-100 group-hover:border-gray-200 transition-colors">
                <ChevronUp size={14} className="sm:w-4 sm:h-4" />
              </div>
            </button>
          </div>
        </div>
        
        <div className="pt-8 sm:pt-10 md:pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="text-gray-400 text-xs tracking-widest uppercase text-center md:text-left">
            &copy; {new Date().getFullYear()} 山本悠貴 (Yuki Yamamoto). All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;