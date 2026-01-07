import React from 'react';
import Hero from '../components/Hero';
import News from '../components/News';
import Videos from '../components/Videos';
import UpcomingRace from '../components/UpcomingRace';
import SponsorLogos from '../components/SponsorLogos';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const HomePage: React.FC = () => {
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/smallyuki_/', icon: Instagram, color: 'text-[#E4405F]' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/1Wt3WD6bbT/?mibextid=wwXIfr', icon: Facebook, color: 'text-[#1877F2]' },
    { name: 'Twitter', url: 'https://twitter.com/Fpvyuki13222473', icon: Twitter, color: 'text-[#1DA1F2]' },
    { name: 'YouTube', url: 'https://www.youtube.com/@yukifpv9587', icon: Youtube, color: 'text-[#FF0000]' },
  ];

  return (
    <>
      <Hero />
      {/* 以前のセクションのダイジェスト版やハイライトをここに置くこともできます */}
      <div className="bg-white">
        <UpcomingRace />
        <News limit={3} isHome={true} />
        <Videos isHome={true} />
        <SponsorLogos />
        
        {/* Social Links Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="h-px w-8 md:w-12 bg-red-600"></div>
                <span className="text-red-600 font-mono text-[10px] md:text-xs tracking-widest uppercase">Follow Me</span>
                <div className="h-px w-8 md:w-12 bg-red-600"></div>
              </div>
              <div className="flex items-center gap-6 md:gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} hover:opacity-70 transition-all`}
                    aria-label={social.name}
                  >
                    <social.icon size={32} className="md:w-10 md:h-10" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

