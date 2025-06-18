import React, { useState } from 'react';
import { AnalyticsCard } from '../analytics/AnalyticsCard';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getProgressColor = (percent: number) => {
    if (percent === 0) return '#E84E58'; // Red для error
    if (percent >= 90) return '#0EBE75'; // Green для good
    if (percent >= 70) return '#FFCA3A'; // Yellow для average
    return '#E84E58'; // Red для bad (1-69%)
  };

  const getAnalyticsVariant = (percent: number): 'good' | 'average' | 'bad' | 'error' => {
    if (percent === 0) return 'error'; // Только 0% показывает "cannot be counted"
    if (percent >= 90) return 'good';
    if (percent >= 70) return 'average';
    return 'bad'; // Все остальные проценты (1-89%) показывают "Poor Performance"
  };

  const getAnalyticsData = (percent: number) => {
    const variant = getAnalyticsVariant(percent);
    
    const data = {
      good: {
        iconSrc: 'https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/54c49eba1a3dfecb58613eb4cdc2a349271b7091?placeholderIfAbsent=true',
        title: 'Good Performance',
        description: 'Lesson completion rate \nsince last 30 days',
      },
      average: {
        iconSrc: 'https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/1c882cc6a0bb156e9d7173b7e7feaa94adea98af?placeholderIfAbsent=true',
        title: 'Average Performance',
        description: 'Lesson completion rate \nsince last 30 days',
      },
      bad: {
        iconSrc: 'https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/759ac0a2f48ff2497d14bbd95c7328c2b9e88a6d?placeholderIfAbsent=true',
        title: 'Poor Performance',
        description: 'Lesson completion rate \nsince last 30 days',
      },
      error: {
        iconSrc: 'https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/87c8ee719d2018ad84022c6b8078edfb401263f4?placeholderIfAbsent=true',
        title: 'Lesson completion rate \ncannot be counted.',
        description: 'Check if content is published',
      }
    };

    return { ...data[variant], variant };
  };

  const progressColor = getProgressColor(percentage);
  const progressHeight = Math.max((percentage / 100) * 18, 6); // Minimum 6px height
  const analyticsData = getAnalyticsData(percentage);

  return (
    <div className="relative">
      <div 
        className={`w-6 h-6 relative ${className}`} 
        role="progressbar" 
        aria-valuenow={percentage} 
        aria-valuemin={0} 
        aria-valuemax={100}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-4 h-[18px] shrink-0 absolute bg-[#DAE1EA] rounded-[1px] left-1 top-[3px]" />
        <div 
          className="w-4 shrink-0 absolute rounded-[1px] left-1"
          style={{
            backgroundColor: progressColor,
            height: `${progressHeight}px`,
            top: `${21 - progressHeight}px`
          }}
        />
      </div>

      {/* Analytics Card Tooltip */}
      {isHovered && (
        <div className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 min-w-[280px]">
          <AnalyticsCard
            iconSrc={analyticsData.iconSrc}
            percentage={analyticsData.variant !== 'error' ? percentage : undefined}
            userCount={analyticsData.variant !== 'error' ? '188k' : undefined}
            title={analyticsData.title}
            description={analyticsData.description}
            variant={analyticsData.variant}
          />
        </div>
      )}
    </div>
  );
};