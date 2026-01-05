export interface NewsItem {
  id?: number;
  date: string;
  title_ja: string;
  title_en: string;
  content_ja: string;
  content_en: string;
  image_url?: string;
  created_at?: string;
}

export interface Achievement {
  id?: number;
  year: string;
  text_ja: string;
  text_en: string;
  created_at?: string;
}

export interface User {
  id?: number;
  username: string;
  password_hash: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

