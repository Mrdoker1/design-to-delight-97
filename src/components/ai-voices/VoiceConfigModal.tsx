"use client";

import React from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { FormSection, FormField } from '../ui/form-section';
import { SliderInput } from '../ui/slider-input';
import { AdvancedAudioPlayer } from '../ui/advanced-audio-player';
import { Textarea } from '../ui/textarea';
import { Voice, VoiceDNA } from '../../types/voice';
import { useVoicePreview } from '../../hooks/useVoicePreview';
import { useVoiceData } from '../../hooks/useVoiceData';
import { useAccents } from '../../hooks/useAccents';

interface VoiceConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (voiceData: Omit<Voice, 'id'> | Voice) => void;
  editingVoice?: Voice | null;
  className?: string;
}

interface VoiceConfig {
  voiceId: string;
  name: string;
  description: string;
  tags: string;
  language: string;
  gender: string;
  accent: string;
  speed: number;
  stability: number;
  similarity: number;
  styleExaggeration: number;
}

// Кастомный дропдаун компонент для акцентов
const CustomAccentDropdown = ({ 
  value, 
  onChange, 
  className 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  className?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [newAccent, setNewAccent] = React.useState('');
  const [showInput, setShowInput] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const { allAccents, addCustomAccent, removeCustomAccent, isCustomAccent } = useAccents();

  // Закрытие дропдауна при клике вне его
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowInput(false);
        setNewAccent('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (accent: string) => {
    onChange(accent);
    setIsOpen(false);
  };

  const handleAddNew = () => {
    setShowInput(true);
  };

  const handleSaveNew = () => {
    if (addCustomAccent(newAccent)) {
      onChange(newAccent.trim());
      setNewAccent('');
      setShowInput(false);
      setIsOpen(false);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveNew();
    } else if (e.key === 'Escape') {
      setShowInput(false);
      setNewAccent('');
    }
  };

  const handleRemoveCustomAccent = (accentToRemove: string) => {
    removeCustomAccent(accentToRemove);
    // Если удаляемый акцент выбран сейчас, сбрасываем выбор
    if (value === accentToRemove) {
      onChange('');
    }
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <div 
        className="flex h-10 w-full items-center gap-2 self-stretch border relative bg-white p-2 rounded-lg border-solid border-[#D6DEE6] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`flex-[1_0_0] text-[15px] font-normal leading-[22.5px] ${
          value ? 'text-[#252B2F]' : 'text-[#9CAEC7]'
        }`}>
          {value || 'Select Accent'}
        </span>
        <svg 
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-[#D6DEE6] rounded-lg shadow-lg mt-1 overflow-hidden">
          {/* Прокручиваемая область со списком акцентов */}
          <div className="max-h-48 overflow-y-auto">
            {allAccents.map((accent) => {
              const isCustom = isCustomAccent(accent);
              return (
                <div
                  key={accent}
                  className="group px-3 py-2 hover:bg-gray-50 cursor-pointer text-[15px] font-normal leading-[22.5px] text-[#252B2F] flex items-center justify-between"
                  onClick={() => handleSelect(accent)}
                >
                  <span>{accent}</span>
                  {isCustom && (
                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCustomAccent(accent);
                      }}
                      title="Remove accent"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Фиксированная область внизу с разделителем и кнопкой добавления */}
          <div className="border-t border-[#D6DEE6]">
            {showInput ? (
              <div className="p-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAccent}
                    onChange={(e) => setNewAccent(e.target.value)}
                    onKeyDown={handleInputKeyPress}
                    placeholder="Enter new accent"
                    className="flex-1 px-2 py-1 border border-[#D6DEE6] rounded text-[14px] focus:outline-none focus:border-[#116EEE]"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveNew}
                    className="w-7 h-7 bg-[#116EEE] text-white rounded-full hover:bg-[#0F5FD9] flex items-center justify-center"
                    title="Save accent"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-[15px] font-normal leading-[22.5px] text-[#116EEE] flex items-center gap-2"
                onClick={handleAddNew}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add new...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const VoiceConfigModal = React.forwardRef<HTMLDivElement, VoiceConfigModalProps>(
  ({ isOpen, onClose, onSave, editingVoice, className, ...props }, ref) => {
    const isEditMode = !!editingVoice;
    
    const [config, setConfig] = React.useState<VoiceConfig>({
      voiceId: "",
      name: "",
      description: "",
      tags: "",
      language: "",
      gender: "",
      accent: "",
      speed: 40,
      stability: 40,
      similarity: 40,
      styleExaggeration: 40,
    });

    // Audio player state using hook
    const { audioSrc, loadPreview, clearPreview } = useVoicePreview();
    // Voice data loading hook
    const { isLoading, loadVoiceData } = useVoiceData();
    const [statusMessage, setStatusMessage] = React.useState<{
      type: 'success' | 'error' | 'info' | null;
      text: string;
    }>({ type: null, text: '' });

    // Заполняем форму при редактировании
    React.useEffect(() => {
      if (isEditMode && editingVoice) {
        // Определяем ElevenLabs ID: сначала elevenLabsId, потом id (для обратной совместимости)
        const elevenLabsId = editingVoice.elevenLabsId || editingVoice.id;
        
        console.log("Режим редактирования голоса:", editingVoice.name, "ID:", editingVoice.id, "ElevenLabs ID:", elevenLabsId);
        setConfig({
          voiceId: elevenLabsId,
          name: editingVoice.name,
          description: editingVoice.description || '',
          tags: editingVoice.tags.join(', '),
          language: editingVoice.language,
          gender: editingVoice.gender,
          accent: editingVoice.accent,
          speed: editingVoice.voiceDNA.speed,
          stability: editingVoice.voiceDNA.stability,
          similarity: editingVoice.voiceDNA.similarity,
          styleExaggeration: editingVoice.voiceDNA.styleExaggeration,
        });
        // Автоматически загружаем voice preview при редактировании
        console.log("Загружаем voice preview для ElevenLabs ID:", elevenLabsId);
        loadPreview(elevenLabsId);
      } else {
        // Сбрасываем форму при добавлении нового голоса
        setConfig({
          voiceId: "",
          name: "",
          description: "",
          tags: "",
          language: "",
          gender: "",
          accent: "",
          speed: 40,
          stability: 40,
          similarity: 40,
          styleExaggeration: 40,
        });
                  clearPreview();
      }
    }, [isEditMode, editingVoice, isOpen]);

    // Отслеживаем изменения audioSrc
    React.useEffect(() => {
      console.log("audioSrc изменился:", audioSrc);
    }, [audioSrc]);



    const handleInputChange = (field: keyof VoiceConfig, value: string | number) => {
      setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
      setConfig(prev => ({
        ...prev,
        speed: 40,
        stability: 40,
        similarity: 40,
        styleExaggeration: 40,
      }));
    };

    const handleSave = () => {
      // Генерируем languageCode на основе language
      const getLanguageCode = (language: string): string => {
        const codes: Record<string, string> = {
          'English': 'EN',
          'Spanish': 'ES',
          'French': 'FR',
          'German': 'GE',
          'Italian': 'IT'
        };
        return codes[language] || 'EN';
      };

      const voiceData = {
        name: config.name,
        gender: config.gender as 'Male' | 'Female',
        language: config.language,
        languageCode: getLanguageCode(config.language),
        accent: config.accent,
        voiceDNA: {
          speed: config.speed,
          stability: config.stability,
          similarity: config.similarity,
          styleExaggeration: config.styleExaggeration
        },
        tags: config.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        flagIcon: '',
        description: config.description,
      };

      // В режиме редактирования используем текущий ID из editingVoice
      // В режиме добавления используем voiceId или генерируем новый ID
      const finalId = isEditMode && editingVoice ? editingVoice.id : (config.voiceId || Date.now().toString());
      
      console.log('Сохраняем голос с ID:', finalId, 'режим:', isEditMode ? 'редактирование' : 'добавление');
      console.log('config.voiceId:', config.voiceId);
      console.log('editingVoice?.id:', editingVoice?.id);
      
      // Создаем объект голоса с правильным ID и обновляем voiceId в нем для ElevenLabs API
      const savedVoice = { 
        ...voiceData, 
        id: finalId,
        // Дополнительно сохраняем ElevenLabs ID для будущих API вызовов
        elevenLabsId: config.voiceId 
      };
      
      onSave(savedVoice);
    };

    // Проверяем заполнены ли все обязательные поля
    const isFormValid = () => {
      const requiredFields = [
        config.name.trim(),
        config.language,
        config.gender,
        config.accent
      ];

      // В режиме добавления также требуется Voice ID и description
      if (!isEditMode) {
        requiredFields.push(
          config.voiceId.trim(),
          config.description.trim()
        );
      }

      return requiredFields.every(field => field.length > 0);
    };

    // Обновляем подсказку при изменении полей
    React.useEffect(() => {
      if (!isEditMode && config.name && !isFormValid()) {
        setStatusMessage({
          type: 'info',
          text: 'Please fill all fields to save'
        });
      } else {
        // Очищаем подсказку если форма валидна или в режиме редактирования
        if (statusMessage.type === 'info') {
          setStatusMessage({ type: null, text: '' });
        }
      }
    }, [config, isEditMode, statusMessage.type]);

    const handleApplyVoiceId = async () => {
      if (!config.voiceId.trim()) {
        alert("Please enter a Voice ID");
        return;
      }

      setStatusMessage({ type: null, text: '' }); // Очищаем предыдущие сообщения
      
      try {
        const voiceData = await loadVoiceData(config.voiceId);
        
        // Обновляем конфигурацию с полученными данными
        setConfig(prev => ({
          ...prev,
          name: voiceData.name || "",
          description: voiceData.description || "",
          tags: Object.entries(voiceData.labels || {})
            .filter(([_, value]) => value)
            .map(([_, value]) => value)
            .join(", "),
          language: voiceData.labels?.accent?.includes('english') ? 'English' : 
                   voiceData.labels?.accent?.includes('spanish') ? 'Spanish' :
                   voiceData.labels?.accent?.includes('french') ? 'French' :
                   voiceData.labels?.accent?.includes('german') ? 'German' : "",
          gender: voiceData.labels?.gender ? 
                  voiceData.labels.gender.charAt(0).toUpperCase() + voiceData.labels.gender.slice(1) : "",
          accent: voiceData.labels?.accent?.includes('british') ? 'British' :
                  voiceData.labels?.accent?.includes('american') ? 'American' :
                  voiceData.labels?.accent?.includes('australian') ? 'Australian' :
                  voiceData.labels?.accent?.includes('canadian') ? 'Canadian' : ""
        }));

        // Загружаем preview
        loadPreview(config.voiceId);

        // Показываем сообщение об успехе
        setStatusMessage({
          type: 'success',
          text: 'Voice data loaded! Please fill all fields to save'
        });

        console.log("Voice data loaded:", voiceData);
      } catch (error) {
        console.error("Error loading voice data:", error);
        setStatusMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Invalid Voice ID'
        });
      }
    };

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-screen h-screen justify-end items-center gap-2.5 fixed z-[1000] bg-[rgba(0,0,0,0.30)] px-px py-0 left-0 top-0",
          className
        )}
        {...props}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="flex w-[618px] h-full flex-col items-center gap-0 shrink-0 shadow-[0px_8px_12px_0px_rgba(0,0,0,0.10)] relative bg-white max-md:w-[90vw] max-md:max-w-[618px] max-sm:w-[95vw] max-sm:m-5">
          {/* Header */}
          <div className="flex-shrink-0 overflow-hidden text-[#252B2F] text-ellipsis text-3xl font-bold leading-[39px] relative h-20 gap-2.5 self-stretch px-10 py-0 max-md:px-6 max-md:py-0 max-sm:text-2xl max-sm:h-[60px] max-sm:px-4 max-sm:py-0 flex items-center">
                            {isEditMode ? `Edit ${editingVoice?.name} AI Voice` : 'Add new AI voice'}
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 w-full">
            <div className="flex flex-col items-start gap-3 px-10 py-6 max-md:px-6 max-md:py-6 max-sm:gap-4 max-sm:px-4 max-sm:py-4">
              {/* Voice ID Section */}
              <FormSection>
                <FormField label="Voice ID">
                  <div className="flex h-10 items-center gap-2 self-stretch border relative bg-white p-2 rounded-lg border-solid border-[#D6DEE6]">
                    <input
                      type="text"
                      value={config.voiceId}
                      onChange={(e) => handleInputChange("voiceId", e.target.value)}
                      placeholder="Set voice ID from Elevenlabs"
                      disabled={isEditMode}
                      className={`flex-1 text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none ${
                        config.voiceId ? 'text-[#252B2F]' : 'text-[#9CAEC7]'
                      } placeholder:text-[#9CAEC7] ${isEditMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {!isEditMode && (
                      <Button
                        onClick={handleApplyVoiceId}
                        variant="outline"
                        disabled={isLoading || !config.voiceId.trim()}
                        className="flex justify-center items-center h-7 px-6 rounded-3xl border-2 border-solid border-[#116EEE] text-[#116EEE] text-center text-sm font-bold leading-[21px] hover:bg-[#116EEE] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-[#116EEE] border-t-transparent rounded-full animate-spin"></div>
                            Loading...
                          </div>
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    )}
                  </div>
                  {!isEditMode && (
                    <div className="text-[#9CAEC7] text-xs leading-[18px] mt-1">
                      Copy the voice ID from your ElevenLabs account and click Apply to load voice data
                    </div>
                  )}
                </FormField>
              </FormSection>

              {/* Audio Example */}
              <FormSection>
                <AdvancedAudioPlayer 
                  audioSrc={audioSrc}
                  label="Audio Example"
                />
              </FormSection>

              {/* Description and Tags */}
              <FormSection>
                <FormField label="Description">
                  <Textarea
                    value={config.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="self-stretch text-[#252B2F] text-lg font-normal leading-[27px] relative h-[86px] border bg-white p-2 rounded-lg border-solid border-[#D6DEE6] resize-none"
                  />
                </FormField>

                <FormField label="Tags (separated by a comma)">
                  <Textarea
                    value={config.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    className="self-stretch text-[#252B2F] text-lg font-normal leading-[27px] relative h-[86px] border bg-white p-2 rounded-lg border-solid border-[#D6DEE6] resize-none"
                  />
                </FormField>

                {/* Name and Gender Row */}
                <div className="flex h-[66px] items-start gap-6 self-stretch relative max-md:flex-col max-md:h-auto max-md:gap-3 max-sm:gap-4">
                  <FormField label="Name" className="flex-1">
                    <div className="flex h-10 items-center gap-2 self-stretch border relative bg-white p-2 rounded-lg border-solid border-[#D6DEE6]">
                      <input
                        type="text"
                        value={config.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Voice name"
                        className={`flex-1 text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none ${
                          config.name ? 'text-[#252B2F]' : 'text-[#9CAEC7]'
                        } placeholder:text-[#9CAEC7]`}
                      />
                    </div>
                  </FormField>
                  
                  <FormField label="Gender" className="flex-1">
                    <div className="flex h-10 items-center gap-2 self-stretch border relative bg-white p-2 rounded-lg border-solid border-[#D6DEE6]">
                      <select
                        value={config.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className={`flex-[1_0_0] text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none ${
                          config.gender ? 'text-[#252B2F]' : 'text-[#9CAEC7]'
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-binary</option>
                      </select>
                    </div>
                  </FormField>
                </div>

                {/* Language and Accent Row */}
                <div className="flex h-[66px] items-start gap-6 self-stretch relative max-md:flex-col max-md:h-auto max-md:gap-3 max-sm:gap-4">
                  <FormField label="Language" className="flex-1">
                    <div className="flex h-10 items-center gap-2 self-stretch border relative bg-white p-2 rounded-lg border-solid border-[#D6DEE6]">
                      <select
                        value={config.language}
                        onChange={(e) => handleInputChange("language", e.target.value)}
                        className={`flex-[1_0_0] text-[15px] font-normal leading-[22.5px] bg-transparent border-none outline-none ${
                          config.language ? 'text-[#252B2F]' : 'text-[#9CAEC7]'
                        }`}
                      >
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Italian">Italian</option>
                      </select>
                    </div>
                  </FormField>
                  
                  <FormField label="Accent" className="flex-1">
                    <CustomAccentDropdown
                      value={config.accent}
                      onChange={(value) => handleInputChange("accent", value)}
                    />
                  </FormField>
                </div>
              </FormSection>

              {/* Voice DNA Section */}
              <div className="flex flex-col items-start gap-8 self-stretch relative pt-4 pb-6 px-0 max-sm:gap-6 max-sm:pt-3 max-sm:pb-5 max-sm:px-0">
                <div className="flex items-center gap-6 self-stretch relative">
                  <div className="text-[#4B5766] text-sm font-normal leading-[21px] relative">
                    Voice DNA
                  </div>
                  <div className="w-[443px] h-px relative bg-[#DAE1EA] max-md:w-full" />
                </div>

                <div className="flex items-start gap-6 self-stretch flex-col relative max-sm:gap-5">
                  {/* First Row of Sliders */}
                  <div className="flex items-start gap-6 self-stretch relative max-md:flex-col max-md:gap-4 max-sm:gap-5">
                    <SliderInput
                      label="Speed (sp)"
                      value={config.speed}
                      onChange={(value) => handleInputChange("speed", value)}
                      showInfo
                      tooltipContent="Controls the speed of the generated speech. Values below 1.0 will slow down the speech, while values above 1.0 will speed it up. Extreme values may affect the quality of the generated speech."
                    />
                    <SliderInput
                      label="Stability (st)"
                      value={config.stability}
                      onChange={(value) => handleInputChange("stability", value)}
                      showInfo
                      tooltipContent="Increasing stability will make the voice more consistent between re-generations, but it can also make it sounds a bit monotone. On longer text fragments we recommend lowering this value."
                    />
                  </div>

                  {/* Second Row of Sliders */}
                  <div className="flex items-start gap-6 self-stretch relative max-md:flex-col max-md:gap-4 max-sm:gap-5">
                    <SliderInput
                      label="Similarity (si)"
                      value={config.similarity}
                      onChange={(value) => handleInputChange("similarity", value)}
                      showInfo
                      tooltipContent="High enhancement boosts overall voice clarity and target speaker similarity. Very high values can cause artifacts, so adjusting this setting to find the optimal value is encouraged."
                    />
                    <SliderInput
                      label="Style Exaggeration (ex)"
                      value={config.styleExaggeration}
                      onChange={(value) => handleInputChange("styleExaggeration", value)}
                      showInfo
                      tooltipContent="High values are recommended if the style of the speech should be exaggerated compared to the uploaded audio. Higher values can lead to more instability in the generated speech. Setting this to 0.0 will greatly increase generation speed and is the default setting."
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex items-start self-stretch relative">
                  <Button
                    onClick={handleReset}
                    variant="ghost"
                    className="flex justify-center items-center gap-2.5 relative px-0 py-3 rounded-3xl hover:bg-transparent"
                  >
                    <div className="flex justify-center items-center gap-2 relative">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="reset-icon"
                        style={{ width: "20px", height: "20px", position: "relative" }}
                      >
                        <path
                          d="M15.4045 2.48837C15.1836 2.49161 14.973 2.5824 14.8191 2.74079C14.6651 2.89918 14.5803 3.11222 14.5833 3.3331V4.0704C13.315 3.08801 11.7243 2.49976 10 2.49976C5.8676 2.49976 2.5 5.86736 2.5 9.99976C2.5 14.1322 5.8676 17.4998 10 17.4998C14.1324 17.4998 17.5 14.1322 17.5 9.99976C17.5 9.67103 17.4726 9.35903 17.4357 9.06308C17.4241 8.95287 17.3907 8.84608 17.3373 8.74895C17.2839 8.65183 17.2117 8.56632 17.1249 8.49744C17.0381 8.42855 16.9385 8.37767 16.8318 8.34776C16.7251 8.31786 16.6135 8.30954 16.5035 8.32328C16.3935 8.33703 16.2874 8.37257 16.1914 8.42782C16.0953 8.48306 16.0112 8.55692 15.944 8.64505C15.8769 8.73319 15.8279 8.83383 15.8001 8.9411C15.7723 9.04837 15.7662 9.16011 15.7821 9.26978C15.8135 9.52133 15.8333 9.76266 15.8333 9.99976C15.8333 13.2315 13.2318 15.8331 10 15.8331C6.76823 15.8331 4.16667 13.2315 4.16667 9.99976C4.16667 6.768 6.76823 4.16643 10 4.16643C11.0979 4.16643 12.1172 4.47428 12.9907 4.99976H12.9167C12.8062 4.9982 12.6966 5.0186 12.5941 5.05978C12.4917 5.10096 12.3984 5.16209 12.3197 5.23963C12.2411 5.31717 12.1787 5.40956 12.136 5.51144C12.0934 5.61332 12.0715 5.72266 12.0715 5.8331C12.0715 5.94353 12.0934 6.05287 12.136 6.15475C12.1787 6.25663 12.2411 6.34903 12.3197 6.42656C12.3984 6.5041 12.4917 6.56523 12.5941 6.60641C12.6966 6.64759 12.8062 6.66799 12.9167 6.66643H15.2034H15.4167C15.6377 6.66641 15.8496 6.5786 16.0059 6.42233C16.1622 6.26605 16.25 6.0541 16.25 5.8331V3.3331C16.2515 3.22168 16.2307 3.11108 16.1887 3.00785C16.1468 2.90462 16.0845 2.81086 16.0057 2.7321C15.9269 2.65334 15.833 2.5912 15.7298 2.54933C15.6265 2.50747 15.5159 2.48674 15.4045 2.48837Z"
                          fill="#116EEE"
                        />
                      </svg>
                      <div className="text-[#116EEE] text-center text-base font-bold leading-6 underline decoration-solid decoration-auto underline-offset-auto relative">
                        Reset values
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="flex-shrink-0 flex flex-col items-end self-stretch shadow-[0px_-1px_0px_0px_#D6DEE6] relative bg-white px-10 py-4 max-md:px-6 max-md:py-4 max-sm:px-4 max-sm:py-3">
            <div className="flex items-center justify-end w-full max-sm:flex-col max-sm:gap-3">
              {/* Status Message */}
              {statusMessage.type && (
                <div className={`flex items-center gap-1 text-sm mr-auto max-sm:order-first max-sm:self-start max-sm:mr-0 ${
                  statusMessage.type === 'error' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <path d="M8 3.5V8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
                  </svg>
                  <span>{statusMessage.text}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 max-sm:w-full">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex h-12 justify-center items-center gap-2.5 relative px-6 py-3 rounded-3xl border-2 border-solid border-[#DAE1EA] text-[#4B5766] text-center text-base font-bold leading-6 max-sm:w-full"
                >
                  Close
                </Button>
                <Button
                  onClick={handleSave}
                                     disabled={!isFormValid() || isLoading}
                  className="flex h-12 justify-center items-center gap-2.5 relative bg-[#116EEE] px-6 py-3 rounded-[32px] max-sm:w-full hover:bg-[#0F5FD9] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <span className="text-white text-base font-bold leading-6">
                    Save
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VoiceConfigModal.displayName = "VoiceConfigModal"; 