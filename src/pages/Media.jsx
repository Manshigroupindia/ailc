import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, X, ChevronLeft } from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

// Default Fallback Image Collection
export const defaultMediaCollection = [
  { id: '1', category: 'Events', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200' },
  { id: '2', category: 'Conferences', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200' },
  { id: '3', category: 'Meetings', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200' },
  { id: '4', category: 'Legal Aid', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200' },
  { id: '5', category: 'Delegations', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200' },
  { id: '6', category: 'State Units', url: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&q=80&w=1200' },
];

export const Media = () => {
  const { mediaList, seo } = useCmsData();

  useEffect(() => {
    document.title = seo?.siteTitle || 'Media Gallery | All India Lawyers Council';
  }, [seo]);

  const activeMediaCollection = mediaList && mediaList.length > 0 ? mediaList : defaultMediaCollection;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const categories = [
    'All',
    'Events',
    'Meetings',
    'Conferences',
    'Legal Aid',
    'Delegations',
    'State Units',
  ];

  const filteredMedia = selectedCategory === 'All'
    ? activeMediaCollection
    : activeMediaCollection.filter((item) => item.category === selectedCategory);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredMedia.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredMedia.length]);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* HERO SECTION */}
      <section className="bg-[#000d25] text-white py-16 md:py-20 relative overflow-hidden border-b border-white/10">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Media</span>
          </nav>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            Media Gallery
          </h1>

          <p className="font-body text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Photographs documenting activities, conferences, fact-finding missions, legal aid initiatives, and meetings of the All India Lawyers Council (AILC).
          </p>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="py-8 border-b border-gray-200 bg-white sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="flex items-center justify-center overflow-x-auto gap-2.5 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex-shrink-0 border ${
                    isActive
                      ? 'bg-[#000d25] text-[#ffe08d] border-[#000d25] shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PURE IMAGE GALLERY GRID */}
      <section className="py-12 md:py-16">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredMedia.map((item, index) => {
              const isLoaded = loadedImages[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-200 border border-gray-200 shadow-sm cursor-pointer"
                >
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                  )}

                  <img
                    src={item.url}
                    alt="AILC Media"
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.id)}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredMedia[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8 select-none"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % filteredMedia.length);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl flex items-center justify-center"
            >
              <img
                src={filteredMedia[lightboxIndex].url}
                alt="AILC Media Fullview"
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Media;
