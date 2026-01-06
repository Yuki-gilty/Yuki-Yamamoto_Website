import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

interface VideoItem {
  id: string; // YouTube video ID
  title: {
    ja: string;
    en: string;
  };
}

const videoItems: VideoItem[] = [
  {
    id: '1auUXebjYTc', // YouTube video ID
    title: {
      ja: '初のイタリア遠征！15歳ドローンレーサーが挑んだ世界大会のリアル',
      en: 'First Italian Expedition! A 15-year-old drone racer challenges the world championship',
    },
  },
  {
    id: 'OoylW1SI9Kk', // YouTube video ID
    title: {
      ja: 'ep.26 高校生がクラファン？！世界を目指す高校生ドローンレーサー山本悠貴の更なる挑戦とは！',
      en: 'Ep.26 High School Student Crowdfunding?! High School Drone Racer Yuki Yamamoto\'s Further Challenge to the World!',
    },
  },
];

interface VideosProps {
  isHome?: boolean;
}

const Videos: React.FC<VideosProps> = ({ isHome = false }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="videos" className={`${isHome ? 'py-10 sm:py-12 md:py-20' : 'py-12 sm:py-16 md:py-32'} bg-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-diagonal-stripe opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`flex flex-col ${isHome ? 'items-center text-center' : 'md:flex-row md:items-end justify-between'} ${isHome ? 'mb-6 md:mb-12' : 'mb-8 md:mb-20'} gap-6 md:gap-8`}>
          <div className={`${isHome ? 'max-w-3xl' : 'max-w-2xl'}`}>
            <div className={`flex items-center ${isHome ? 'justify-center' : ''} gap-3 md:gap-4 mb-3 md:mb-4`}>
              <div className="h-px w-8 md:w-12 bg-red-600"></div>
              <span className={`text-red-600 font-mono ${isHome ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'} tracking-widest uppercase`}>Video Archive</span>
              {isHome && <div className="h-px w-8 md:w-12 bg-red-600"></div>}
            </div>
            <h3 className={`${isHome ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-black text-slate-900 leading-tight`}>
              {t.videos.title}
            </h3>
          </div>
          {!isHome && (
            <p className="text-slate-500 text-base md:text-lg max-w-sm font-medium border-l-2 border-slate-100 pl-4 md:pl-6">
              {t.videos.description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {videoItems.map((video, index) => (
            <div
              key={index}
              className="relative bg-white border border-slate-100 p-3 md:p-4 transition-all duration-500 hover:border-red-600/50 shadow-sm hover:shadow-xl group"
            >
              {/* Decorative corner */}
              <div className="absolute -top-px -right-px w-4 h-4 md:w-6 md:h-6 bg-slate-50 border-b border-l border-slate-100"></div>
              
              <div className="relative aspect-video overflow-hidden bg-slate-50 mb-3 md:mb-4">
                {video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title[language]}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-slate-300 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-center">
                      Video_ID_Required
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col">
                <div className="text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 flex justify-between">
                  <span>File: VIDEO_00{index + 1}</span>
                  <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[6px] md:text-[7px]">
                    PLAY_VIDEO
                  </span>
                </div>
                <h3 className="font-bold text-base md:text-xl text-slate-900 leading-tight group-hover:text-red-600 transition-colors line-clamp-2 uppercase tracking-tighter">
                  {video.title[language]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;

