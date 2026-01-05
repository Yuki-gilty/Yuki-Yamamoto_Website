import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import News from './components/News';
import Sponsors from './components/Sponsors';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminNews from './pages/AdminNews';
import AdminAchievements from './pages/AdminAchievements';

function PublicApp() {
  return (
    <LanguageProvider>
      <div className="font-sans text-gray-900 bg-white">
        <Header />
        <main>
          <Hero />
          <About />
          <Achievements />
          <Gallery />
          <News />
          <Sponsors />
          <SocialLinks />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicApp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/achievements" element={<AdminAchievements />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}