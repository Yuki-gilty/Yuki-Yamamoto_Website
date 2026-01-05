import React, { useState } from 'react';
import { X } from 'lucide-react';
import { galleryImages } from '../data/gallery';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const openModal = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{t.gallery.title}</h3>
          <p className="text-gray-500 mt-4 md:mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            {t.gallery.description}
          </p>
        </div>
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative break-inside-avoid rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-gray-100"
              onClick={() => openModal(image.url)}
            >
              <img 
                src={image.url} 
                alt={image.caption[language]} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                <p className="text-white text-xs sm:text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {image.caption[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Refined Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-10"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md transition-opacity"></div>
          
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/60 hover:text-white p-2 sm:p-3 rounded-full hover:bg-white/10 transition-all z-10"
            onClick={closeModal}
          >
            <X size={24} className="sm:w-8 sm:h-8" />
          </button>
          
          <div 
            className="relative max-w-6xl max-h-full animate-fade-in w-full"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="" 
              className="w-full h-auto max-h-[90vh] sm:max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;