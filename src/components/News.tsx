import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

interface NewsItem {
  date: string;
  title: {
    ja: string;
    en: string;
  };
  content: {
    ja: string;
    en: string;
  };
  imageUrl?: string;
}

const newsItems: NewsItem[] = [
  {
    date: '2025-08-22',
    title: {
      ja: 'ドローンショー・ジャパン様にスポンサーとしてサポートしていただけることとなりました！',
      en: 'Drone Show Japan to Sponsor Our Activities!'
    },
    content: {
      ja: `この度、ドローンショー・ジャパン様にスポンサーしていただけることになりました！！

プレスリリースはこちら↓
https://prtimes.jp/main/html/rd/p/000000126.000080729.html

代表の山本雄貴さん（僕と読みが同じ"やまもと ゆうき"）とのご縁から始まり、こうして応援いただけること、本当に光栄です！

2025年8月から1年間、機体や部品、海外のレースの遠征費などサポートしていただけることになり、これから挑戦する舞台に向けて大きな力をいただきました。

より一層結果を出し、世界中の人にドローンの魅力を届けられるよう頑張っていきます。

引き続き応援よろしくお願いします！`,
      en: `We are pleased to announce that Drone Show Japan will be sponsoring our activities!

Press release here↓
https://prtimes.jp/main/html/rd/p/000000126.000080729.html

It all started with a connection to President Yuki Yamamoto (pronounced the same as my name "Yuki Yamamoto"), and I am truly honored to receive this support!

Starting from August 2025 for one year, they will support us with drones, parts, and expenses for international races, giving us great strength for the challenges ahead.

I will work even harder to achieve results and share the appeal of drones with people around the world.

Thank you for your continued support!`
    },
    imageUrl: '/images/Newsphoto_DSJ_release.jpg',
  },
  {
    date: '2025-09-03',
    title: {
      ja: 'クラウドファンディングのプロジェクトをキックオフしました！',
      en: 'Crowdfunding Project Launched!'
    },
    content: {
      ja: `こんにちは！山本悠貴です！

このたび、ドイツで開催されるドローンレースの世界大会「MultiGP European Championship」に出場します！

世界トップレベルの選手たちと同じ舞台で戦えるチャンスですが、遠征にかかる渡航費・機材費などがとても大きく、正直、自分ひとりの力では難しい部分もあります。

そこで、クラウドファンディングに挑戦することにしました！
ご支援いただけたら嬉しいですし、いいねやシェアしていただけると大変助かります🙇

▶️ クラファンページはこちら
https://camp-fire.jp/projects/876711/view

最後まで全力で走り抜けます！！
どうか応援、よろしくお願いします！！`,
      en: `Hello! This is Yuki Yamamoto!

I will be participating in the world championship drone racing competition "MultiGP European Championship" held in Germany!

This is a chance to compete on the same stage as the world's top-level racers, but the travel and equipment costs for the expedition are very high, and honestly, it's difficult to manage on my own.

So, I've decided to try crowdfunding!
I would be happy if you could support me, and I would greatly appreciate likes and shares🙇

▶️ Crowdfunding page here
https://camp-fire.jp/projects/876711/view

I will give it my all until the end!!
Please support me!!`
    },
    imageUrl: '/images/NewsPhoto_Kickoff.png',
  },
  {
    date: '2025-09-05',
    title: {
      ja: 'クラウドファンディング目標金額に達成しました！',
      en: 'Crowdfunding Goal Achieved!'
    },
    content: {
      ja: `皆さんこんにちは！山本悠貴です！

皆さんの支援により、目標の１つであるドイツと韓国のレースに出場できる金額を集めることができました！

ご支援、拡散してくださった方、心から感謝申し上げます！

そして次の目標であるアメリカのレースに出場するために引き続き拡散や支援していただけると幸いです！

引き続きよろしくお願いいたします！`,
      en: `Hello everyone! This is Yuki Yamamoto!

Thanks to everyone's support, we were able to raise enough funds to participate in one of our goals: the races in Germany and Korea!

I sincerely thank everyone who supported and shared the campaign!

I would appreciate your continued sharing and support to achieve our next goal of participating in the race in America!

Thank you for your continued support!`
    },
    imageUrl: '/images/NewsPhoto_Achieve_founding.jpg',
  },
  {
    date: '2025-09-09',
    title: {
      ja: 'ドロサツ!!様にスポンサーとしてサポートしていただけることになりました！',
      en: 'Drosatsu!! to Sponsor Our Activities!'
    },
    content: {
      ja: `このたび、ドイツで開催される世界大会に向けて、ドロサツ様にスポンサーとしてサポートしていただけることになりました！

＜ドロサツ様について＞
DJI正規ディーラであるドローンの販売・レンタルは【ドロサツ!!】へ！ 法人導入から個人利用まで幅広くサポートします。
Webサイトはこちら→https://drosatsu.jp/`,
      en: `We are pleased to announce that Drosatsu!! will be sponsoring our activities for the world championship held in Germany!

＜About Drosatsu!!＞
For DJI authorized dealer drone sales and rentals, visit 【Drosatsu!!】! We provide comprehensive support from corporate implementation to personal use.
Website here→https://drosatsu.jp/`
    },
    imageUrl: '/images/NewsPhoto_Drosatsu.webp',
  },
  {
    date: '2025-09-21',
    title: {
      ja: '102万円の支援をいただき、クラウドファンディング終了しました！',
      en: 'Crowdfunding Completed with 1.02 Million Yen in Support!'
    },
    content: {
      ja: `クラウドファンディング終了しました！

最終的に102万8500円のご支援をいただきました！本当にありがとうございます🙇‍♂️

いただいた資金はドイツ・韓国・アメリカのレースで大切に使わせていただきます。`,
      en: `The crowdfunding campaign has ended!

We received a total of 1,028,500 yen in support! Thank you so much🙇‍♂️

The funds received will be used carefully for the races in Germany, Korea, and America.`
    },
    imageUrl: '/images/NewsPhoto_Goal＿founding.png',
  },
];

// URLを検出してリンクに変換する関数
const renderContentWithLinks = (text: string) => {
  // URLの正規表現パターン（http://、https://、www.で始まるURL）
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = text.split(urlPattern);
  
  return parts.map((part, index) => {
    // URLかどうかを判定
    if (urlPattern.test(part)) {
      // www.で始まる場合はhttps://を追加
      const href = part.startsWith('www.') ? `https://${part}` : part;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline break-all"
        >
          {part}
        </a>
      );
    }
    // 改行を保持
    return <span key={index}>{part}</span>;
  });
};

interface NewsProps {
  limit?: number;
  isHome?: boolean;
}

const News: React.FC<NewsProps> = ({ limit, isHome }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  const [isOpening, setIsOpening] = useState(false);

  const openModal = (item: NewsItem) => {
    setSelectedItem(item);
    setIsOpening(true);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
    // 次のフレームでアニメーションを確実にトリガー
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpening(false);
      });
    });
  };

  const closeModal = () => {
    setIsClosing(true);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
    }, 500); // アニメーション時間（duration-500）と合わせる
  };

  const sortedItems = [...newsItems].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayItems = limit ? sortedItems.slice(0, limit) : sortedItems;

  return (
    <section id="news" className={`${isHome ? 'py-10 sm:py-12 md:py-20' : 'py-12 sm:py-16 md:py-32'} bg-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-diagonal-stripe opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`flex flex-col ${isHome ? 'items-center text-center' : 'md:flex-row md:items-end justify-between'} ${isHome ? 'mb-6 md:mb-12' : 'mb-8 md:mb-20'} gap-6 md:gap-8`}>
          <div className={`${isHome ? 'max-w-3xl' : 'max-w-2xl'}`}>
            <div className={`flex items-center ${isHome ? 'justify-center' : ''} gap-3 md:gap-4 mb-3 md:mb-4`}>
              <div className="h-px w-8 md:w-12 bg-red-600"></div>
              <span className={`text-red-600 font-mono ${isHome ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'} tracking-widest uppercase`}>Latest Updates</span>
              {isHome && <div className="h-px w-8 md:w-12 bg-red-600"></div>}
            </div>
            <h3 className={`${isHome ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-black text-slate-900 leading-tight`}>
              News & <span className="text-red-600">Moments</span>
            </h3>
          </div>
          {!isHome && (
            <p className="text-slate-500 text-base md:text-lg max-w-sm font-medium border-l-2 border-slate-100 pl-4 md:pl-6">
              {t.news.description}
            </p>
          )}
        </div>
        
        <div className={`${isHome ? 'max-w-5xl mx-auto' : ''}`}>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isHome ? 'gap-4 md:gap-6' : 'gap-6 md:gap-10 lg:gap-12'}`}>
            {displayItems.map((item, index) => {
              const formattedDate = new Date(item.date).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              // Alternate rotation for a more "natural" feel
              const rotation = index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';

              return (
                <div
                  key={index}
                  className="flex flex-col group cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className={`relative bg-white border border-slate-100 ${isHome ? 'p-2 md:p-2.5' : 'p-3 md:p-4'} transition-all duration-500 shadow-sm hover:shadow-md ${rotation}`}>
                    {/* Decorative corner */}
                    <div className="absolute -top-px -right-px w-4 h-4 md:w-6 md:h-6 bg-slate-50 border-b border-l border-slate-100"></div>
                    
                    <div className={`relative aspect-[16/10] overflow-hidden ${isHome ? 'mb-2 md:mb-3' : 'mb-4 md:mb-6'} bg-slate-50`}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title[language]}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-slate-300 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-center">No visual<br/>data_available</p>
                        </div>
                      )}
                      
                      <div className={`absolute top-0 left-0 bg-red-600 text-white ${isHome ? 'px-1 md:px-1.5 py-0.5 text-[6px] md:text-[7px]' : 'px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-[10px]'} font-mono font-bold uppercase tracking-widest`}>
                        {formattedDate}
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5 flex justify-between">
                        <span>File: NEWS_00{newsItems.length - index}</span>
                        <span className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[6px] md:text-[7px]">OPEN_FILE</span>
                      </div>
                      <h3 className={`font-bold ${isHome ? 'text-xs md:text-sm' : 'text-base md:text-xl'} text-slate-900 leading-tight group-hover:text-red-600 transition-colors line-clamp-2 uppercase tracking-tighter`}>
                        {item.title[language]}
                      </h3>
                    </div>
                  </div>

                  {/* Details - Moved outside the white border */}
                  <div className={`mt-2 md:mt-3 px-1 flex items-center justify-between text-[8px] md:text-[9px] font-mono text-slate-400 uppercase tracking-widest`}>
                    <span className="group-hover:text-red-600 transition-colors font-bold">
                      {language === 'ja' ? '詳細' : 'Details'}
                    </span>
                    <span className={`w-6 md:w-8 h-px bg-slate-200 group-hover:w-10 md:group-hover:w-12 group-hover:bg-red-600 transition-all duration-300`}></span>
                  </div>
                </div>
              );
            })}
          </div>

          {isHome && (
            <div className="mt-8 md:mt-16 flex justify-center">
              <Link 
                to="/news"
                className="group relative px-6 md:px-10 py-3 md:py-4 bg-white text-slate-900 border border-slate-200 font-bold transition-all hover:border-red-600 hover:text-red-600 overflow-hidden flex items-center gap-2 md:gap-3"
              >
                <span className="relative z-10 uppercase tracking-widest text-[10px] md:text-xs">
                  {language === 'ja' ? 'すべてのニュースを見る' : 'View All News'}
                </span>
                <span className="relative z-10 w-6 md:w-8 h-px bg-slate-200 group-hover:bg-red-600 group-hover:w-10 md:group-hover:w-12 transition-all"></span>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Detail View - Refined for "Dossier" feel */}
      {selectedItem && (
        <div 
          className={`fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-500 ease-out ${
            isClosing || isOpening ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeModal}
        >
          <div 
            className={`bg-white w-full max-w-6xl max-h-full overflow-hidden relative flex flex-col md:flex-row tech-border shadow-2xl transition-all duration-500 ease-out ${
              isClosing || isOpening ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 bg-slate-50 flex items-center justify-center overflow-hidden relative">
              {selectedItem.imageUrl ? (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title[language]}
                  className="w-full h-full object-contain p-4 md:p-8"
                />
              ) : (
                <div className="text-slate-300 font-mono">NO_IMAGE_DATA</div>
              )}
              {/* Scanline effect on image */}
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-grid-pattern"></div>
            </div>
            
            {/* Content Side */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 lg:p-12 xl:p-16 bg-white">
              <div className="flex justify-between items-start mb-6 md:mb-10">
                <div className="text-[9px] md:text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em]">
                  Date: {selectedItem.date}
                </div>
                <button
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                  onClick={closeModal}
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-4xl font-black text-slate-900 mb-6 md:mb-8 leading-tight uppercase tracking-tighter">
                {selectedItem.title[language]}
              </h3>
              
              <div className="prose max-w-none text-slate-600 leading-relaxed font-medium text-base md:text-lg whitespace-pre-line border-l border-red-600/30 pl-4 md:pl-6">
                {renderContentWithLinks(selectedItem.content[language])}
              </div>

              <div className="mt-8 md:mt-12 flex justify-end">
                <button
                  className="px-6 md:px-8 py-2 md:py-3 bg-red-600 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-red-500 transition-colors"
                  onClick={closeModal}
                >
                  {t.news.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;