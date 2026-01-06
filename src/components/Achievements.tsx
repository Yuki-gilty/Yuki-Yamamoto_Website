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
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
          </div>
        ) : isRepresentative ? (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600" />
          </div>
        ) : (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-red-600 transition-colors"></div>
          </div>
        )}
      </div>
      <span className={`text-sm sm:text-base text-slate-600 leading-relaxed transition-colors group-hover:text-slate-900 ${isHighAchievement ? 'font-bold text-slate-900' : ''}`}>
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
      <div className="absolute left-[9px] sm:left-[11px] top-3 bottom-0 w-px bg-gradient-to-b from-red-600/50 via-red-600/20 to-transparent"></div>
      
      {/* Year indicator */}
      <div className="absolute left-0 top-0 z-10">
        <div className="w-[18px] h-[18px] sm:w-[23px] sm:h-[23px] rounded-full border-2 sm:border-4 border-white bg-red-600 shadow-lg shadow-red-600/20"></div>
        <div className="absolute top-0 left-8 sm:left-10">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums leading-none">
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
      <div className="absolute inset-0 bg-diagonal-stripe opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-red-600"></div>
                <span className="text-red-600 font-mono text-sm tracking-widest uppercase">Performance Log</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">
                {t.achievements.title}
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                {t.achievements.description}
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="tech-border p-6 bg-white shadow-lg shadow-slate-100">
                  <div className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">15+</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">{t.achievements.totalWins}</div>
                </div>
                <div className="tech-border p-6 bg-white shadow-lg shadow-slate-100">
                  <div className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">3</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">{t.achievements.annualChampions}</div>
                </div>
                <div className="tech-border p-6 bg-white shadow-lg shadow-slate-100">
                  <div className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">2</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">{t.achievements.worldAwards}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="bg-slate-50 border border-slate-100 p-8 md:p-16 relative">
              {/* Corner markings */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rotate-45 translate-x-12 -translate-y-12"></div>
              
              <div className="max-w-3xl relative z-10">
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