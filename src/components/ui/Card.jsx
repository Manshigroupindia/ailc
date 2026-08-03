import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export const Card = ({
  children,
  className = '',
  glass = false,
  hoverEffect = true,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6 } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        'rounded-xl shadow-premium p-8 transition-all',
        glass ? 'glass-effect border border-white/20' : 'bg-white border border-transparent',
        hoverEffect && 'hover:shadow-xl hover:border-secondary-fixed/30',
        onClick && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
