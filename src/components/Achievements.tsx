import React from 'react';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { achievements } from '../data/achievements';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const AchievementItem: React.FC<{ text: string; language: 'ja' | 'en' }> = ({ text, language }) => {
  const isHighAchievement = language === 'ja' 
    ? (text.includes('優勝') || text.includes('チャンピオン') || text.includes('1位'))
    : (text.includes('Winner') || text.includes('Champion') || text.includes('1st'));
  const isRepresentative = language === 'ja' 
    ? text.includes('代表')
    : text.includes('Representative');
  
  return (
    <li className="flex items-start group">
      <div className={`mt-1 sm:mt-1.5 mr-3 sm:mr-4 flex-shrink-0 transition-transform group-hover:scale-110`}>
        {isHighAchievement ? (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-50 flex items-center justify-center">
            <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
          </div>
        ) : isRepresentative ? (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-50 flex items-center justify-center">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
          </div>
        ) : (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-rose-500 transition-colors"></div>
          </div>
        )}
      </div>
      <span className={`text-sm sm:text-base text-gray-600 leading-relaxed transition-colors group-hover:text-gray-900 ${isHighAchievement ? 'font-bold text-gray-900' : ''}`}>
        {text}
      </span>
    </li>
  );
};

const YearTimeline: React.FC<{ year: string; achievements: string[]; language: 'ja' | 'en' }> = ({ 
  year, 
  achievements,
  language,
}) => {
  return (
    <div className="relative pl-10 sm:pl-12 pb-12 md:pb-16 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[9px] sm:left-[11px] top-3 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent"></div>
      
      {/* Year indicator */}
      <div className="absolute left-0 top-0 z-10">
        <div className="w-[18px] h-[18px] sm:w-[23px] sm:h-[23px] rounded-full border-2 sm:border-4 border-white bg-rose-600 shadow-md"></div>
        <div className="absolute top-0 left-8 sm:left-10">
          <span className="text-2xl sm:text-3xl font-black text-gray-900 tabular-nums leading-none">
            {year}
          </span>
        </div>
      </div>
      
      <div className="pt-8 sm:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 md:gap-y-4">
          {achievements.map((achievement, idx) => (
            <AchievementItem key={idx} text={achievement} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Achievements: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="achievements" className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20">
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">{t.achievements.title}</h3>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 md:mb-0">
                {t.achievements.description}
              </p>
              
              <div className="mt-6 md:mt-12 grid grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4 lg:space-y-4">
                <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-amber-50/50 border border-amber-100/50">
                  <div className="text-2xl md:text-3xl font-black text-amber-600 mb-1">15+</div>
                  <div className="text-xs font-bold text-amber-800/60 uppercase tracking-widest">{t.achievements.totalWins}</div>
                </div>
                <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-blue-50/50 border border-blue-100/50">
                  <div className="text-2xl md:text-3xl font-black text-blue-600 mb-1">3</div>
                  <div className="text-xs font-bold text-blue-800/60 uppercase tracking-widest">{t.achievements.annualChampions}</div>
                </div>
                <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-rose-50/50 border border-rose-100/50">
                  <div className="text-2xl md:text-3xl font-black text-rose-600 mb-1">2</div>
                  <div className="text-xs font-bold text-rose-800/60 uppercase tracking-widest">{t.achievements.worldAwards}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="bg-gray-50/50 p-6 sm:p-8 md:p-12 lg:p-16 rounded-2xl md:rounded-[3rem] border border-gray-100">
              <div className="max-w-3xl">
                {Object.entries(achievements[language])
                  .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
                  .map(([year, yearAchievements]) => (
                    <YearTimeline 
                      key={year}
                      year={year}
                      achievements={yearAchievements}
                      language={language}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;