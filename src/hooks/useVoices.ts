import { useState, useCallback } from 'react';
import { Voice } from '../types/voice';
import { parseVoiceDNAString } from '../utils/voiceDNA';

const STORAGE_KEY = 'ai-voices';

const getDefaultVoices = (): Voice[] => [
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

export const useVoices = () => {
  const loadVoices = useCallback((): Voice[] => {
    try {
      const savedVoices = localStorage.getItem(STORAGE_KEY);
      if (savedVoices) {
        const voices = JSON.parse(savedVoices);
        // Конвертируем старые голоса со строковым VoiceDNA в новый формат
        return voices.map((voice: Voice | (Omit<Voice, 'voiceDNA'> & { voiceDNA: string })) => {
          if (typeof voice.voiceDNA === 'string') {
            return {
              ...voice,
              voiceDNA: parseVoiceDNAString(voice.voiceDNA)
            };
          }
          return voice;
        });
      }
    } catch (error) {
      console.error('Error loading voices from localStorage:', error);
    }
    return getDefaultVoices();
  }, []);

  const [voices, setVoices] = useState<Voice[]>(loadVoices);

  const saveVoices = useCallback((voicesToSave: Voice[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(voicesToSave));
      setVoices(voicesToSave);
      console.log('Voices saved to localStorage:', voicesToSave);
    } catch (error) {
      console.error('Error saving voices to localStorage:', error);
    }
  }, []);

  const addVoice = useCallback((voiceData: Omit<Voice, 'id'>) => {
    const newVoice: Voice = {
      ...voiceData,
      id: Date.now().toString(),
    };
    const updatedVoices = [...voices, newVoice];
    saveVoices(updatedVoices);
  }, [voices, saveVoices]);

  const updateVoice = useCallback((updatedVoice: Voice) => {
    const updatedVoices = voices.map(voice => 
      voice.id === updatedVoice.id ? updatedVoice : voice
    );
    saveVoices(updatedVoices);
  }, [voices, saveVoices]);

  const deleteVoice = useCallback((voiceToDelete: Voice) => {
    const updatedVoices = voices.filter(voice => voice.id !== voiceToDelete.id);
    saveVoices(updatedVoices);
  }, [voices, saveVoices]);

  return {
    voices,
    addVoice,
    updateVoice,
    deleteVoice,
    reloadVoices: () => setVoices(loadVoices())
  };
}; 