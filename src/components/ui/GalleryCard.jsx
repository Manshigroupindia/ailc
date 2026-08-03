import React from 'react';
import { motion } from 'framer-motion';

export const GalleryCard = ({ item, onClick }) => {
  const { caption, image } = item;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl overflow-hidden shadow-premium group relative cursor-pointer break-inside-avoid mb-6"
      onClick={() => onClick && onClick(item)}
    >
      <img
        src={image}
        alt={caption}
        className="w-full group-hover:scale-105 transition-transform duration-700 object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
        <span className="text-white font-label-md">{caption}</span>
      </div>
    </motion.div>
  );
};
