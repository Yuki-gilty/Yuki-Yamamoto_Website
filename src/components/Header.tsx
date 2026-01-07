import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import { ChevronDown, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/smallyuki_/', icon: Instagram, color: 'text-[#E4405F]' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/1Wt3WD6bbT/?mibextid=wwXIfr', icon: Facebook, color: 'text-[#1877F2]' },
    { name: 'Twitter', url: 'https://twitter.com/Fpvyuki13222473', icon: Twitter, color: 'text-[#1DA1F2]' },
    { name: 'YouTube', url: 'https://www.youtube.com/@yukifpv9587', icon: Youtube, color: 'text-[#FF0000]' },
  ];

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
    { name: t.header.home, href: '/' },
    { name: t.header.about, href: '/about' },
    { name: t.header.achievements, href: '/achievements' },
    { name: t.header.gallery, href: '/gallery' },
    { name: t.header.news, href: '/news' },
    { name: t.header.sponsors, href: '/sponsors' },
  ];

  const handleLanguageSelect = (lang: 'ja' | 'en') => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-lg shadow-sm border-b border-white/10 py-3 md:py-4' 
          : 'bg-black/40 backdrop-blur-lg py-3 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group relative">
            <span className={`font-bold text-lg sm:text-xl tracking-tight transition-colors text-white`}>
              Yuki Yamamoto
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.href}
              to={item.href}
              className={({ isActive }) => 
                `px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Language Selector */}
          <div className="relative ml-2" ref={languageDropdownRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
                isScrolled ? 'bg-white/5 text-gray-100' : 'bg-white/5 text-gray-100'
              } hover:bg-white/10`}
            >
              {t.header.language}
              <span className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-white/40 bg-white">
                {language === 'ja' ? (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="#FFFFFF"/>
                    <circle cx="50" cy="50" r="30" fill="#BC002D"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="#012169"/>
                    <path d="M0,0 L100,100 M100,0 L0,100" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round"/>
                    <path d="M0,50 L100,50 M50,0 L50,100" stroke="#FFFFFF" strokeWidth="20"/>
                    <path d="M0,0 L100,100 M100,0 L0,100" stroke="#C8102E" strokeWidth="12" strokeLinecap="round"/>
                    <path d="M0,50 L100,50 M50,0 L50,100" stroke="#C8102E" strokeWidth="12"/>
                  </svg>
                )}
              </span>
              <ChevronDown size={14} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                <button
                  onClick={() => handleLanguageSelect('ja')}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    language === 'ja' 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  日本語
                </button>
                <button
                  onClick={() => handleLanguageSelect('en')}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors border-t border-slate-100 ${
                    language === 'en' 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  English
                </button>
              </div>
            )}
          </div>
        </nav>
        
        <button 
          className="md:hidden p-2 rounded-lg transition-colors hover:bg-slate-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <div className={`w-full h-0.5 rounded-full transition-all bg-white ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-full h-0.5 rounded-full transition-all bg-white ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-full h-0.5 rounded-full transition-all bg-white ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 transition-all duration-300 shadow-xl ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <nav className="flex flex-col p-4 md:p-6 gap-1.5 md:gap-2">
          {/* Mobile Social Links */}
          <div className="flex items-center gap-4 md:gap-6 px-3 md:px-4 py-3 md:py-4 mb-1 md:mb-2 border-b border-slate-100 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} hover:opacity-70 transition-all`}
                aria-label={social.name}
              >
                <social.icon size={20} className="md:w-6 md:h-6" />
              </a>
            ))}
          </div>

          {navItems.map((item) => (
            <NavLink 
              key={item.href}
              to={item.href}
              className={({ isActive }) => 
                `text-base md:text-lg font-medium py-2.5 md:py-3 px-3 md:px-4 rounded-xl transition-all ${
                  isActive ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          
          {/* Mobile Language Selector */}
          <div className="pt-1.5 md:pt-2 border-t border-slate-100 mt-1 md:mt-2">
            <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider px-3 md:px-4 mb-1.5 md:mb-2 flex items-center gap-2">
              {t.header.language}
              <span className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full overflow-hidden flex-shrink-0 border border-slate-300 bg-white">
                {language === 'ja' ? (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="#FFFFFF"/>
                    <circle cx="50" cy="50" r="30" fill="#BC002D"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="#012169"/>
                    <path d="M0,0 L100,100 M100,0 L0,100" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round"/>
                    <path d="M0,50 L100,50 M50,0 L50,100" stroke="#FFFFFF" strokeWidth="20"/>
                    <path d="M0,0 L100,100 M100,0 L0,100" stroke="#C8102E" strokeWidth="12" strokeLinecap="round"/>
                    <path d="M0,50 L100,50 M50,0 L50,100" stroke="#C8102E" strokeWidth="12"/>
                  </svg>
                )}
              </span>
            </div>
            <button
              onClick={() => {
                handleLanguageSelect('ja');
                setIsMenuOpen(false);
              }}
              className={`w-full text-left text-base md:text-lg font-medium py-2.5 md:py-3 px-3 md:px-4 rounded-xl transition-all ${
                language === 'ja' 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              日本語
            </button>
            <button
              onClick={() => {
                handleLanguageSelect('en');
                setIsMenuOpen(false);
              }}
              className={`w-full text-left text-base md:text-lg font-medium py-2.5 md:py-3 px-3 md:px-4 rounded-xl transition-all ${
                language === 'en' 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-slate-700 hover:bg-slate-50'
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
