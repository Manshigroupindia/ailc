import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonialsData } from '@/data/mockData';

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <div className="flex flex-col justify-center">
      <div className="bg-primary text-white p-8 md:p-12 rounded-3xl relative shadow-2xl overflow-hidden">
        {/* Background Quote Watermark */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Quote className="w-32 h-32 text-white" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            {/* 5 Gold Star Rating */}
            <div className="flex gap-1 mb-8">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-secondary-fixed fill-secondary-fixed" />
              ))}
            </div>

            <p className="font-headline-sm text-headline-sm italic mb-8 text-white/90">
              "{current.quote}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary-fixed flex-shrink-0">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-label-lg text-white font-bold">{current.author}</h4>
                <p className="text-xs opacity-60 text-white/70">{current.title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-4 mt-8 justify-end">
        <button
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Testimonial"
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
