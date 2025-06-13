import React, { useState } from 'react';

interface TabNavigationProps {
  onExport: () => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ onExport }) => {
  const [activeTab, setActiveTab] = useState('chapter');

  return (
    <div className="flex justify-between items-center w-full box-border px-8 py-0 border-b-[#DAE1EA] border-b border-solid max-md:flex-col max-md:gap-4 max-md:items-start max-md:px-4 max-md:py-0">
      <div className="flex items-center gap-8 max-md:w-full" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'chapter'}
          aria-controls="chapter-panel"
          className={`text-lg leading-[27px] gap-2.5 px-0 py-6 border-b-2 border-solid ${
            activeTab === 'chapter'
              ? 'text-[#1E2D40] font-bold border-b-[#116EEE]'
              : 'text-[#1E2D40] font-normal border-b-transparent'
          }`}
          onClick={() => setActiveTab('chapter')}
        >
          Chapter overview
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'course'}
          aria-controls="course-panel"
          className={`text-lg leading-[27px] gap-2.5 px-0 py-6 border-b-2 border-solid ${
            activeTab === 'course'
              ? 'text-[#1E2D40] font-bold border-b-[#116EEE]'
              : 'text-[#1E2D40] font-normal border-b-transparent'
          }`}
          onClick={() => setActiveTab('course')}
        >
          Course overview
        </button>
      </div>
      <button
        className="text-white text-center text-base font-bold leading-6 gap-2.5 bg-[#116EEE] px-6 py-3 rounded-3xl hover:bg-[#0E5ACC] transition-colors"
        onClick={onExport}
        aria-label="Export course statistics to Excel"
      >
        Export to Excel
      </button>
    </div>
  );
}; 