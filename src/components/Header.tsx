import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  const navItems = [
    { name: t.header.home, href: 'home' },
    { name: t.header.about, href: 'about' },
    { name: t.header.achievements, href: 'achievements' },
    { name: t.header.gallery, href: 'gallery' },
    { name: t.header.news, href: 'news' },
    { name: t.header.sponsors, href: 'sponsors' },
  ];

  const handleLanguageSelect = (lang: 'ja' | 'en') => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-2 md:py-3' 
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className={`font-bold text-lg sm:text-xl tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Yuki Yamamoto
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={`#${item.href}`}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:bg-rose-50 hover:text-rose-600 ${
                isScrolled ? 'text-gray-600' : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
          
          {/* Language Selector */}
          <div className="relative ml-2" ref={languageDropdownRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:bg-rose-50 hover:text-rose-600 flex items-center gap-1 ${
                isScrolled ? 'text-gray-600' : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t.header.language}
              <ChevronDown size={14} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <button
                  onClick={() => handleLanguageSelect('ja')}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    language === 'ja' 
                      ? 'bg-rose-50 text-rose-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  日本語
                </button>
                <button
                  onClick={() => handleLanguageSelect('en')}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors border-t border-gray-100 ${
                    language === 'en' 
                      ? 'bg-rose-50 text-rose-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  English
                </button>
              </div>
            )}
          </div>
        </nav>
        
        <button 
          className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <div className={`w-full h-0.5 rounded-full transition-all ${isScrolled ? 'bg-gray-900' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-full h-0.5 rounded-full transition-all ${isScrolled ? 'bg-gray-900' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-full h-0.5 rounded-full transition-all ${isScrolled ? 'bg-gray-900' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={`#${item.href}`}
              className="text-lg font-medium text-gray-900 hover:text-rose-600 py-3 px-4 rounded-xl hover:bg-rose-50 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-gray-100 mt-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">
              {t.header.language}
            </div>
            <button
              onClick={() => {
                handleLanguageSelect('ja');
                setIsMenuOpen(false);
              }}
              className={`w-full text-left text-lg font-medium py-3 px-4 rounded-xl transition-all ${
                language === 'ja' 
                  ? 'bg-rose-50 text-rose-600' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
            >
              日本語
            </button>
            <button
              onClick={() => {
                handleLanguageSelect('en');
                setIsMenuOpen(false);
              }}
              className={`w-full text-left text-lg font-medium py-3 px-4 rounded-xl transition-all ${
                language === 'en' 
                  ? 'bg-rose-50 text-rose-600' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
            >
              English
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;