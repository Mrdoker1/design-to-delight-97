import { VoiceDNA } from '../types/voice';

/**
 * Конвертирует строку VoiceDNA в объект
 * Пример: "Sp 40 / St 35 / Si 50 / Ex 30" -> { speed: 40, stability: 35, similarity: 50, styleExaggeration: 30 }
 */
export const parseVoiceDNAString = (dnaString: string): VoiceDNA => {
  const defaultDNA: VoiceDNA = { speed: 40, stability: 40, similarity: 40, styleExaggeration: 40 };
  
  if (!dnaString || typeof dnaString !== 'string') {
    return defaultDNA;
  }

  try {
    const matches = dnaString.match(/Sp\s*(\d+).*?St\s*(\d+).*?Si\s*(\d+).*?Ex\s*(\d+)/);
    if (matches && matches.length === 5) {
      return {
        speed: parseInt(matches[1], 10),
        stability: parseInt(matches[2], 10),
        similarity: parseInt(matches[3], 10),
        styleExaggeration: parseInt(matches[4], 10)
      };
    }
  } catch (error) {
    console.warn('Error parsing VoiceDNA string:', error);
  }

  return defaultDNA;
};

/**
 * Конвертирует объект VoiceDNA в строку для отображения
 * Пример: { speed: 40, stability: 35, similarity: 50, styleExaggeration: 30 } -> "Sp 40 / St 35 / Si 50 / Ex 30"
 */
export const formatVoiceDNA = (voiceDNA: VoiceDNA): string => {
  return `Sp ${voiceDNA.speed} / St ${voiceDNA.stability} / Si ${voiceDNA.similarity} / Ex ${voiceDNA.styleExaggeration}`;
};

/**
 * Конвертирует VoiceDNA в настройки для ElevenLabs API
 * Конвертирует значения из диапазона 0-100 в диапазон 0-1 для API
 */
export const voiceDNAToElevenLabsSettings = (voiceDNA: VoiceDNA) => {
  return {
    stability: voiceDNA.stability / 100,
    similarity_boost: voiceDNA.similarity / 100,
    style: voiceDNA.styleExaggeration / 100
    // speed будет использоваться отдельно в voice_settings при генерации
  };
};

/**
 * Создает объект настроек голоса для ElevenLabs API
 */
export const createElevenLabsVoiceSettings = (voiceDNA: VoiceDNA) => {
  return {
    stability: voiceDNA.stability / 100,
    similarity_boost: voiceDNA.similarity / 100,
    style: voiceDNA.styleExaggeration / 100,
    use_speaker_boost: true
  };
};

/**
 * Проверяет валидность значений VoiceDNA
 */
export const validateVoiceDNA = (voiceDNA: VoiceDNA): boolean => {
  const { speed, stability, similarity, styleExaggeration } = voiceDNA;
  
  return (
    typeof speed === 'number' && speed >= 0 && speed <= 100 &&
    typeof stability === 'number' && stability >= 0 && stability <= 100 &&
    typeof similarity === 'number' && similarity >= 0 && similarity <= 100 &&
    typeof styleExaggeration === 'number' && styleExaggeration >= 0 && styleExaggeration <= 100
  );
}; 