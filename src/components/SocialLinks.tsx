import React from 'react';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const SocialLinks: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/smallyuki_/',
      icon: Instagram,
      username: '@smallyuki_',
      color: 'hover:text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1Wt3WD6bbT/?mibextid=wwXIfr',
      icon: Facebook,
      username: 'Yuki Yamamoto',
      color: 'hover:text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/Fpvyuki13222473',
      icon: Twitter,
      username: '@Fpvyuki13222473',
      color: 'hover:text-sky-500',
      bgColor: 'bg-sky-50'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@yukifpv9587',
      icon: Youtube,
      username: '@yukifpv9587',
      color: 'hover:text-red-600',
      bgColor: 'bg-red-50'
    }
  ];
  
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          <div className="lg:w-1/2 w-full">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">{t.social.title}</h3>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
              {t.social.description}
            </p>
            <p className="text-gray-900 font-bold flex items-center gap-2 text-sm sm:text-base">
              <span className="w-6 sm:w-8 h-px bg-gray-900"></span>
              {t.social.contact}
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center p-4 sm:p-5 md:p-6 rounded-xl md:rounded-[2rem] border border-gray-100 bg-gray-50/30 hover:bg-white transition-all duration-500 hover:shadow-xl hover:border-transparent ${social.color}`}
              >
                <div className={`p-3 sm:p-4 rounded-xl md:rounded-2xl transition-colors duration-500 ${social.bgColor} text-gray-400 group-hover:text-inherit`}>
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="ml-4 sm:ml-5">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">{social.name}</h4>
                  <p className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">{social.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;