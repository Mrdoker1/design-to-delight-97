import React, { useState, useEffect } from 'react';
import { VoiceConfigModal } from './VoiceConfigModal';
import { Voice } from '../../types/voice';

interface Tab {
  id: string;
  label: string;
  active?: boolean;
}

interface NavigationTabsProps {
  onAddVoice: (voiceData: Omit<Voice, 'id'>) => void;
  onEditVoice: (updatedVoice: Voice) => void;
  editingVoice: Voice | null;
  onEditingVoiceChange: (voice: Voice | null) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  onAddVoice, 
  onEditVoice, 
  editingVoice, 
  onEditingVoiceChange 
}) => {
  const [activeTab, setActiveTab] = useState('ai-voices');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditingVoice, setCurrentEditingVoice] = useState<Voice | null>(null);

  const tabs: Tab[] = [
    { id: 'audio-requests', label: 'Audio Requests' },
    { id: 'voice-artists', label: 'Voice Artists' },
    { id: 'ai-voices', label: 'AI Voices', active: true },
  ];

  // Открываем модал когда получаем голос для редактирования
  useEffect(() => {
    if (editingVoice) {
      setCurrentEditingVoice(editingVoice);
      setIsModalOpen(true);
    }
  }, [editingVoice]);

  const handleAddNewVoice = () => {
    setCurrentEditingVoice(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEditingVoice(null);
    onEditingVoiceChange(null); // Сбрасываем editingVoice в родительском компоненте
  };

  const handleSaveVoice = (voiceData: Omit<Voice, 'id'> | Voice) => {
    if (currentEditingVoice) {
      // Режим редактирования
      onEditVoice(voiceData as Voice);
    } else {
      // Режим добавления
      onAddVoice(voiceData as Omit<Voice, 'id'>);
    }
    handleCloseModal();
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
        onSave={handleSaveVoice}
        editingVoice={currentEditingVoice}
      />
    </>
  );
}; 