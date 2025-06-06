export interface Voice {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  language: string;
  languageCode: string;
  accent: string;
  voiceDNA: string;
  tags: string[];
  flagIcon: string;
  description?: string;
}

export interface FilterState {
  language: string;
  gender: string;
  accent: string;
  search: string;
} 