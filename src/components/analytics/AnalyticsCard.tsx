import React, { useState } from 'react';
import { AnalyticsIcon } from './AnalyticsIcon';
import { AnalyticsData } from './AnalyticsData';

interface AnalyticsCardProps {
  iconSrc: string;
  percentage?: number;
  userCount?: string;
  title: string;
  description: string;
  variant?: 'good' | 'average' | 'bad' | 'error';
  onClick?: () => void;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  iconSrc,
  percentage,
  userCount,
  title,
  description,
  variant = 'good',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isError = variant === 'error';
  const iconVariant = variant === 'good' ? 'default' : 'contained';

  return (
    <article 
      className="items-center flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Analytics card: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className={`justify-center items-center border border-[color:var(--Stroke-Color,#EFF0F6)] shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] bg-white flex gap-3 px-6 py-4 rounded-[20px] border-solid transition-shadow duration-200 ${isHovered ? 'shadow-[0px_8px_25px_0px_rgba(0,0,0,0.1)]' : ''}`}>
        <AnalyticsIcon 
          src={iconSrc} 
          alt={`${variant} analytics icon`}
          variant={iconVariant}
        />
        <AnalyticsData
          percentage={percentage}
          userCount={userCount}
          title={title}
          description={description}
          isError={isError}
        />
      </div>
      
      {/* Белый треугольник как часть облачка */}
      <svg 
        width="17" 
        height="6" 
        viewBox="0 0 17 6" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}
        style={{ marginTop: '-1px' }}
      >
        <path 
          d="M8.5 6L0 0H17L8.5 6Z" 
          fill="white"
          stroke="#EFF0F6"
          strokeWidth="1"
        />
      </svg>
    </article>
  );
};
