import React, { useState } from 'react';
import { TabNavigation } from './TabNavigation';
import { TreeNode } from './TreeNode';
import { courseData, additionalChapters } from '../../data/courseData';

export const CourseStatistics: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [showMoreChapters, setShowMoreChapters] = useState(false);

  const handleExport = () => {
    console.log('Exporting to Excel...');
    // Implementation for Excel export would go here
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleShowMore = () => {
    setShowMoreChapters(!showMoreChapters);
  };

  const allChapters = showMoreChapters 
    ? [...courseData, ...additionalChapters] 
    : courseData;

  return (
    <section className="flex flex-col items-end gap-6 w-full border rounded-lg border-solid border-[#DAE1EA]">
      <TabNavigation onExport={handleExport} />
      
      <div 
        className="flex flex-col items-start gap-2 w-full box-border px-6 py-0 max-md:px-4 max-md:py-0"
        role="tabpanel"
        id="chapter-panel"
        aria-labelledby="chapter-tab"
      >
        <div className="flex items-start gap-6 w-full p-2 max-md:flex-col max-md:gap-2">
          <div className="w-[480px] text-[#1E2D40] text-sm font-bold leading-[21px] max-md:w-full">
            Beginner A1
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
        
        <div className="flex flex-col items-start w-full">
          {allChapters.map((chapter) => (
            <TreeNode
              key={chapter.id}
              node={chapter}
              level={0}
              expandedSections={expandedSections}
              onToggle={toggleSection}
            />
          ))}
          
          <button 
            onClick={handleShowMore}
            className="text-[#116EEE] text-base font-bold leading-6 gap-6 w-full shadow-[0px_1px_0px_0px_#D6DEE6_inset,0px_1px_0px_0px_#D6DEE6] bg-white p-2 hover:bg-[#F8F9FA] transition-colors"
          >
            {showMoreChapters ? 'Show less' : 'Show more'}
          </button>
        </div>
      </div>
    </section>
  );
}; 