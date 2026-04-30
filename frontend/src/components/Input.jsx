
import React from 'react';
import { cn } from '../lib/utils';



const Input = ({ 
  label, 
  error, 
  className, 
  id, 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-semibold text-on-surface-variant ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          id={id}
          className={cn(
            'w-full bg-surface-container-low px-4 py-3 rounded-lg outline-none transition-all duration-300',
            'placeholder:text-on-surface-variant/40 text-on-surface',
            'border-2 border-transparent focus:border-primary/40 focus:bg-white focus:shadow-ambient',
            error && 'border-error/40 bg-error/5',
            className
          )}
          {...props}
        />
        {/* Subtle hover shadow effect */}
        <div className="absolute inset-0 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
      </div>
      {error && (
        <span className="text-xs text-error font-medium ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
