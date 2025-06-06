export interface VoiceDNA {
  speed: number;        // Speech rate (0-100)
  stability: number;    // Voice stability (0-100)
  similarity: number;   // Similarity boost (0-100)
  styleExaggeration: number; // Style exaggeration (0-100)
}

export interface Voice {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  language: string;
  languageCode: string;
  accent: string;
  voiceDNA: VoiceDNA;
  tags: string[];
  flagIcon: string;
  description?: string;
  elevenLabsId?: string; // ID для ElevenLabs API
}

export interface FilterState {
  language: string;
  gender: string;
  accent: string;
  search: string;
} 