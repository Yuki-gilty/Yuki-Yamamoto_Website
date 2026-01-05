// Local storage utilities for managing news and achievements

export interface NewsItem {
  id?: string;
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

export interface Achievement {
  id?: string;
  year: string;
  text_ja: string;
  text_en: string;
}

const STORAGE_KEYS = {
  NEWS: 'admin_news_items',
  ACHIEVEMENTS: 'admin_achievements',
} as const;

// News storage functions
export const getStoredNews = (): NewsItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveStoredNews = (news: NewsItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  } catch (error) {
    console.error('Failed to save news to localStorage:', error);
  }
};

export const addNewsItem = (item: Omit<NewsItem, 'id'>): NewsItem => {
  const existing = getStoredNews();
  const newItem: NewsItem = {
    ...item,
    id: `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  const updated = [newItem, ...existing];
  saveStoredNews(updated);
  return newItem;
};

export const updateNewsItem = (id: string, updates: Partial<NewsItem>): boolean => {
  const existing = getStoredNews();
  const index = existing.findIndex((item) => item.id === id);
  if (index === -1) return false;
  
  existing[index] = { ...existing[index], ...updates };
  saveStoredNews(existing);
  return true;
};

export const deleteNewsItem = (id: string): boolean => {
  const existing = getStoredNews();
  const filtered = existing.filter((item) => item.id !== id);
  if (filtered.length === existing.length) return false;
  
  saveStoredNews(filtered);
  return true;
};

// Achievements storage functions
export const getStoredAchievements = (): Achievement[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveStoredAchievements = (achievements: Achievement[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  } catch (error) {
    console.error('Failed to save achievements to localStorage:', error);
  }
};

export const addAchievement = (achievement: Omit<Achievement, 'id'>): Achievement => {
  const existing = getStoredAchievements();
  const newAchievement: Achievement = {
    ...achievement,
    id: `achievement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  const updated = [...existing, newAchievement];
  saveStoredAchievements(updated);
  return newAchievement;
};

export const updateAchievement = (id: string, updates: Partial<Achievement>): boolean => {
  const existing = getStoredAchievements();
  const index = existing.findIndex((item) => item.id === id);
  if (index === -1) return false;
  
  existing[index] = { ...existing[index], ...updates };
  saveStoredAchievements(existing);
  return true;
};

export const deleteAchievement = (id: string): boolean => {
  const existing = getStoredAchievements();
  const filtered = existing.filter((item) => item.id !== id);
  if (filtered.length === existing.length) return false;
  
  saveStoredAchievements(filtered);
  return true;
};

