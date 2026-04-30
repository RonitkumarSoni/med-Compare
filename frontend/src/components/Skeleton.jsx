import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = "animate-pulse bg-slate-200 rounded-xl relative overflow-hidden";
  
  const variants = {
    rect: "w-full h-full",
    circle: "rounded-full w-full h-full",
    text: "h-4 w-3/4 rounded-md",
    title: "h-8 w-1/2 rounded-lg",
    avatar: "h-12 w-12 rounded-2xl"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      <div 
        className="absolute inset-0 skeleton-shimmer" 
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
};

export default Skeleton;
