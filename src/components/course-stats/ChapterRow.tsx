import React from 'react';
import { ProgressBar } from './ProgressBar';

interface ChapterRowProps {
  title: string;
  lessons: number;
  exercises: number;
  completion: number;
  isExpanded?: boolean;
  hasChildren?: boolean;
  children?: React.ReactNode;
  level?: number;
  onToggle?: () => void;
}

export const ChapterRow: React.FC<ChapterRowProps> = ({
  title,
  lessons,
  exercises,
  completion,
  isExpanded = false,
  hasChildren = false,
  children,
  level = 0,
  onToggle
}) => {
  const toggleExpanded = () => {
    if (hasChildren && onToggle) {
      onToggle();
    }
  };

  const titlePaddingLeft = level * 24;

  return (
    <>
      <div 
        className={`group flex items-center gap-6 w-full p-2 max-md:flex-col max-md:gap-2 max-md:items-start transition-colors hover:bg-[#F8F9FA] ${hasChildren ? 'cursor-pointer' : 'cursor-default'} ${
          (isExpanded && hasChildren) ? 'bg-[#EBEFF5]' : level > 0 ? 'bg-white' : 'shadow-[0px_1px_0px_0px_#D6DEE6_inset] bg-white'
        }`}
        onClick={hasChildren ? toggleExpanded : undefined}
      >
        <div className="w-[480px] shrink-0 max-md:w-full">
          <div 
            className="flex items-center gap-2.5"
            style={{ paddingLeft: `${titlePaddingLeft}px` }}
          >
            <span className={`text-[#1E2D40] text-base leading-6 ${level === 0 ? 'font-normal' : 'font-bold'}`}>
              {title}
            </span>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 shrink-0 fill-[#116EEE] opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="External link"
            >
              <path d="M9.45825 0.0830078C9.11307 0.0830078 8.83325 0.36283 8.83325 0.708008C8.83325 1.05319 9.11307 1.33301 9.45825 1.33301H13.7827L7.34964 7.76607C7.10557 8.01014 7.10557 8.40587 7.34964 8.64995C7.59372 8.89403 7.98945 8.89403 8.23353 8.64995L14.6666 2.21689V6.54134C14.6666 6.88652 14.9464 7.16634 15.2916 7.16634C15.6368 7.16634 15.9166 6.88652 15.9166 6.54134V0.708008C15.9166 0.548056 15.8556 0.388105 15.7335 0.266066C15.6736 0.206143 15.6045 0.160932 15.5308 0.130432C15.4571 0.0998738 15.3763 0.0830078 15.2916 0.0830078H9.45825Z" fill="#116EEE"/>
              <path d="M3.20825 2.58301C2.1726 2.58301 1.33325 3.42235 1.33325 4.45801V12.7913C1.33325 13.827 2.1726 14.6663 3.20825 14.6663H11.5416C12.5772 14.6663 13.4166 13.827 13.4166 12.7913V8.62467C13.4166 8.2795 13.6964 7.99967 14.0416 7.99967C14.3868 7.99967 14.6666 8.2795 14.6666 8.62467V12.7913C14.6666 14.5174 13.2676 15.9163 11.5416 15.9163H3.20825C1.48224 15.9163 0.083252 14.5174 0.083252 12.7913V4.45801C0.083252 2.732 1.48224 1.33301 3.20825 1.33301H7.37492C7.7201 1.33301 7.99992 1.61283 7.99992 1.95801C7.99992 2.30319 7.7201 2.58301 7.37492 2.58301H3.20825Z" fill="#116EEE"/>
            </svg>
          </div>
        </div>
        <div className="text-[#1E2D40] text-base font-bold leading-6 w-[200px] max-md:w-full">
          {level >= 3 ? '' : lessons}
        </div>
        <div className="text-[#1E2D40] text-base font-bold leading-6 w-[200px] max-md:w-full">
          {level >= 3 ? '' : exercises}
        </div>
        <div className="flex items-center gap-2 flex-[1_0_0] max-md:w-full">
          {level < 3 && (
            <>
              <ProgressBar percentage={completion} />
              <div className="text-[#1E2D40] text-base font-bold leading-6">
                {completion}%
              </div>
            </>
          )}
        </div>
        {hasChildren && (
          <div
            className="w-3.5 h-3.5 relative pointer-events-none"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title}`}
          >
            <svg 
              width="14" 
              height="8" 
              viewBox="0 0 14 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 h-2 flex-shrink-0 ${isExpanded ? 'fill-[#083572]' : 'fill-[#9CAEC7]'} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M1.16466 0.432633C1.52386 0.109356 2.07711 0.138475 2.40039 0.497671L7.00001 5.60836L11.5996 0.497674C11.9229 0.138477 12.4762 0.109359 12.8354 0.432636C13.1946 0.755913 13.2237 1.30917 12.9004 1.66836L7.65039 7.5017C7.48445 7.68607 7.24806 7.79135 7.00001 7.79135C6.75196 7.79135 6.51556 7.68607 6.34963 7.5017L1.09963 1.66836C0.776349 1.30916 0.805467 0.75591 1.16466 0.432633Z" fill="currentColor"/>
            </svg>
          </div>
        )}
      </div>
      {isExpanded && children && (
        <div className="flex flex-col items-start w-full">
          {children}
        </div>
      )}
    </>
  );
}; 