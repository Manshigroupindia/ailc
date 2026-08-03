import React from 'react';
import { motion } from 'framer-motion';

export const NewsCard = ({ news, onClick }) => {
  const { category, title, summary, date, image } = news;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex flex-col md:flex-row gap-8 items-start cursor-pointer group"
      onClick={() => onClick && onClick(news)}
    >
      <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0 shadow-premium">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <span className="font-label-md text-secondary uppercase mb-2 block">{category}</span>
        <h3 className="font-headline-sm text-headline-sm mb-4 leading-tight group-hover:text-secondary transition-colors">
          {title}
        </h3>
        <p className="text-on-surface-variant text-body-md line-clamp-2 mb-4">{summary}</p>
        <span className="font-label-md opacity-60">{date}</span>
      </div>
    </motion.div>
  );
};
