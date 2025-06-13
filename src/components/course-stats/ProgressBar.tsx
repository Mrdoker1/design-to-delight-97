import React from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className = '' }) => {
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return '#0EBE75'; // Green
    if (percent >= 50) return '#FFCA3A'; // Yellow
    return '#E84E58'; // Red
  };

  const progressColor = getProgressColor(percentage);
  const progressHeight = Math.max((percentage / 100) * 18, 6); // Minimum 6px height

  return (
    <div className={`w-6 h-6 relative ${className}`} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
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
  );
};