import { useState, useCallback } from 'react';

export const useVoicePreview = () => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPreview = useCallback(async (voiceId: string) => {
    if (!voiceId.trim()) {
      setAudioSrc(null);
      return;
    }

    setIsLoading(true);
    
    try {
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        console.warn("ElevenLabs API key not found for voice preview");
        return;
      }

      const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': apiKey
        }
      });

      if (response.ok) {
        const voiceData = await response.json();
        
        if (voiceData.preview_url) {
          setAudioSrc(voiceData.preview_url);
        } else {
          console.log("Preview URL не найден в данных голоса");
          setAudioSrc(null);
        }
      } else {
        console.warn("Ошибка при загрузке данных голоса:", response.status, response.statusText);
        setAudioSrc(null);
      }
    } catch (error) {
      console.warn("Error loading voice preview:", error);
      setAudioSrc(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearPreview = useCallback(() => {
    setAudioSrc(null);
    setIsLoading(false);
  }, []);

  return {
    audioSrc,
    isLoading,
    loadPreview,
    clearPreview
  };
}; 