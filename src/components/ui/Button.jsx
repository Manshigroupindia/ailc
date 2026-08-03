import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-button rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-md',
    secondary: 'bg-secondary-fixed text-on-secondary-fixed shadow-lg hover:scale-105 active:scale-95',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    whiteOutline: 'border-2 border-white text-white hover:bg-white hover:text-primary',
    ghost: 'text-primary hover:bg-surface-container',
    secondaryGhost: 'text-secondary hover:underline',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs font-button',
    md: 'px-6 py-2.5 text-button',
    lg: 'px-8 py-4 text-button',
  };

  return (
    <motion.button
      whileHover={{ scale: variant === 'secondary' ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.96 }}
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
    </motion.button>
  );
};
