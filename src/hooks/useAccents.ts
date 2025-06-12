import { useState, useCallback } from 'react';

const ACCENTS_STORAGE_KEY = 'custom-accents';
const DEFAULT_ACCENTS = ['British', 'American', 'Australian', 'Canadian'];

export const useAccents = () => {
  const loadCustomAccents = useCallback((): string[] => {
    try {
      const savedAccents = localStorage.getItem(ACCENTS_STORAGE_KEY);
      if (savedAccents) {
        return JSON.parse(savedAccents);
      }
    } catch (error) {
      console.error('Error loading custom accents from localStorage:', error);
    }
    return [];
  }, []);

  const [customAccents, setCustomAccents] = useState<string[]>(loadCustomAccents);

  const saveCustomAccents = useCallback((accents: string[]) => {
    try {
      localStorage.setItem(ACCENTS_STORAGE_KEY, JSON.stringify(accents));
      setCustomAccents(accents);
    } catch (error) {
      console.error('Error saving custom accents to localStorage:', error);
    }
  }, []);

  const addCustomAccent = useCallback((accent: string) => {
    const trimmedAccent = accent.trim();
    if (trimmedAccent && !getAllAccents().includes(trimmedAccent)) {
      const updatedAccents = [...customAccents, trimmedAccent];
      saveCustomAccents(updatedAccents);
      return true;
    }
    return false;
  }, [customAccents, saveCustomAccents]);

  const removeCustomAccent = useCallback((accent: string) => {
    const updatedAccents = customAccents.filter(a => a !== accent);
    saveCustomAccents(updatedAccents);
  }, [customAccents, saveCustomAccents]);

  const getAllAccents = useCallback((): string[] => {
    return [...DEFAULT_ACCENTS, ...customAccents];
  }, [customAccents]);

  const isCustomAccent = useCallback((accent: string): boolean => {
    return customAccents.includes(accent);
  }, [customAccents]);

  return {
    defaultAccents: DEFAULT_ACCENTS,
    customAccents,
    allAccents: getAllAccents(),
    addCustomAccent,
    removeCustomAccent,
    isCustomAccent,
    reloadAccents: () => setCustomAccents(loadCustomAccents())
  };
}; 