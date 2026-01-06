import React from 'react';
import { Crown, Award, Medal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

interface PlanFeature {
  included: boolean;
  detail?: string;
}

interface SponsorPlan {
  name: {
    ja: string;
    en: string;
  };
  price: {
    ja: string;
    en: string;
  };
  icon: React.FC<{ className?: string }>;
  color: string;
  features: {
    uniform: PlanFeature;
    sticker: PlanFeature;
    photos: PlanFeature;
    speaking: PlanFeature;
    social: PlanFeature;
    goods: PlanFeature;
  };
}

const plans: SponsorPlan[] = [
  {
    name: {
      ja: 'プラチナ',
      en: 'Platinum'
    },
    price: {
      ja: '100万円',
      en: '¥1,000,000'
    },
    icon: Crown,
    color: 'from-purple-600 to-purple-900',
    features: {
      uniform: { included: true },
      sticker: { included: true, detail: 'FPVゴーグル' },
      photos: { included: true },
      speaking: { included: true },
      social: { included: true },
      goods: { included: true },
    },
  },
  {
    name: {
      ja: 'ゴールド',
      en: 'Gold'
    },
    price: {
      ja: '50万円',
      en: '¥500,000'
    },
    icon: Award,
    color: 'from-yellow-500 to-yellow-700',
    features: {
      uniform: { included: true },
      sticker: { included: true, detail: 'プロポ' },
      photos: { included: true },
      speaking: { included: true },
      social: { included: true },
      goods: { included: false },
    },
  },
  {
    name: {
      ja: 'シルバー',
      en: 'Silver'
    },
    price: {
      ja: '10万円',
      en: '¥100,000'
    },
    icon: Medal,
    color: 'from-gray-400 to-gray-600',
    features: {
      uniform: { included: false },
      sticker: { included: true, detail: 'バッテリー' },
      photos: { included: true },
      speaking: { included: false },
      social: { included: true },
      goods: { included: false },
    },
  },
];

const Sponsors: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const getStickerDetail = (detail: string) => {
    if (detail === 'FPVゴーグル') return t.sponsors.fpvGoggles;
    if (detail === 'プロポ') return t.sponsors.transmitter;
    if (detail === 'バッテリー') return t.sponsors.battery;
    return detail;
  };

  return (
    <section id="sponsors" className="py-12 sm:py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-stripe opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-start">
          <div className="lg:w-1/3 w-full">
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="h-px w-8 md:w-12 bg-red-600"></div>
              <span className="text-red-600 font-mono text-xs md:text-sm tracking-widest uppercase">Supporters</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 md:mb-8 leading-tight uppercase tracking-tighter">
              {t.sponsors.title}
            </h3>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-6 md:mb-10 font-medium">
              {t.sponsors.description}
            </p>
            
            <div className="p-5 md:p-8 bg-slate-50 border-l-2 border-red-600">
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                {t.sponsors.note}
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name[language]}
                className="group bg-white border border-slate-100 p-5 md:p-8 flex flex-col relative transition-all duration-300 hover:border-red-600/50 shadow-sm hover:shadow-xl"
              >
                <div className="absolute top-3 md:top-4 right-3 md:right-4 text-[9px] md:text-[10px] font-mono text-slate-300 uppercase tracking-widest">Plan_Type: {plan.name['en']}</div>
                
                <div className="mb-6 md:mb-8">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-none bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 md:mb-6 shadow-xl`}>
                    <plan.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">{plan.price[language]}</div>
                </div>

                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                  <Feature
                    title={t.sponsors.uniform}
                    included={plan.features.uniform.included}
                  />
                  <Feature
                    title={`${t.sponsors.sticker} (${plan.features.sticker.detail ? getStickerDetail(plan.features.sticker.detail) : ''})`}
                    included={plan.features.sticker.included}
                  />
                  <Feature
                    title={t.sponsors.photos}
                    included={plan.features.photos.included}
                  />
                  <Feature
                    title={t.sponsors.social}
                    included={plan.features.social.included}
                  />
                  <Feature
                    title={t.sponsors.speaking}
                    included={plan.features.speaking.included}
                  />
                  <Feature
                    title={t.sponsors.goods}
                    included={plan.features.goods.included}
                  />
                </div>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc1VSvn4AT8qFeVARlfM3duI1yuqyTgwUR1m4fKtQu3ur5LYw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 md:py-4 bg-slate-900 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-red-600 transition-all text-center relative overflow-hidden"
                >
                  <span className="relative z-10">{t.sponsors.inquiry}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature: React.FC<{ title: string; included: boolean }> = ({
  title,
  included,
}) => (
  <div className="flex items-center group/item">
    <div
      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
        included ? 'bg-red-50 border border-red-200 text-red-600' : 'bg-slate-50 border border-slate-100 text-slate-300'
      }`}
    >
      {included ? (
        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
    <span className={`ml-3 sm:ml-4 text-xs sm:text-sm font-medium transition-colors ${included ? 'text-slate-600 group-hover/item:text-slate-900' : 'text-slate-300 line-through'}`}>
      {title}
    </span>
  </div>
);

export default Sponsors;