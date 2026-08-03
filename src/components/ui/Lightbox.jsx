import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Lightbox = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Lightbox Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-10 max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-secondary-fixed transition-colors flex items-center gap-1 font-label-md"
          >
            <X className="w-6 h-6" /> CLOSE
          </button>
          <img
            src={item.image}
            alt={item.caption}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />
          {item.caption && (
            <p className="mt-4 text-white font-headline-sm text-center text-lg">{item.caption}</p>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
