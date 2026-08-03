import React, { useState } from 'react';
import { galleryData } from '@/data/mockData';
import { GalleryCard } from '../ui/GalleryCard';
import { Lightbox } from '../ui/Lightbox';

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-xl bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary text-center mb-16">
          Moments of Excellence
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryData.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={(imgItem) => setSelectedImage(imgItem)}
            />
          ))}
        </div>
      </div>

      <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
};
