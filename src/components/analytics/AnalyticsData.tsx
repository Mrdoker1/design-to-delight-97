import React from 'react';

interface AnalyticsDataProps {
  percentage?: number;
  userCount?: string;
  title: string;
  description: string;
  isError?: boolean;
}

export const AnalyticsData: React.FC<AnalyticsDataProps> = ({
  percentage,
  userCount,
  title,
  description,
  isError = false
}) => {
  return (
    <div className="my-auto min-w-[180px]">
      <div>
        <div className="text-[#1E2D40] text-base font-bold mb-1">
          {isError ? (
            <>
              {title}
            </>
          ) : (
            <>
              {percentage}% / <span style={{color: 'rgba(30,45,64,1)'}}>{userCount} </span>users
            </>
          )}
        </div>
        <div className={`text-[#6D7783] text-sm font-normal whitespace-pre-line ${isError ? '' : 'leading-[20px]'}`}>
          {description}
        </div>
      </div>
    </div>
  );
};
