import React from 'react';
import { TreeNode } from './TreeNode';
import type { CourseNode } from '../../data/courseData';

interface CourseSectionProps {
  title: string;
  data: CourseNode[];
  initialItemsCount: number; // Количество элементов для показа по умолчанию
  expandedSections: Set<string>;
  onToggle: (sectionId: string) => void;
  showMore?: boolean;
  onShowMoreToggle?: () => void;
  stickyTop?: number; // Позиция для sticky заголовка
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  data,
  initialItemsCount,
  expandedSections,
  onToggle,
  showMore = false,
  onShowMoreToggle,
  stickyTop = 0
}) => {
  const visibleChapters = showMore ? data : data.slice(0, initialItemsCount);
  const hasMoreItems = data.length > initialItemsCount;

  return (
    <div className="w-full">
      {/* Заголовок секции */}
      <div 
        className="sticky z-10 bg-white border-b border-[#DAE1EA] flex items-center gap-6 w-full py-4 px-2 max-md:flex-col max-md:gap-2"
        style={{ top: `${stickyTop}px` }}
      >
        <div className="w-[480px] text-[#1E2D40] text-sm font-bold leading-[21px] max-md:w-full">
          {title}
        </div>
        <div className="w-[200px] text-[#1E2D40] text-sm font-bold leading-[21px] max-md:w-full">
          Lessons
        </div>
        <div className="w-[200px] text-[#1E2D40] text-sm font-bold leading-[21px] max-md:w-full">
          Exercises
        </div>
        <div className="w-[200px] text-[#1E2D40] text-sm font-bold leading-[21px] max-md:w-full">
          Completion %
        </div>
      </div>
      
      {/* Содержимое секции */}
      <div className="flex flex-col items-start w-full">
        {visibleChapters.map((chapter) => (
          <TreeNode
            key={chapter.id}
            node={chapter}
            level={0}
            expandedSections={expandedSections}
            onToggle={onToggle}
          />
        ))}
        
        {/* Кнопка Show more для этой секции */}
        {hasMoreItems && onShowMoreToggle && (
          <button 
            onClick={onShowMoreToggle}
            className="text-[#116EEE] text-sm font-bold leading-5 gap-6 w-full shadow-[0px_1px_0px_0px_#D6DEE6_inset,0px_1px_0px_0px_#D6DEE6] bg-white p-2 hover:bg-[#F8F9FA] transition-colors"
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
}; 