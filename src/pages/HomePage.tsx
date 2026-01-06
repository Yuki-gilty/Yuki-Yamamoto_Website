import React from 'react';
import Hero from '../components/Hero';
import News from '../components/News';
import Videos from '../components/Videos';
import UpcomingRace from '../components/UpcomingRace';
import SponsorLogos from '../components/SponsorLogos';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      {/* 以前のセクションのダイジェスト版やハイライトをここに置くこともできます */}
      <div className="bg-white">
        <UpcomingRace />
        <News limit={3} isHome={true} />
        <Videos isHome={true} />
        <SponsorLogos />
      </div>
    </>
  );
};

export default HomePage;

