import React, { useState } from 'react';
import { TabNavigation } from './TabNavigation';
import { ChapterRow } from './ChapterRow';

export const CourseStatistics: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

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
          <ChapterRow
            title="1 - Introductions"
            lessons={7}
            exercises={62}
            completion={72}
            hasChildren={false}
          />
          
          <ChapterRow
            title="2 - Greetings"
            lessons={6}
            exercises={41}
            completion={12}
            hasChildren={true}
            isExpanded={expandedSections.has('2-greetings')}
            onToggle={() => toggleSection('2-greetings')}
          >
            <div className="flex flex-col items-start w-full border-b-2 border-b-[#D6DEE6] border-solid">
              <ChapterRow
                title="1 Saying how you are"
                lessons={1}
                exercises={7}
                completion={13}
                level={1}
              />
              <ChapterRow
                title="2 Referring to a person"
                lessons={6}
                exercises={5}
                completion={13}
                level={1}
              />
                             <ChapterRow
                 title="3 Asking how somebody is"
                 lessons={6}
                 exercises={6}
                 completion={45}
                 level={1}
                 hasChildren={true}
                 isExpanded={expandedSections.has('3-asking-how-somebody-is')}
                 hasExternalLink={true}
                 onToggle={() => toggleSection('3-asking-how-somebody-is')}
               >
                <div className="flex w-full flex-col items-start gap-2 border-b-[3px] border-b-[#D6DEE6] border-solid">
                                     <ChapterRow
                     title="Vocabulary"
                     lessons={1}
                     exercises={6}
                     completion={13}
                     level={2}
                     hasChildren={true}
                     isExpanded={expandedSections.has('vocabulary')}
                     onToggle={() => toggleSection('vocabulary')}
                   >
                    <ChapterRow
                      title="1 Flashcard"
                      lessons={0}
                      exercises={0}
                      completion={0}
                      level={3}
                    />
                    <ChapterRow
                      title="2 Fillgap"
                      lessons={0}
                      exercises={0}
                      completion={0}
                      level={3}
                    />
                    <ChapterRow
                      title="Phrase builder Audio"
                      lessons={0}
                      exercises={0}
                      completion={0}
                      level={3}
                    />
                    <ChapterRow
                      title="3 Flashcard"
                      lessons={0}
                      exercises={0}
                      completion={0}
                      level={3}
                    />
                    <ChapterRow
                      title="4 True or False Image & Audio"
                      lessons={0}
                      exercises={0}
                      completion={0}
                      level={3}
                    />
                    <ChapterRow
                      title="5 Fillgap"
                      lessons={0}
                      exercises={0}
                      completion={0}
                      level={3}
                    />
                    <ChapterRow
                      title="6 Matchup"
                      lessons={0}
                      exercises={0}
                      completion={0}
                      level={3}
                    />
                  </ChapterRow>
                </div>
              </ChapterRow>
              <ChapterRow
                title="4 Speaking - Speaking about yourself"
                lessons={1}
                exercises={9}
                completion={56}
                level={1}
              />
              <ChapterRow
                title="5 Developing fluency"
                lessons={1}
                exercises={6}
                completion={72}
                level={1}
              />
              <ChapterRow
                title="Checkpoint # 1"
                lessons={1}
                exercises={8}
                completion={93}
                level={1}
              />
            </div>
          </ChapterRow>
          
          <ChapterRow
            title="3 - All about me"
            lessons={11}
            exercises={57}
            completion={54}
            hasChildren={false}
          />
          
          <ChapterRow
            title="4 - People and things"
            lessons={7}
            exercises={68}
            completion={12}
            hasChildren={false}
          />
          
          <ChapterRow
            title="5 - Languages"
            lessons={9}
            exercises={45}
            completion={92}
            hasChildren={false}
          />
          
          <button className="text-[#116EEE] text-base font-bold leading-6 gap-6 w-full shadow-[0px_1px_0px_0px_#D6DEE6_inset,0px_1px_0px_0px_#D6DEE6] bg-white p-2 hover:bg-[#F8F9FA] transition-colors">
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}; 