import React from 'react';
import { Trophy, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Race {
  date: string;
  name: {
    ja: string;
    en: string;
  };
  location: {
    ja: string;
    en: string;
  };
  status: 'upcoming' | 'ongoing' | 'finished';
  link?: string;
}

const races: Race[] = [
  {
    date: '2026.1.31 - 2.1',
    name: {
      ja: 'BIRMINGHAM TINY WHOOPERS BIRD 2026',
      en: 'BIRMINGHAM TINY WHOOPERS BIRD 2026'
    },
    location: {
      ja: 'バーミンガム (UK)',
      en: 'Birmingham, UK'
    },
    status: 'upcoming',
    link: 'https://www.btwclub.co.uk/events/bird-2026'
  },
  {
    date: '2026',
    name: {
      ja: '未定',
      en: 'Pending'
    },
    location: {
      ja: 'N/A',
      en: 'N/A'
    },
    status: 'upcoming'
  }
];

const UpcomingRace: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="upcoming" className="py-10 sm:py-12 md:py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/5 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 md:mb-14">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="h-px w-8 md:w-12 bg-red-600"></div>
              <span className="text-red-600 font-mono text-[10px] md:text-xs tracking-widest uppercase flex items-center gap-2">
                <Trophy size={12} className="md:w-[14px] md:h-[14px]" />
                Next Challenges
              </span>
              <div className="h-px w-8 md:w-12 bg-red-600"></div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              Upcoming <span className="text-red-600">Races</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
            {races.map((race, index) => (
              <div 
                key={index} 
                className="group relative bg-white border border-slate-100 p-5 md:p-6 lg:p-8 transition-all duration-500 hover:shadow-2xl hover:border-red-600/20"
              >
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t border-l border-slate-200 group-hover:border-red-600 transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b border-r border-slate-200 group-hover:border-red-600 transition-colors"></div>
                
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="px-2 md:px-3 py-0.5 md:py-1 bg-slate-900 text-white text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest">
                      {race.date}
                    </div>
                    {race.status === 'upcoming' && (
                      <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-mono text-green-600 font-bold uppercase tracking-widest">
                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                        CONFIRMED
                      </div>
                    )}
                  </div>

                  <h4 className="text-base md:text-lg lg:text-xl font-black text-slate-900 mb-4 md:mb-6 group-hover:text-red-600 transition-colors leading-tight uppercase tracking-tighter">
                    {race.name[language]}
                  </h4>

                  <div className="mt-auto space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2 md:gap-3 text-slate-500 font-medium text-xs md:text-sm">
                      <MapPin size={14} className="md:w-4 md:h-4 text-red-600" />
                      {race.location[language]}
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-slate-400 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] pt-3 md:pt-4 border-t border-slate-100">
                      <Calendar size={12} className="md:w-[14px] md:h-[14px]" />
                      Race_Schedule_Locked
                    </div>
                  </div>

                  {race.link && (
                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-100 flex justify-end">
                      <a 
                        href={race.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-bold text-slate-900 hover:text-red-600 transition-colors uppercase tracking-[0.2em]"
                      >
                        {language === 'ja' ? '大会Webページはこちら' : 'Event Page'}
                        <ExternalLink size={12} className="md:w-[14px] md:h-[14px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-14 flex justify-center">
            <div className="text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3 md:gap-4">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-slate-200"></span>
              Synchronizing Race Database
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-slate-200"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingRace;

