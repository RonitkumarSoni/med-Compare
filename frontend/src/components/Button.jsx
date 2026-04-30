import React from 'react';
import { cn } from '../lib/utils';


import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) => {
  const variants = {
    primary: 'btn-gradient',
    secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 shadow-sm',
    outline: 'bg-transparent border border-outline-variant hover:bg-surface-container-low text-on-surface',
    ghost: 'bg-transparent hover:bg-surface-container-low text-primary',
    tonal: 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest shadow-sm',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
    icon: 'p-2 rounded-full',
  };

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
