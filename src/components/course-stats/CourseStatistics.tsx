import React, { useState } from 'react';
import { TabNavigation } from './TabNavigation';
import { CourseSection } from './CourseSection';
import { courseData } from '../../data/courseData';
import { elementaryA2Data } from '../../data/elementaryA2Data';
import { intermediateB1Data } from '../../data/intermediateB1Data';

export const CourseStatistics: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [showMoreBeginnerA1, setShowMoreBeginnerA1] = useState(false);
  const [showMoreElementaryA2, setShowMoreElementaryA2] = useState(false);
  const [showMoreIntermediateB1, setShowMoreIntermediateB1] = useState(false);

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

  const handleShowMoreBeginnerA1 = () => {
    setShowMoreBeginnerA1(!showMoreBeginnerA1);
  };

  const handleShowMoreElementaryA2 = () => {
    setShowMoreElementaryA2(!showMoreElementaryA2);
  };

  const handleShowMoreIntermediateB1 = () => {
    setShowMoreIntermediateB1(!showMoreIntermediateB1);
  };

  return (
    <section className="flex flex-col items-end gap-6 w-full border rounded-lg border-solid border-[#DAE1EA]">
      <TabNavigation onExport={handleExport} />
      
      <div 
        className="flex flex-col items-start w-full box-border px-6 py-0 max-md:px-4 max-md:py-0"
        role="tabpanel"
        id="chapter-panel"
        aria-labelledby="chapter-tab"
      >
        {/* Beginner A1 Section */}
        <CourseSection
          title="Beginner A1"
          data={courseData}
          initialItemsCount={3}
          expandedSections={expandedSections}
          onToggle={toggleSection}
          showMore={showMoreBeginnerA1}
          onShowMoreToggle={handleShowMoreBeginnerA1}
          stickyTop={0}
        />

        {/* Elementary A2 Section */}
        <div className="mt-8 w-full">
          <CourseSection
            title="Elementary A2"
            data={elementaryA2Data}
            initialItemsCount={3}
            expandedSections={expandedSections}
            onToggle={toggleSection}
            showMore={showMoreElementaryA2}
            onShowMoreToggle={handleShowMoreElementaryA2}
            stickyTop={0}
          />
        </div>

        {/* Intermediate B1 Section */}
        <div className="mt-8 w-full">
          <CourseSection
            title="Intermediate B1"
            data={intermediateB1Data}
            initialItemsCount={3}
            expandedSections={expandedSections}
            onToggle={toggleSection}
            showMore={showMoreIntermediateB1}
            onShowMoreToggle={handleShowMoreIntermediateB1}
            stickyTop={0}
          />
        </div>
      </div>
    </section>
  );
}; 