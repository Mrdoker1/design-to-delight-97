import { useState, useCallback } from 'react';

export const useVoiceData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadVoiceData = useCallback(async (voiceId: string) => {
    if (!voiceId.trim()) {
      throw new Error("Voice ID is required");
    }

    setIsLoading(true);
    
    try {
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        throw new Error("ElevenLabs API key not found");
      }

      const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Invalid Voice ID`);
      }

      const voiceData = await response.json();
      return voiceData;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    loadVoiceData
  };
}; 