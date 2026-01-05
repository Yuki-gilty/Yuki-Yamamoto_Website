import React, { useState } from 'react';
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
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {part}
        </a>
      );
    }
    // 改行を保持
    return <span key={index}>{part}</span>;
  });
};

const News: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  const openModal = (item: NewsItem) => {
    setSelectedItem(item);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
      document.body.style.overflow = 'auto';
    }, 300); // アニメーション時間（duration-300）と合わせる
  };

  const sortedItems = [...newsItems].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="news" className="py-16 sm:py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 lg:mb-16 gap-4 md:gap-6">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{t.news.title}</h3>
          </div>
          <p className="text-gray-500 text-base sm:text-lg max-w-md">
            {t.news.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sortedItems.map((item, index) => {
            const formattedDate = new Date(item.date).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
                onClick={() => openModal(item)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title[language]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <p className="text-gray-300 text-xs sm:text-sm">No Image</p>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                      {formattedDate}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900 leading-tight mb-3 sm:mb-4 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {item.title[language]}
                  </h3>
                  <div className="mt-auto flex items-center text-rose-600 font-bold text-xs sm:text-sm">
                    {t.news.viewDetails}
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Detail View - Compact Fullscreen View */}
      {selectedItem && (
        <div 
          className={`fixed inset-0 z-[100] bg-white flex flex-col transition-all duration-300 ease-out ${
            isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{ 
            animation: !isClosing ? 'slideUpFade 0.4s ease-out forwards' : 'none' 
          }}
        >
          {/* Top Navigation Bar */}
          <div className="flex-none bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <CalendarDays size={16} className="sm:w-[18px] sm:h-[18px] text-rose-600" />
                <time className="text-xs sm:text-sm font-bold text-gray-900">
                  {new Date(selectedItem.date).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              
              <button
                className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors text-xs sm:text-sm"
                onClick={closeModal}
              >
                <span className="hidden sm:inline">{t.news.backToList}</span>
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            {/* Image Side */}
            {selectedItem.imageUrl && (
              <div className="w-full lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-full flex-none bg-white flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-8">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title[language]}
                  className="relative z-10 max-w-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-sm"
                />
              </div>
            )}
            
            {/* Content Side */}
            <div className={`flex-1 overflow-y-auto p-6 sm:p-8 md:p-12 lg:p-16 ${!selectedItem.imageUrl ? 'lg:max-w-4xl lg:mx-auto' : ''}`}>
              <div className="max-w-2xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                  {selectedItem.title[language]}
                </h3>
                
                <div className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {renderContentWithLinks(selectedItem.content[language])}
                </div>

                <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-100 lg:hidden">
                  <button
                    className="w-full py-3 sm:py-4 bg-gray-900 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base"
                    onClick={closeModal}
                  >
                    {t.news.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;