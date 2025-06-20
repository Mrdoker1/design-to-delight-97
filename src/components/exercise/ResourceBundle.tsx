import React, { useState, useRef, useEffect } from "react";
import { AdvancedAudioPlayer } from "@/components/ui/advanced-audio-player";
import { useLocalStorageVoices } from "../../hooks/useLocalStorageVoices";

interface Voice {
  id: string;
  name: string;
  accent: string;
  gender: string;
  style?: string;
  preview_url?: string;
  category?: string;
  description?: string;
  labels?: {
    accent?: string;
    gender?: string;
    age?: string;
    [key: string]: string | undefined;
  };
}

interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

interface ElevenLabsRequestBody {
  text: string;
  model_id: string;
  voice_settings: VoiceSettings;
  text_type?: 'ssml' | 'text';
}

interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
  description: string;
  preview_url: string;
  labels: {
    accent?: string;
    gender?: string;
    age?: string;
    style?: string;
    [key: string]: string | undefined;
  };
}

interface ElevenLabsResponse {
  voices: ElevenLabsVoice[];
}

const ResourceBundle: React.FC = () => {
  const [alternativeValue, setAlternativeValue] = useState("");
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [flashcardText, setFlashcardText] = useState("Hello!");
  const [audioGenStatus, setAudioGenStatus] = useState<string>("");
  const [voiceSearchQuery, setVoiceSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  // Используем голоса из localStorage вместо ElevenLabs API
  const { voices: availableVoices, isLoading: isLoadingVoices, error: voiceLoadError, refreshVoices } = useLocalStorageVoices();
  const flashcardInputRef = useRef<HTMLInputElement>(null);
  const audioMenuRef = useRef<HTMLDivElement>(null);
  const [expandedVoices, setExpandedVoices] = useState<Set<string>>(new Set());
  const [currentPlayingPreview, setCurrentPlayingPreview] = useState<HTMLAudioElement | null>(null);





  useEffect(() => {
    if (audioSrc) {
      setShowAudioMenu(false);
    }
  }, [audioSrc]);

  const handleFlashcardTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlashcardText(e.target.value);
  };

  const handleAlternativeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlternativeValue(e.target.value);
  };

  const handleAddAlternativeValue = () => {
    if (alternativeValue.trim()) {
      // Add the value to the list of alternative values
      setAlternativeValue("");
    }
  };

  const handleRemoveAudio = () => {
    setAudioSrc(null);
    setShowAudioMenu(false);
  };

  const updateFlashcardTextBeforeGenerate = () => {
    // Update text from the input before generation
    if (flashcardInputRef.current) {
      setFlashcardText(flashcardInputRef.current.value);
    }
  };

  // Format text with SSML for educational context
  const formatTextWithSSML = (text: string): string => {
    // Use SSML for control pronunciation with pauses for clearer perception
    return `<speak>
      <prosody rate="1.0">
        <break time="0.5s" />
        ${text}
        <break time="0.5s" />
      </prosody>
    </speak>`;
  };

  // Get voice settings based on selected voice's VoiceDNA or use defaults
  const getVoiceSettings = (voiceId?: string): VoiceSettings => {
    // Ищем голос в localStorage чтобы получить его VoiceDNA настройки
    if (voiceId) {
      try {
        const savedVoices = localStorage.getItem('ai-voices');
        if (savedVoices) {
          const voices = JSON.parse(savedVoices);
          const selectedVoice = voices.find((v: { elevenLabsId?: string; id: string; voiceDNA?: object | string }) => v.elevenLabsId === voiceId || v.id === voiceId);
          
          if (selectedVoice && selectedVoice.voiceDNA) {
            const dna = selectedVoice.voiceDNA;
            // Конвертируем VoiceDNA (0-100) в настройки ElevenLabs (0-1)
            return {
              stability: typeof dna === 'object' ? (dna.stability || 40) / 100 : 0.75,
              similarity_boost: typeof dna === 'object' ? (dna.similarity || 40) / 100 : 0.75,
              style: typeof dna === 'object' ? (dna.styleExaggeration || 40) / 100 : 0.2,
              use_speaker_boost: true
            };
          }
        }
      } catch (error) {
        console.warn('Error loading voice settings from localStorage:', error);
      }
    }
    
    // Default settings for educational context: clearer pronunciation
    return {
      stability: 0.75, // Reduced stability for more natural variations
      similarity_boost: 0.75, // Increased for more natural voice
      style: 0.2, // Added some style variation
      use_speaker_boost: true // Improved voice quality
    };
  };

  const selectVoiceAndGenerate = (voiceId: string) => {
    setSelectedVoice("");  // Reset selection after use, so as not to remain highlighted
    setShowVoiceSelector(false);
    setShowAudioMenu(false);
    handleGenerateAudio(voiceId);
  };
  
  // Add handler for closing dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (audioMenuRef.current && !audioMenuRef.current.contains(event.target as Node)) {
        setShowAudioMenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleRequestAudio = () => {
    setShowAudioMenu(false);
    // Here will be the functionality to request audio from the user
    alert("Audio request functionality is not available in the prototype");
  };

  const handleGenerateAudio = async (voiceId?: string) => {
    try {
      setIsGeneratingAudio(true);
      setAudioGenStatus("Generating audio...");
      
      // Guaranteed to get the freshest text from the input
      updateFlashcardTextBeforeGenerate();
      
      // Text for voice generation
      const rawText = flashcardText.trim() || "Hello!";
      
      // Format text with SSML for educational context
      const textToGenerate = formatTextWithSSML(rawText);
      
      // Используем API ключ из переменных окружения
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

      console.log("API Key:", apiKey);
      
      // Use passed voice ID, if not passed - check that voice is selected
      if (!voiceId && !selectedVoice) {
        alert("Please select a voice before generating audio");
        setIsGeneratingAudio(false);
        return;
      }
      
      const finalVoiceId = voiceId || selectedVoice;

      // Get voice settings for selected voice (using VoiceDNA if available)
      const voiceSettings = getVoiceSettings(finalVoiceId);

      console.log(`Generating audio for text: "${rawText}" with voice ID: ${finalVoiceId}`);
      console.log(`Using educational pronunciation with SSML`);
      
      try {
        const modelId = 'eleven_multilingual_v2'; // Use multilingual model for better pronunciation
        
        const requestBody: ElevenLabsRequestBody = {
          text: textToGenerate,
          model_id: modelId,
          voice_settings: voiceSettings,
          text_type: 'ssml' // Always use SSML
        };
        
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${finalVoiceId}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey
          },
          body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
          throw new Error(`Audio generation error: ${response.status} ${response.statusText}`);
        }
        
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioSrc(audioUrl);
        setAudioGenStatus("Audio successfully generated");
        setShowAudioMenu(false);
        
        console.log(`Audio successfully generated for text: "${rawText}"`);
      } catch (error) {
        console.error("Error requesting ElevenLabs API:", error);
        setAudioGenStatus("Audio generation error");
        throw error;
      }
      
    } catch (error) {
      console.error("Audio generation error:", error);
      alert("Failed to generate audio. Please try again.");
    } finally {
      setIsGeneratingAudio(false);
      setShowVoiceSelector(false);
      setShowAudioMenu(false);
    }
  };

  // Форматирование времени в формат 0:00


  // Обновляем функцию фильтрации голосов
  const filteredVoices = availableVoices.filter(voice => {
    const matchesSearch = voiceSearchQuery === '' || 
      voice.name.toLowerCase().includes(voiceSearchQuery.toLowerCase()) ||
      voice.accent.toLowerCase().includes(voiceSearchQuery.toLowerCase()) ||
      voice.gender.toLowerCase().includes(voiceSearchQuery.toLowerCase()) ||
      (voice.description && voice.description.toLowerCase().includes(voiceSearchQuery.toLowerCase())) ||
      (voice.labels && Object.values(voice.labels).some(label => 
        label && label.toLowerCase().includes(voiceSearchQuery.toLowerCase())
      ));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => {
        if (tag === 'all') return true;
        
        // Ищем тег во всех полях голоса (как в поисковой строке)
        return voice.name.toLowerCase().includes(tag.toLowerCase()) ||
               voice.accent.toLowerCase().includes(tag.toLowerCase()) ||
               voice.gender.toLowerCase().includes(tag.toLowerCase()) ||
               (voice.description && voice.description.toLowerCase().includes(tag.toLowerCase())) ||
               (voice.labels && Object.values(voice.labels).some(label => 
                 label && label.toLowerCase().includes(tag.toLowerCase())
               ));
      });
    
    return matchesSearch && matchesTags;
  });

  // Извлекаем все уникальные теги из голосов, загруженных из localStorage
  const getUniqueTags = (): string[] => {
    const allUniqueTags = new Set<string>();
    
    // Всегда добавляем 'all' первым
    allUniqueTags.add('all');
    
    // Собираем все теги из голосов
    availableVoices.forEach(voice => {
      // Добавляем основные характеристики
      allUniqueTags.add(voice.accent);
      allUniqueTags.add(voice.gender);
      
      // Добавляем пользовательские теги из labels
      Object.entries(voice.labels || {}).forEach(([key, value]) => {
        if (key.startsWith('tag_') && Boolean(value)) {
          allUniqueTags.add(value);
        }
      });
    });
    
    // Конвертируем в массив и сортируем (кроме 'all' который остается первым)
    const sortedTags = Array.from(allUniqueTags);
    const all = sortedTags.filter(tag => tag === 'all');
    const otherTags = sortedTags.filter(tag => tag !== 'all').sort();
    
    return [...all, ...otherTags];
  };
  
  // Обновляем функцию выбора тега
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleVoiceSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoiceSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && voiceSearchQuery.trim()) {
      const searchTerm = voiceSearchQuery.trim().toLowerCase();
      if (!selectedTags.includes(searchTerm)) {
        setSelectedTags(prev => [...prev, searchTerm]);
      }
      setVoiceSearchQuery('');
    }
  };

  return (
    <div className="flex w-full flex-col items-stretch justify-center mt-6">
      <div className="text-sm text-[#6D7783] font-normal">
        <div className="text-[#6D7783] self-stretch min-h-[21px] gap-1">
          Resource Bundle
        </div>
      </div>
      <div className="w-full mt-1">
        <div className="flex flex-col w-full overflow-hidden bg-[#F3F8FE] rounded-[8px_8px_0px_0px] max-md:max-w-full">
          <div className="flex gap-px flex-wrap justify-end max-md:max-w-full">
            <div className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex gap-1 overflow-hidden text-sm text-[#5438DC] font-normal w-[189px] bg-[#F3F7FE] p-2">
              <div className="self-stretch flex items-center gap-1 my-auto">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/efc4527c0c8ceddb69de854d433bc40e3dafdf7b?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                  alt="Used in locations"
                />
                <div className="text-[#5438DC] self-stretch my-auto">
                  Used in 10 locations
                </div>
              </div>
            </div>
            <div className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex gap-2 overflow-hidden text-sm text-[#666E7E] font-normal bg-[#F3F7FE] p-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/c0728ccf4974aeffb5801876dd4bcbc8edef105d?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                alt="Entire bundle"
              />
              <div className="text-[#666E7E] self-stretch gap-1 my-auto">
                Entire bundle
              </div>
            </div>
            <div className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex min-h-[37px] gap-2 overflow-hidden text-xs text-[#252b2f] font-normal leading-[18px] bg-[#F3F7FE] p-2">
              <div className="self-stretch gap-1 my-auto">
                <span className="text-[14px] text-[rgba(102,110,126,1)]">Ent_313..</span>
              </div>
            </div>
            <button className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex min-h-[37px] gap-2 overflow-hidden w-12 bg-[#F3F7FE] px-4 py-[11px]" aria-label="Edit">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/ac7cb94b0e0de1865ab3232846ccbab15ed4d539?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
                alt="Edit"
              />
            </button>
            <button className="items-center shadow-[-1px_0px_0px_0px_#D6DEE6] flex min-h-[37px] gap-2 overflow-hidden w-12 bg-[#F3F7FE] px-4 py-[11px]" aria-label="More options">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/3e539497344a6db43ec3d51e75150e6d59853b27?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
                alt="More options"
              />
            </button>
          </div>
          <div className="border bg-[#DAE1EA] min-h-px w-full border-[rgba(218,225,234,1)] border-solid max-md:max-w-full" />
        </div>
        <div className="items-stretch flex w-full max-w-[900px] flex-col bg-[#F3F8FE] p-4 rounded-[0px_0px_8px_8px] max-md:max-w-full">
          <div className="w-[426px] max-w-full text-sm text-[#666E7E] font-normal whitespace-nowrap">
            <div className="text-[#666E7E] w-[394px] max-w-full px-1">
              Image
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/ff06290576810829d426169d55c9d69f3b6ff45f?placeholderIfAbsent=true"
              className="aspect-[1.78] object-contain w-full mt-1"
              alt="Resource image"
            />
          </div>
          <div className="w-full max-w-[868px] font-normal mt-4 max-md:max-w-full">
            <div className="text-[#666E7E] w-[706px] max-w-full text-sm max-md:max-w-full">
              Flashcard text
            </div>
            <input
              ref={flashcardInputRef}
              type="text"
              className="text-[#252B2F] border border-[color:var(--brand-greyscale-600,#D6DEE6)] min-h-10 w-full overflow-hidden text-lg whitespace-nowrap bg-white mt-1 pl-4 py-[7px] rounded-lg border-solid"
              value={flashcardText}
              onChange={handleFlashcardTextChange}
              aria-label="Flashcard text"
            />
          </div>
          <div className="w-full font-normal mt-4">
            <div className="flex w-full max-w-[868px] flex-col items-stretch max-md:max-w-full">
              <div className="text-[#666E7E] text-sm">
                de alternative values
              </div>
              <div className="border border-[color:var(--Neutral-UI-Divider,#DAE1EA)] flex w-full gap-2.5 overflow-hidden text-base text-[#6D7783] bg-white mt-1 p-2 rounded-lg border-solid max-md:max-w-full">
                <input
                  type="text"
                  className="text-[#6D7783] self-stretch gap-2 rounded-xl w-full bg-transparent outline-none"
                  placeholder="New value..."
                  value={alternativeValue}
                  onChange={handleAlternativeValueChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAlternativeValue()}
                  aria-label="Alternative value"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col mt-4 max-md:max-w-full">
            <div className="flex w-full max-w-[868px] text-[#666E7E] font-normal whitespace-nowrap max-md:max-w-full max-md:pr-5">
              <div className="text-[#666E7E] self-stretch z-10 gap-2 px-1">
                Audio
              </div>
            </div>
            
            {audioSrc ? (
              <AdvancedAudioPlayer 
                audioSrc={audioSrc}
                label="Audio"
                showLabel={false}
                onRemove={handleRemoveAudio}
                showRemoveButton={true}
                className="mt-2"
              />
            ) : (
              <div className="flex w-full gap-4 text-sm justify-between flex-wrap mt-2">
                <div className="min-w-60 overflow-hidden flex-1 shrink basis-[0%] max-md:max-w-full">
                  <div className="justify-center items-center border border-[color:var(--Greyscale-Black-25,#C8CACB)] flex w-full flex-col text-[#252B2F] font-bold text-center bg-white py-2.5 rounded-lg border-dashed max-md:max-w-full max-md:px-5">
                    <div className="flex items-center justify-center gap-2 overflow-hidden">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/405af0eb7e5783dbd84c64e7a4482a3886e6bc24?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                        alt="Audio upload"
                      />
                      <div className="self-stretch my-auto max-md:max-w-full">
                        <span className="leading-[20px]">
                          Drag & drop your audio here, or{" "}
                        </span>
                        <span className="leading-[20px] text-[rgba(17,110,238,1)]">
                          browse
                        </span>{" "}
                        <span className="leading-[20px]">
                          to upload
                        </span>
                        <span className="text-[rgba(17,110,238,1)]">
                          .{" "}
                        </span>
                        <span className="font-normal text-xs leading-[18px]">
                          (25MB max, .wav and .xwav supported)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end justify-end gap-2 p-1">
                  <div className="relative w-auto" ref={audioMenuRef}>
                    <button 
                      className="flex items-center justify-center text-white font-bold text-center w-auto"
                      onClick={() => !audioSrc && setShowAudioMenu(!showAudioMenu)}
                      disabled={isGeneratingAudio || audioSrc !== null}
                    >
                      <div className="items-center justify-between border-[#116EEE] border-2 border-solid flex w-auto min-h-9 px-4 py-2 rounded-3xl whitespace-nowrap">
                        <div className="text-[#116EEE] whitespace-nowrap flex-1 text-right pr-3">
                          Get audio
                        </div>
                        <div className="h-5 w-[2px] bg-[#116EEE]"></div>
                        <div className="text-[#116EEE] flex-1 pl-3">
                          ▼
                        </div>
                      </div>
                    </button>
                    
                    {showAudioMenu && (
                      <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg p-2 z-20 w-[200px]">
                        <div 
                          className="p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-600 font-medium"
                          onClick={handleRequestAudio}
                        >
                          Voice Artist
                        </div>
                        <div 
                          className="p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-600 font-medium"
                          onClick={() => setShowVoiceSelector(true)}
                        >
                          AI Voices
                        </div>
                      </div>
                    )}
                    
                    {showVoiceSelector && (
                      <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg p-2 z-20 w-[280px] max-h-[320px] flex flex-col">
                        <div className="flex items-center mb-2 border-b pb-1 flex-shrink-0">
                          <div 
                            className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center"
                            onClick={() => setShowVoiceSelector(false)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="font-medium text-gray-600 ml-2">AI Voices</div>
                        </div>
                        
                        {/* Поисковая строка с кнопкой разворачивания тегов */}
                        <div className="mb-2 relative flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Search by tag or ID"
                              value={voiceSearchQuery}
                              onChange={handleVoiceSearchChange}
                              onKeyDown={handleSearchKeyDown}
                              className="flex-1 min-w-0 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                              className="flex-shrink-0 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors whitespace-nowrap"
                            >
                              {isTagsExpanded ? 'Hide tags' : 'Show tags'}
                            </button>
                          </div>
                        </div>
                        
                        {/* Индикатор активных фильтров */}
                        {selectedTags.length > 0 && !isTagsExpanded && (
                          <div className="flex items-center gap-1 mb-2 flex-shrink-0">
                            <div className="flex flex-wrap gap-1">
                              {selectedTags.map(tag => (
                                <div key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleTagSelect(tag);
                                    }}
                                    className="ml-1 hover:text-blue-900"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {isTagsExpanded ? (
                          /* Страница тегов - заменяет список голосов */
                          <div className="max-h-[220px] overflow-y-auto flex-1">
                            <div className="flex flex-wrap gap-1 p-1">
                              {getUniqueTags().map(tag => (
                                <button
                                  key={tag}
                                  onClick={() => handleTagSelect(tag)}
                                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                    selectedTags.includes(tag)
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* Список голосов со скроллом */
                          <div className="max-h-[220px] overflow-y-auto flex-1">
                            {isLoadingVoices ? (
                              <div className="p-4 text-center text-gray-500">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                Loading voices...
                              </div>
                            ) : voiceLoadError ? (
                              <div className="p-4 text-center text-red-500">
                                Error: {voiceLoadError}
                                <button 
                                  onClick={refreshVoices}
                                  className="mt-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                                >
                                  Retry
                                </button>
                              </div>
                            ) : filteredVoices.length > 0 ? (
                              filteredVoices.map((voice) => {
                                const hasDescription = voice.description;
                                const availableTags = Object.entries(voice.labels || {})
                                  .filter(([key, value]) => 
                                    value && 
                                    !['accent', 'gender'].includes(key) && 
                                    value !== voice.accent &&
                                    value !== voice.gender
                                  );
                                const hasTags = availableTags.length > 0;
                                const hasAdditionalInfo = hasDescription || hasTags;

                                const toggleExpanded = () => {
                                  setExpandedVoices(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(voice.id)) {
                                      newSet.delete(voice.id);
                                    } else {
                                      newSet.add(voice.id);
                                    }
                                    return newSet;
                                  });
                                };

                                const isExpanded = expandedVoices.has(voice.id);

                                return (
                                  <div 
                                    key={voice.id}
                                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                    onClick={() => {
                                      if (!hasAdditionalInfo) {
                                        // Если нет дополнительной информации, сразу выбираем голос
                                        selectVoiceAndGenerate(voice.id);
                                      } else {
                                        // Если есть доп. информация - переключаем развернутое состояние
                                        toggleExpanded();
                                      }
                                    }}
                                  >
                                    {/* Первая строка: Имя, акцент, пол */}
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <span className="font-medium text-gray-800 truncate">
                                          {isExpanded 
                                            ? `${voice.name} (${voice.accent.charAt(0).toUpperCase() + voice.accent.slice(1)}, ${voice.gender.charAt(0).toUpperCase() + voice.gender.slice(1)})`
                                            : `${voice.name} (${voice.accent.charAt(0).toUpperCase() + voice.accent.slice(1)}, ${voice.gender.charAt(0).toUpperCase() + voice.gender.slice(1)})`
                                          }
                                        </span>
                                      </div>
                                    </div>

                                    {/* Расширенная информация */}
                                    {hasAdditionalInfo && (
                                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        isExpanded ? 'max-h-[200px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                                      }`}>
                                        {/* Description */}
                                        {hasDescription && (
                                          <div className="text-xs text-gray-600 mb-3" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            lineHeight: '1.3'
                                          }}>
                                            {voice.description}
                                          </div>
                                        )}

                                        {/* Теги */}
                                        {hasTags && (
                                          <div className="flex flex-wrap gap-1 mb-3">
                                            {availableTags.map(([key, value]) => (
                                              <span
                                                key={key}
                                                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                                              >
                                                {value}
                                              </span>
                                            ))}
                                          </div>
                                        )}

                                        {/* Кнопка выбора голоса */}
                                        <div className="flex justify-end gap-2">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              
                                              // Если уже что-то воспроизводится, останавливаем
                                              if (currentPlayingPreview) {
                                                currentPlayingPreview.pause();
                                                currentPlayingPreview.currentTime = 0;
                                                setCurrentPlayingPreview(null);
                                                return;
                                              }
                                              
                                              if (voice.preview_url) {
                                                const audio = new Audio(voice.preview_url);
                                                setCurrentPlayingPreview(audio);
                                                
                                                audio.addEventListener('ended', () => {
                                                  setCurrentPlayingPreview(null);
                                                });
                                                
                                                audio.play().catch(error => {
                                                  console.error("Error playing preview:", error);
                                                  setCurrentPlayingPreview(null);
                                                });
                                              }
                                            }}
                                            className="px-3 py-1.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-medium rounded-full transition-colors"
                                          >
                                            Voice test
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              selectVoiceAndGenerate(voice.id);
                                            }}
                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-full transition-colors"
                                          >
                                            Use this voice
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <div className="p-2 text-center text-gray-500">No matching voices found</div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {isGeneratingAudio && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 rounded-3xl">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#116EEE]"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full font-normal mt-4">
            <div className="w-full max-md:max-w-full">
              <div className="text-[#4B5766] w-full text-sm whitespace-nowrap max-md:max-w-full">
                Example
              </div>
              <input
                type="text"
                className="text-[#6D7783] self-stretch flex-1 shrink basis-[0%] border border-[color:var(--Neutral-UI-Divider,#DAE1EA)] min-h-11 w-full overflow-hidden text-base bg-white mt-1 px-4 py-2.5 rounded-lg border-solid max-md:max-w-full"
                defaultValue="Example in English"
                aria-label="Example"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-[#116EEE] font-bold leading-none mt-4">
            <div className="text-[#116EEE] self-stretch my-auto">
              Add Audio
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f475795a84157a748c413c0f9d29fc6049d3a021?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 fill-[#116EEE] self-stretch shrink-0 my-auto"
              alt="Add"
            />
          </button>
          <button className="flex w-full items-center gap-2 text-sm text-[#116EEE] font-bold leading-none flex-wrap mt-4 max-md:max-w-full">
            <div className="text-[#116EEE] self-stretch my-auto">
              Add Video
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/f475795a84157a748c413c0f9d29fc6049d3a021?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 fill-[#116EEE] self-stretch shrink-0 my-auto"
              alt="Add"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceBundle;
