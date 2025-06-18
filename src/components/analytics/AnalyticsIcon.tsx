import React from 'react';

interface AnalyticsIconProps {
  src: string;
  alt: string;
  variant?: 'default' | 'contained';
}

export const AnalyticsIcon: React.FC<AnalyticsIconProps> = ({ 
  src, 
  alt, 
  variant = 'default' 
}) => {
  if (variant === 'contained') {
    return (
      <div className="flex h-[60px] flex-col overflow-hidden items-center justify-center w-[80px] my-auto">
        <img
          src={src}
          alt={alt}
          className="w-[80px] h-[60px] object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-[80px] h-[60px] object-contain shrink-0 my-auto"
    />
  );
};
