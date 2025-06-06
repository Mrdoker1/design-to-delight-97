import React, { useState } from 'react';
import { VoiceConfigModal } from './VoiceConfigModal';

interface Tab {
  id: string;
  label: string;
  active?: boolean;
}

export const NavigationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ai-voices');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs: Tab[] = [
    { id: 'audio-requests', label: 'Audio Requests' },
    { id: 'voice-artists', label: 'Voice Artists' },
    { id: 'ai-voices', label: 'AI Voices', active: true },
  ];

  const handleAddNewVoice = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-start w-full bg-white border-b-2 border-b-[#DAE1EA] border-solid max-md:flex-col max-md:gap-4 max-md:items-stretch">
        <div className="flex items-start gap-8 max-md:justify-start max-md:overflow-x-auto max-sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-base font-bold leading-6 h-16 px-1 py-0 max-sm:text-sm ${
                activeTab === tab.id ? 'text-[#116EEE] border-b-2 border-b-[#116EEE]' : 'text-[#6D7783]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-4 max-md:justify-end">
          <button 
            onClick={handleAddNewVoice}
            className="flex justify-center items-center gap-2.5 bg-[#116EEE] px-6 py-3 rounded-3xl max-sm:px-5 max-sm:py-2.5"
          >
            <span className="text-white text-center text-base font-bold leading-6 gap-2 max-sm:text-sm">
              Add new AI voice
            </span>
          </button>
        </div>
      </nav>
      
      <VoiceConfigModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}; 