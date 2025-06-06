import { useState, useEffect } from 'react';

interface VoicePreview {
  id: string;
  preview_url?: string;
}

export const useVoicePreviewLoader = (voiceIds: string[]) => {
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (voiceIds.length === 0) return;

    const loadPreviewUrls = async () => {
      setIsLoading(true);
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        console.warn('ElevenLabs API key not found');
        setIsLoading(false);
        return;
      }

      const newPreviewUrls: Record<string, string> = {};

      // Загружаем превью параллельно для всех голосов
      const promises = voiceIds.map(async (voiceId) => {
        try {
          const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
            headers: {
              'Accept': 'application/json',
              'xi-api-key': apiKey
            }
          });

          if (response.ok) {
            const voiceData = await response.json();
            if (voiceData.preview_url) {
              newPreviewUrls[voiceId] = voiceData.preview_url;
            }
          }
        } catch (error) {
          console.warn(`Failed to load preview for voice ${voiceId}:`, error);
        }
      });

      await Promise.all(promises);
      setPreviewUrls(newPreviewUrls);
      setIsLoading(false);
    };

    loadPreviewUrls();
  }, [voiceIds]);

  return { previewUrls, isLoading };
}; 