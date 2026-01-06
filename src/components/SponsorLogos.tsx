import React from 'react';

interface Sponsor {
  name: string;
  logo: string;
  url?: string;
}

const sponsors: Sponsor[] = [
  {
    name: 'Team BRIDE',
    logo: '/images/TEAM BRIDE logo web.png',
    url: 'https://bride-jp.com/'
  },
  {
    name: 'NewBeeDrone',
    logo: '/images/NewBeeDrone-logo-web.webp',
    url: 'https://newbeedrone.com/'
  },
  {
    name: 'GEMFAN',
    logo: '/images/gemfanhobby_logo_web.png',
    url: 'https://www.gemfanhobby.com/'
  },
  {
    name: 'HDZERO',
    logo: '/images/HDZero LOGO web.png',
    url: 'https://www.hd-zero.com/'
  },
  {
    name: 'VCI Hobby',
    logo: '/images/VCI_logo_web.webp',
    url: 'https://www.vcihobby.com//'
  }
];
const SponsorLogos: React.FC = () => {
  const mainSponsor = sponsors.find(s => s.name === 'Team BRIDE');
  const otherSponsors = sponsors.filter(s => s.name !== 'Team BRIDE');

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-red-600"></div>
              <span className="text-red-600 font-mono text-xs tracking-widest uppercase">Supporters</span>
              <div className="h-px w-12 bg-red-600"></div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              Supporters
            </h3>
          </div>

          {/* Featured Sponsor: Team BRIDE */}
          {mainSponsor && (
            <div className="mb-12 md:mb-16 flex flex-col items-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-slate-100"></span>
                Affiliated Team
                <span className="w-8 h-px bg-slate-100"></span>
              </div>
              <a
                href={mainSponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-full max-w-xl transition-all duration-500"
              >
                <img
                  src={mainSponsor.logo}
                  alt={mainSponsor.name}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Special Tag for Team BRIDE */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-mono font-bold px-3 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Current_Affiliation
                </div>
              </a>
              <div className="mt-12 md:mt-16 text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-8 h-px bg-slate-100"></span>
                Sponsors
                <span className="w-8 h-px bg-slate-100"></span>
              </div>
            </div>
          )}

          {/* Other Sponsors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-stretch justify-items-center">
            {otherSponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-full h-32 md:h-40 p-4 transition-all duration-500"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className={`w-full h-full object-contain transition-transform duration-500 absolute ${sponsor.name === 'GEMFAN' ? 'top-[33px]' : 'top-[46px]'} ${sponsor.name === 'VCI Hobby' ? 'scale-50 group-hover:scale-[0.55]' : 'group-hover:scale-110'}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorLogos;

