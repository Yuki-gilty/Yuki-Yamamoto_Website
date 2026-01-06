import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AchievementsPage from './pages/AchievementsPage';
import GalleryPage from './pages/GalleryPage';
import NewsPage from './pages/NewsPage';
import SponsorsPage from './pages/SponsorsPage';

const AppContent = () => {
  const location = useLocation();
  
  return (
    <div className="font-sans text-slate-900 bg-white relative flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div key={location.pathname} className="animate-fade-in">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
