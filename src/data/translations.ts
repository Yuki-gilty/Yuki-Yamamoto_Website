export type Language = 'ja' | 'en';

export interface Translations {
  header: {
    home: string;
    about: string;
    achievements: string;
    gallery: string;
    news: string;
    sponsors: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    age: string;
    wins: string;
    experience: string;
    viewProfile: string;
    achievements: string;
  };
  about: {
    title: string;
    basicInfo: string;
    name: string;
    birthdate: string;
    birthplace: string;
    affiliation: string;
    selfIntroduction: string;
    intro1: string;
    intro2: string;
    intro3: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  achievements: {
    title: string;
    description: string;
    totalWins: string;
    annualChampions: string;
    worldAwards: string;
  };
  gallery: {
    title: string;
    description: string;
  };
  news: {
    title: string;
    description: string;
    viewDetails: string;
    backToList: string;
    close: string;
  };
  videos: {
    title: string;
    description: string;
  };
  sponsors: {
    title: string;
    description: string;
    note: string;
    inquiry: string;
    uniform: string;
    sticker: string;
    photos: string;
    social: string;
    speaking: string;
    goods: string;
    fpvGoggles: string;
    transmitter: string;
    battery: string;
  };
  social: {
    title: string;
    description: string;
    contact: string;
  };
  footer: {
    menu: string;
    social: string;
    backToTop: string;
  };
}

export const translations: Record<Language, Translations> = {
  ja: {
    header: {
      home: 'Home',
      about: 'About',
      achievements: 'Achievements',
      gallery: 'Gallery',
      news: 'News',
      sponsors: 'Sponsors',
      language: 'Language',
    },
    hero: {
      title: '山本悠貴',
      subtitle: '高校生ドローンレーサー',
      age: '年齢',
      wins: '優勝',
      experience: '年経験',
      viewProfile: 'プロフィールを見る',
      achievements: '実績一覧',
    },
    about: {
      title: 'About',
      basicInfo: '基本情報',
      name: '名前',
      birthdate: '生年月日',
      birthplace: '出身',
      affiliation: '所属',
      selfIntroduction: '自己紹介',
      intro1: '杉並区生まれ杉並区育ち。5年前の体験会でドローンの魅力に出会い、その後本格的に競技へ挑戦。',
      intro2: '現在はドローンレーサーとして国内外で活動。2024年のWorld Drone Racing Championshipでは日本代表として出場し、TEAM JAPANとして世界3位を達成。WTW全国大会では優勝を果たした。',
      intro3: 'また、ドローンを使った空撮にも取り組んでおり、独自の視点で風景や瞬間を映像に収める活動も行っている。',
      badge1: 'WDRC 国別世界3位',
      badge2: '日本代表',
      badge3: 'WTW 全国チャンピオン',
    },
    achievements: {
      title: 'Achievements',
      description: '国内外の大会での主な戦績。2020年から現在に至るまでの成長の軌跡です。',
      totalWins: '総優勝回数',
      annualChampions: '年間チャンピオン',
      worldAwards: '世界大会入賞',
    },
    gallery: {
      title: 'Gallery',
      description: '大会や練習風景の写真',
    },
    news: {
      title: 'News',
      description: '活動報告や最新情報をお届けします',
      viewDetails: '詳細を見る',
      backToList: '一覧に戻る',
      close: '閉じる',
    },
    videos: {
      title: 'Videos',
      description: '大会や練習の動画を公開しています',
    },
    sponsors: {
      title: 'Sponsors',
      description: 'ドローンレース活動をサポートしていただけるスポンサー様を募集しています',
      note: '※ 金額は目安です。詳細は個別にご相談させていただきます。\nお問い合わせは各SNSのダイレクトメッセージ、またはメールにてご連絡ください。',
      inquiry: 'プラン詳細を問い合わせる',
      uniform: 'ユニフォームへのロゴ掲載',
      sticker: 'ロゴステッカー',
      photos: '大会での写真共有',
      social: '公式SNSでのタグ付け',
      speaking: 'イベントでの講演',
      goods: 'コラボグッズ制作',
      fpvGoggles: 'FPVゴーグル',
      transmitter: 'プロポ',
      battery: 'バッテリー',
    },
    social: {
      title: 'Social',
      description: '各SNSでは日々の活動や大会の様子を発信しています',
      contact: 'お問い合わせやコラボレーションのご相談は各SNSよりご連絡ください',
    },
    footer: {
      menu: 'Menu',
      social: 'Social',
      backToTop: 'トップへ戻る',
    },
  },
  en: {
    header: {
      home: 'Home',
      about: 'About',
      achievements: 'Achievements',
      gallery: 'Gallery',
      news: 'News',
      sponsors: 'Sponsors',
      language: 'Language',
    },
    hero: {
      title: 'Yuki Yamamoto',
      subtitle: 'High School Drone Racer',
      age: 'Age',
      wins: 'Wins',
      experience: 'Years Experience',
      viewProfile: 'View Profile',
      achievements: 'Achievements',
    },
    about: {
      title: 'About',
      basicInfo: 'Basic Information',
      name: 'Name',
      birthdate: 'Date of Birth',
      birthplace: 'Birthplace',
      affiliation: 'Affiliation',
      selfIntroduction: 'Self Introduction',
      intro1: 'Born and raised in Suginami, Tokyo. I discovered the appeal of drones at an experience event 5 years ago and have been competing seriously ever since.',
      intro2: 'Currently active as a drone racer both domestically and internationally. In the 2024 World Drone Racing Championship, I represented Japan and achieved 3rd place as TEAM JAPAN. I also won the WTW National Championship.',
      intro3: 'I also work on aerial photography using drones, capturing landscapes and moments from unique perspectives.',
      badge1: 'WDRC Team World 3rd Place',
      badge2: 'Japan Representative',
      badge3: 'WTW National Champion',
    },
    achievements: {
      title: 'Achievements',
      description: 'Main results from domestic and international competitions. The trajectory of growth from 2020 to the present.',
      totalWins: 'Total Wins',
      annualChampions: 'Annual Champions',
      worldAwards: 'World Competition Awards',
    },
    gallery: {
      title: 'Gallery',
      description: 'Photos from competitions and practice sessions',
    },
    news: {
      title: 'News',
      description: 'Activity reports and latest information',
      viewDetails: 'View Details',
      backToList: 'Back to List',
      close: 'Close',
    },
    videos: {
      title: 'Videos',
      description: 'Videos from competitions and practice sessions',
    },
    sponsors: {
      title: 'Sponsor Recruitment',
      description: 'We are looking for sponsors to support our drone racing activities',
      note: '* Amounts are approximate. Details will be discussed individually.\nPlease contact us via direct message on social media or email.',
      inquiry: 'Inquire About Plan Details',
      uniform: 'Logo on Uniform',
      sticker: 'Logo Sticker',
      photos: 'Photo Sharing from Competitions',
      social: 'Tagging on Official SNS',
      speaking: 'Speaking at Events',
      goods: 'Collaboration Goods Production',
      fpvGoggles: 'FPV Goggles',
      transmitter: 'Transmitter',
      battery: 'Battery',
    },
    social: {
      title: 'Social Media',
      description: 'We share daily activities and competition updates on our social media',
      contact: 'For inquiries and collaboration requests, please contact us via our social media',
    },
    footer: {
      menu: 'Menu',
      social: 'Social',
      backToTop: 'Back to Top',
    },
  },
};

