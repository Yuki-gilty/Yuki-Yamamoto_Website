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
    <section id="sponsors" className="py-16 sm:py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-start">
          <div className="lg:w-1/3 w-full">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">{t.sponsors.title}</h3>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 md:mb-10">
              {t.sponsors.description}
            </p>
            
            <div className="p-6 sm:p-8 bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {t.sponsors.note}
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 w-full grid sm:grid-cols-2 gap-4 md:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name[language]}
                className="group bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 md:p-10 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className={`p-3 sm:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${plan.color} text-white shadow-lg`}>
                    <plan.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{plan.name[language]}</div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">{plan.price[language]}</div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-1">
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

                <button className="w-full py-3 md:py-4 bg-gray-900 text-white rounded-xl md:rounded-2xl font-bold hover:bg-rose-600 transition-all hover:shadow-lg text-sm sm:text-base">
                  {t.sponsors.inquiry}
                </button>
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
        included ? 'bg-rose-100 text-rose-600' : 'bg-gray-50 text-gray-200'
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
    <span className={`ml-3 sm:ml-4 text-xs sm:text-sm font-medium transition-colors ${included ? 'text-gray-700 group-hover/item:text-gray-900' : 'text-gray-300 line-through'}`}>
      {title}
    </span>
  </div>
);

export default Sponsors;