import React, { useState, useRef, useEffect } from "react";

interface Voice {
  id: string;
  name: string;
  accent: string;
  gender: string;
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

const ResourceBundle: React.FC = () => {
  const [alternativeValue, setAlternativeValue] = useState("");
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flashcardText, setFlashcardText] = useState("Hello!");
  const [audioGenStatus, setAudioGenStatus] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const flashcardInputRef = useRef<HTMLInputElement>(null);
  const audioMenuRef = useRef<HTMLDivElement>(null);
  const volumeInputRef = useRef<HTMLInputElement>(null);
  const progressInputRef = useRef<HTMLInputElement>(null);

  // Real voices from ElevenLabs
  const availableVoices: Voice[] = [
    // American voices
    { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel (American Female)", accent: "american", gender: "female" },
    { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi (American Female)", accent: "american", gender: "female" },
    { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh (American Male)", accent: "american", gender: "male" },
    { id: "pNInz6obpgDQGcFmaJgB", name: "Adam (American Male)", accent: "american", gender: "male" },
    // British voices
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella (British Female)", accent: "british", gender: "female" },
    { id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli (British Female)", accent: "british", gender: "female" },
    { id: "VR6AewLTigWG4xSOukaG", name: "Antoni (British Male)", accent: "british", gender: "male" },
    { id: "ErXwobaYiN019PkySvjV", name: "Thomas (British Male)", accent: "british", gender: "male" },
  ];

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);
      const handleTimeUpdateEvent = () => handleTimeUpdate();
      const handleDurationChange = () => {
        setDuration(audioElement.duration);
        updateProgressSliderBackground();
      };

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      audioElement.addEventListener('ended', handleEnded);
      audioElement.addEventListener('timeupdate', handleTimeUpdateEvent);
      audioElement.addEventListener('durationchange', handleDurationChange);

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('timeupdate', handleTimeUpdateEvent);
        audioElement.removeEventListener('durationchange', handleDurationChange);
      };
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
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioSrc(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          alert("Failed to play audio. Please try again.");
        });
      }
    }
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

  // Get voice settings for educational context
  const getVoiceSettings = (): VoiceSettings => {
    // Settings for educational context: clearer pronunciation
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
    alert("Audio request functionality will be added later");
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

      // Get voice settings for educational context
      const voiceSettings = getVoiceSettings();

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
    }
  };

  // Форматирование времени в формат 0:00
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Регулировка громкости
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    updateVolumeSliderBackground(newVolume);
  };

  // Обновление фона ползунка громкости
  const updateVolumeSliderBackground = (value: number) => {
    if (volumeInputRef.current) {
      const percentage = value * 100;
      volumeInputRef.current.style.background = `linear-gradient(to right, #000000 ${percentage}%, #999999 ${percentage}%)`;
    }
  };

  // Инициализация стилей ползунка громкости при монтировании и обновлении значения
  useEffect(() => {
    updateVolumeSliderBackground(volume);
  }, [volume, isVolumeHovered]);

  // Обновление текущего времени воспроизведения
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      updateProgressSliderBackground();
    }
  };

  // Обновление фона ползунка прогресса
  const updateProgressSliderBackground = () => {
    if (progressInputRef.current && audioRef.current) {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      progressInputRef.current.style.background = `linear-gradient(to right, #000000 ${percentage}%, #999999 ${percentage}%)`;
      progressInputRef.current.value = percentage.toString();
    }
  };

  // Обновление временной позиции при перемещении ползунка
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const percent = parseInt(e.target.value);
      const time = (percent / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      updateProgressSliderBackground();
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
          <div className="flex w-full gap-4 text-sm justify-center flex-wrap mt-4 max-md:max-w-full">
            <div className="min-w-60 overflow-hidden flex-1 shrink basis-[0%] max-md:max-w-full">
              <div className="w-full overflow-hidden max-md:max-w-full">
                <div className="flex w-full max-w-[868px] flex-col text-[#666E7E] font-normal whitespace-nowrap max-md:max-w-full max-md:pr-5">
                  <div className="text-[#666E7E] self-stretch z-10 gap-2 px-1">
                    Audio
                  </div>
                </div>
                
                {audioSrc ? (
                  <div className="border border-[color:var(--Neutral-UI-Divider,#DAE1EA)] flex w-full px-4 py-3 rounded-lg border-solid bg-white mt-2">
                    <div className="flex items-center w-full">
                      <div className="flex items-center w-full relative">
                        <div className="flex items-center space-x-3 w-full">
                          <button 
                            onClick={togglePlay}
                            className="text-gray-600 hover:text-gray-800 flex-shrink-0"
                          >
                            {isPlaying ? (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="7" y="5" width="3" height="14" rx="1" fill="currentColor"/>
                                <rect x="14" y="5" width="3" height="14" rx="1" fill="currentColor"/>
                              </svg>
                            ) : (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 5L19 12L7 19V5Z" fill="currentColor"/>
                              </svg>
                            )}
                          </button>
                          
                          {/* Время воспроизведения */}
                          <div className="text-xs text-gray-600 min-w-[70px]">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                          
                          <div className="flex items-center flex-1">
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              ref={progressInputRef}
                              className="w-full h-1 appearance-none bg-[#999999] rounded-full cursor-pointer outline-none focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent"
                              onChange={handleProgressChange}
                            />
                          </div>
                          
                          {/* Регулировка громкости */}
                          <div className="flex items-center ml-2">
                            <div 
                              onMouseEnter={() => setIsVolumeHovered(true)}
                              onMouseLeave={() => setIsVolumeHovered(false)}
                              className="relative flex items-center"
                            >
                              <div className="flex items-center overflow-hidden">
                                <div 
                                  className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center ${isVolumeHovered ? 'w-14 opacity-100 mr-1' : 'w-0 opacity-0'}`}
                                >
                                  <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    ref={volumeInputRef}
                                    className="w-full h-1 appearance-none bg-[#999999] rounded-full cursor-pointer outline-none focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent"
                                    onChange={handleVolumeChange}
                                  />
                                </div>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                  <path d="M3 9H7L12 4V20L7 15H3V9Z" fill="currentColor"/>
                                  {volume > 0.5 ? (
                                    <>
                                      <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z" fill="currentColor"/>
                                      <path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="currentColor"/>
                                    </>
                                  ) : volume > 0 ? (
                                    <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z" fill="currentColor"/>
                                  ) : (
                                    <path d="M14 8.83v1.66L15.17 12 14 13.17v1.66L17.17 12 14 8.83z" fill="currentColor"/>
                                  )}
                                </svg>
                              </div>
                            </div>
                          </div>
                          
                          <audio 
                            ref={audioRef} 
                            src={audioSrc} 
                            className="hidden" 
                            preload="auto"
                          />
                        </div>
                        
                        {/* Divider line */}
                        <div className="absolute right-[36px] -top-3 -bottom-3 w-[1px] bg-[#DAE1EA]"></div>
                        
                        <button 
                          onClick={handleRemoveAudio}
                          className="text-gray-600 hover:text-gray-800 flex-shrink-0 ml-8"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="justify-center items-center border border-[color:var(--Greyscale-Black-25,#C8CACB)] flex w-full flex-col text-[#252B2F] font-bold text-center bg-white mt-2 py-2.5 rounded-lg border-dashed max-md:max-w-full max-md:px-5">
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
                )}
              </div>
            </div>
            <div className="flex flex-col items-end justify-end gap-2 p-1">
              <div className="relative w-auto" ref={audioMenuRef}>
                                  <button 
                  className="flex items-center justify-center text-white font-bold text-center w-auto"
                  onClick={() => setShowAudioMenu(!showAudioMenu)}
                  disabled={isGeneratingAudio}
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
                      Request audio
                    </div>
                    <div 
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-600 font-medium"
                      onClick={() => setShowVoiceSelector(true)}
                    >
                      Generate audio
                    </div>
                  </div>
                )}
                
                {showVoiceSelector && (
                  <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg p-2 z-20 w-[240px]">
                    <div className="flex items-center mb-2 border-b pb-1">
                      <div 
                        className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center"
                        onClick={() => setShowVoiceSelector(false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="font-medium text-gray-600 ml-2">Generate audio</div>
                    </div>
                    {availableVoices.map((voice) => (
                      <div 
                        key={voice.id}
                        className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => selectVoiceAndGenerate(voice.id)}
                      >
                        {voice.name}
                      </div>
                    ))}
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
