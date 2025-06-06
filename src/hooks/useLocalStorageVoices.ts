import { useState, useEffect } from 'react';
import { Voice as LocalVoice } from '../types/voice';
import { parseVoiceDNAString } from '../utils/voiceDNA';
import { useVoicePreviewLoader } from './useVoicePreviewLoader';

// Интерфейс для голосов в ResourceBundle (совместимость)
interface ResourceBundleVoice {
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

export const useLocalStorageVoices = () => {
  const [voices, setVoices] = useState<ResourceBundleVoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voiceIds, setVoiceIds] = useState<string[]>([]);
  
  // Загружаем preview URLs для всех голосов
  const { previewUrls, isLoading: previewLoading } = useVoicePreviewLoader(voiceIds);

  const loadVoicesFromStorage = () => {
    try {
      setIsLoading(true);
      setError(null);

      const savedVoices = localStorage.getItem('ai-voices');
      let localVoices: LocalVoice[] = [];

      if (savedVoices) {
        const parsedVoices = JSON.parse(savedVoices);
        // Конвертируем старые голоса со строковым VoiceDNA в новый формат
        localVoices = parsedVoices.map((voice: LocalVoice & { voiceDNA?: string | object }) => {
          if (typeof voice.voiceDNA === 'string') {
            return {
              ...voice,
              voiceDNA: parseVoiceDNAString(voice.voiceDNA)
            };
          }
          return voice as LocalVoice;
        });
      } else {
        // Дефолтные голоса если нет в localStorage
        localVoices = [
          {
            id: "voice_1",
            name: "Rachel",
            gender: "Female",
            language: "English",
            languageCode: "EN",
            accent: "American",
            voiceDNA: { speed: 40, stability: 40, similarity: 40, styleExaggeration: 40 },
            tags: ["calm", "young"],
            flagIcon: "",
            description: "A calm and pleasant voice, perfect for narration and storytelling.",
            elevenLabsId: "21m00Tcm4TlvDq8ikWAM"
          },
          {
            id: "voice_2",
            name: "Bella",
            gender: "Female", 
            language: "English",
            languageCode: "EN",
            accent: "American",
            voiceDNA: { speed: 45, stability: 35, similarity: 50, styleExaggeration: 30 },
            tags: ["warm", "friendly"],
            flagIcon: "",
            description: "A warm and friendly voice with a youthful energy.",
            elevenLabsId: "EXAVITQu4vr4xnSDxMaL"
          },
          {
            id: "voice_3",
            name: "Antoni",
            gender: "Male",
            language: "English", 
            languageCode: "EN",
            accent: "American",
            voiceDNA: { speed: 50, stability: 40, similarity: 45, styleExaggeration: 35 },
            tags: ["professional", "mature"],
            flagIcon: "",
            description: "A professional and mature male voice, great for business content.",
            elevenLabsId: "ErXwobaYiN019PkySvjV"
          }
        ];
      }

      // Конвертируем в формат ResourceBundle
      const convertedVoices: ResourceBundleVoice[] = localVoices.map(voice => {
        // Создаем labels из тегов и других полей
        const labels: { [key: string]: string | undefined } = {
          accent: voice.accent.toLowerCase(),
          gender: voice.gender.toLowerCase(),
          language: voice.language.toLowerCase(),
        };

        // Добавляем теги в labels
        voice.tags.forEach((tag, index) => {
          labels[`tag_${index}`] = tag.toLowerCase();
        });

        // Определяем style на основе тегов
        const style = voice.tags.find(tag => 
          ['calm', 'professional', 'warm', 'friendly', 'energetic', 'mature', 'young'].includes(tag.toLowerCase())
        ) || 'narrator';

        const voiceId = voice.elevenLabsId || voice.id;
        
        return {
          id: voiceId, // Используем ElevenLabs ID для API вызовов
          name: voice.name,
          accent: voice.accent.toLowerCase(),
          gender: voice.gender.toLowerCase(),
          style: style.toLowerCase(),
          description: voice.description,
          labels
        };
      });

      // Собираем все ElevenLabs IDs для загрузки превью
      const ids = localVoices
        .map(voice => voice.elevenLabsId)
        .filter(Boolean) as string[];
      
      setVoiceIds(ids);
      setVoices(convertedVoices);
    } catch (error) {
      console.error('Error loading voices from localStorage:', error);
      setError('Failed to load voices from local storage');
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем голоса при монтировании и при изменениях localStorage
  useEffect(() => {
    loadVoicesFromStorage();

    // Слушаем изменения в localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ai-voices') {
        loadVoicesFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Метод для принудительного обновления
  const refreshVoices = () => {
    loadVoicesFromStorage();
  };

  // Объединяем голоса с preview URLs
  const voicesWithPreviews = voices.map(voice => ({
    ...voice,
    preview_url: previewUrls[voice.id]
  }));

  return {
    voices: voicesWithPreviews,
    isLoading: isLoading || previewLoading,
    error,
    refreshVoices
  };
}; 