import React from 'react';
import { cn } from '../lib/utils';


import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className, 
  hoverEffect = true,
  variant = 'glass', // 'glass', 'surface', 'flat'
  padding = 'lg',
  ...props 
}) => {
  const variants = {
    glass: 'glass-card',
    surface: 'bg-surface-container-low shadow-ambient border-none',
    flat: 'bg-white border border-outline-variant/30',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hoverEffect ? { y: -4, shadow: 'var(--shadow-ambient)' } : {}}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
