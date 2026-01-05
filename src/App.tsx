import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Gallery from './components/Gallery';
import News from './components/News';
import Sponsors from './components/Sponsors';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';

export default function App() {
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