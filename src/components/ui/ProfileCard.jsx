import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from './Button';

export const ProfileCard = ({ profile, onKnowMore }) => {
  const { name, designation, location, image } = profile;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-premium p-6 text-center group border border-transparent hover:border-secondary-fixed/20 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-surface-container-high group-hover:border-secondary-fixed transition-colors">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <h4 className="font-headline-sm text-headline-sm text-primary mb-1">{name}</h4>
        <p className="text-secondary font-label-md uppercase tracking-wide mb-4">{designation}</p>
        <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-label-md mb-6">
          <MapPin className="w-4 h-4 text-outline" />
          <span>{location}</span>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-full py-2.5"
        onClick={() => onKnowMore && onKnowMore(profile)}
      >
        KNOW MORE
      </Button>
    </motion.div>
  );
};
