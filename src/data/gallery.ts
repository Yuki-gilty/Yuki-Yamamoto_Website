export type Language = 'ja' | 'en';

export interface GalleryImage {
  url: string;
  caption: {
    ja: string;
    en: string;
  };
}

export const galleryImages: GalleryImage[] = [
  {
    url: '/images/NZW Photo DSC08557 (1).jpeg',
    caption: {
      ja: 'FAI TEAM JAPAN 世界3位',
      en: 'FAI TEAM JAPAN World 3rd Place'
    }
  },
  {
    url: '/images/FAI Riyadh.jpg',
    caption: {
      ja: 'FAI RDWC 2025 10位',
      en: 'FAI RDWC 2025 10th Place'
    }
  },
  {
    url: '/images/F9U 2nd place.jpeg',
    caption: {
      ja: 'F9U 日本選手権　準優勝',
      en: 'F9U Japan Championship 2nd Place'
    }
  },
  {
    url: '/images/WTW CUP 2024.jpeg',
    caption: {
      ja: 'WTWCUP 全国大会　優勝',
      en: 'WTW CUP National Championship Winner'
    }
  },
  {
    url: '/images/WDRC TEAM JAPAN PHOTO.jpg',
    caption: {
      ja: 'TEAM JAPAN メンバーと記念撮影',
      en: 'Photo with TEAM JAPAN Members'
    }
  },
  {
    url: '/images/FAI Korea Photo.jpeg',
    caption: {
      ja: '韓国でのレースにて',
      en: 'At the Race in Korea'
    }
  },
  {
    url: '/images/WDRC with Porkchop.jpeg',
    caption: {
      ja: '仲間とのひとコマ',
      en: 'A Moment with Teammates'
    }
  },
  {
    url: '/images/WDRC with Hajime.jpeg',
    caption: {
      ja: '世界大会でサポーターと一緒に',
      en: 'With Supporter at World Championship'
    }
  }
];