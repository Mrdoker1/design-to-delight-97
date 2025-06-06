"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AdvancedAudioPlayerProps {
  audioSrc: string | null;
  className?: string;
  label?: string;
  showLabel?: boolean;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

export const AdvancedAudioPlayer = React.forwardRef<HTMLDivElement, AdvancedAudioPlayerProps>(
  ({ audioSrc, className, label = "Audio Example", showLabel = true, onRemove, showRemoveButton = false, ...props }, ref) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isVolumeHovered, setIsVolumeHovered] = React.useState(false);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const volumeInputRef = React.useRef<HTMLInputElement>(null);
    const progressInputRef = React.useRef<HTMLInputElement>(null);

    // Audio player functions
    React.useEffect(() => {
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
    React.useEffect(() => {
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
      <div ref={ref} className={cn("flex flex-col items-start gap-2 self-stretch relative", className)} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center w-full">
            <div className="text-[#6D7783] text-sm font-normal leading-[21px] relative">
              {label}
            </div>
            {showRemoveButton && onRemove && audioSrc && (
              <button
                onClick={onRemove}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>
        )}
        
        {audioSrc ? (
          <div className="border border-[#DAE1EA] flex w-full px-4 py-3 rounded-lg border-solid bg-white">
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
                </div>
                
                {/* Divider line and remove button for main page */}
                {showRemoveButton && onRemove && (
                  <>
                    <div className="absolute right-[36px] -top-3 -bottom-3 w-[1px] bg-[#DAE1EA]"></div>
                    
                    <button 
                      onClick={onRemove}
                      className="text-gray-600 hover:text-gray-800 flex-shrink-0 ml-8"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                      </svg>
                    </button>
                  </>
                )}
                
                <audio 
                  ref={audioRef} 
                  src={audioSrc} 
                  preload="metadata"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-[#DAE1EA] flex w-full h-10 px-4 py-2 rounded-lg border-solid bg-gray-50">
            <div className="flex items-center justify-center w-full text-gray-500 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M19.3222 10.7089C20.2259 11.3231 20.2259 12.6769 19.3222 13.2912L7.36656 19.7368C6.35498 20.4243 5 19.685 5 18.4456V5.55438C5 4.31499 6.35498 3.57574 7.36656 4.26323L19.3222 10.7089Z" fill="currentColor"/>
              </svg>
              No audio loaded
            </div>
          </div>
        )}
      </div>
    );
  }
);

AdvancedAudioPlayer.displayName = "AdvancedAudioPlayer"; 