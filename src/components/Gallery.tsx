import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { galleryImages } from '../data/gallery';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const openModal = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedImage(null);
    setIsPortrait(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (selectedImage && imgRef.current) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setIsPortrait(aspectRatio < 1);
      };
      img.src = selectedImage;
    }
  }, [selectedImage]);
  
  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-stripe opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-20 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="h-px w-8 md:w-12 bg-red-600"></div>
              <span className="text-red-600 font-mono text-xs md:text-sm tracking-widest uppercase">Visual Database</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              {t.gallery.title}
            </h3>
          </div>
          <p className="text-slate-500 text-base md:text-lg max-w-sm font-medium border-l-2 border-slate-100 pl-4 md:pl-6">
            {t.gallery.description}
          </p>
        </div>
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative break-inside-avoid bg-white border border-slate-100 p-2 md:p-3 transition-all duration-500 cursor-pointer group hover:border-red-600/50 shadow-sm hover:shadow-xl"
              onClick={() => openModal(image.url)}
            >
              <div className="relative overflow-hidden aspect-auto">
                <img 
                  src={image.url} 
                  alt={image.caption[language]} 
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Image overlay with tech info */}
                <div className="absolute top-1.5 md:top-2 left-1.5 md:left-2 text-[7px] md:text-[8px] font-mono text-white bg-black/50 px-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                  IMG_REF: {index.toString().padStart(3, '0')}
                </div>
              </div>
              
              <div className="mt-2 md:mt-3 flex justify-between items-center">
                <p className="text-slate-400 text-[9px] md:text-[10px] font-mono uppercase tracking-widest truncate pr-3 md:pr-4">
                  {image.caption[language]}
                </p>
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-100 group-hover:bg-red-600 transition-colors"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Refined Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl transition-opacity"></div>
          
          <button 
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-all z-10"
            onClick={closeModal}
          >
            <X size={32} />
          </button>
          
          <div 
            className={`relative max-h-full animate-fade-in tech-border bg-white p-2 shadow-2xl ${
              isPortrait ? 'max-w-md w-auto' : 'max-w-6xl w-full'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <img 
              ref={imgRef}
              src={selectedImage} 
              alt="" 
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            {/* Modal metadata overlay */}
            <div className="absolute -bottom-10 left-0 w-full flex justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <span>Status: Previewing_Full_Resolution</span>
              <span>Source: Internal_Archive</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;