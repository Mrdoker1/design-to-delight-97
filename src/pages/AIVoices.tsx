import React, { useState, useMemo } from 'react';
import { Header } from '../components/ai-voices/Header';
import { Breadcrumb } from '../components/ai-voices/Breadcrumb';
import { NavigationTabs } from '../components/ai-voices/NavigationTabs';
import { FilterControls } from '../components/ai-voices/FilterControls';
import { VoiceTable } from '../components/ai-voices/VoiceTable';
import { Pagination } from '../components/ai-voices/Pagination';
import { Voice, FilterState, VoiceDNA } from '../types/voice';
import { parseVoiceDNAString } from '../utils/voiceDNA';

export default function AIVoices() {
  // Функция для загрузки голосов из local storage
  const loadVoicesFromStorage = (): Voice[] => {
    try {
      const savedVoices = localStorage.getItem('ai-voices');
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
    
    // Возвращаем тестовые голоса с реальными ElevenLabs ID если нет сохраненных данных
    return [
      {
        id: "voice_1", // Уникальный ID для localStorage
        name: "Rachel",
        gender: "Female",
        language: "English",
        languageCode: "EN",
        accent: "American",
        voiceDNA: { speed: 40, stability: 40, similarity: 40, styleExaggeration: 40 },
        tags: ["calm", "young"],
        flagIcon: "",
        description: "A calm and pleasant voice, perfect for narration and storytelling.",
        elevenLabsId: "21m00Tcm4TlvDq8ikWAM" // Реальный ID голоса от ElevenLabs (Rachel)
      },
      {
        id: "voice_2", // Уникальный ID для localStorage
        name: "Bella",
        gender: "Female", 
        language: "English",
        languageCode: "EN",
        accent: "American",
        voiceDNA: { speed: 45, stability: 35, similarity: 50, styleExaggeration: 30 },
        tags: ["warm", "friendly"],
        flagIcon: "",
        description: "A warm and friendly voice with a youthful energy.",
        elevenLabsId: "EXAVITQu4vr4xnSDxMaL" // Реальный ID голоса от ElevenLabs (Bella)
      },
      {
        id: "voice_3", // Уникальный ID для localStorage
        name: "Antoni",
        gender: "Male",
        language: "English", 
        languageCode: "EN",
        accent: "American",
        voiceDNA: { speed: 50, stability: 40, similarity: 45, styleExaggeration: 35 },
        tags: ["professional", "mature"],
        flagIcon: "",
        description: "A professional and mature male voice, great for business content.",
        elevenLabsId: "ErXwobaYiN019PkySvjV" // Реальный ID голоса от ElevenLabs (Antoni)
      }
    ];
  };

  // Функция для сохранения голосов в local storage
  const saveVoicesToStorage = (voicesToSave: Voice[]) => {
    try {
      localStorage.setItem('ai-voices', JSON.stringify(voicesToSave));
      console.log('Voices saved to localStorage:', voicesToSave);
    } catch (error) {
      console.error('Error saving voices to localStorage:', error);
    }
  };

  const [voices, setVoices] = useState<Voice[]>(() => loadVoicesFromStorage());
  const [editingVoice, setEditingVoice] = useState<Voice | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    language: '',
    gender: '',
    accent: '',
    search: '',
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredVoices = useMemo(() => {
    return voices.filter((voice) => {
      const matchesLanguage = !filters.language || voice.languageCode === filters.language;
      const matchesGender = !filters.gender || voice.gender === filters.gender;
      const matchesAccent = !filters.accent || voice.accent === filters.accent;
      const matchesSearch = !filters.search || 
        voice.name.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesLanguage && matchesGender && matchesAccent && matchesSearch;
    });
  }, [voices, filters]);

  const paginatedVoices = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredVoices.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredVoices, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredVoices.length / rowsPerPage);

  const handleAddVoice = (voiceData: Omit<Voice, 'id'>) => {
    const newVoice: Voice = {
      ...voiceData,
      id: Date.now().toString(), // Простой способ генерации ID для новых голосов
    };
    const updatedVoices = [...voices, newVoice];
    setVoices(updatedVoices);
    saveVoicesToStorage(updatedVoices);
  };

  const handleEditVoice = (updatedVoice: Voice) => {
    console.log('Сохраняем отредактированный голос:', updatedVoice);
    const updatedVoices = voices.map(voice => 
      voice.id === updatedVoice.id ? updatedVoice : voice
    );
    setVoices(updatedVoices);
    saveVoicesToStorage(updatedVoices);
  };

  const handleEdit = (voice: Voice) => {
    // Эта функция будет вызываться из VoiceTable и должна передать голос в NavigationTabs
    setEditingVoice(voice);
  };

  const handleDelete = (voice: Voice) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the voice "${voice.name}"? This action cannot be undone.`
    );
    
    if (confirmDelete) {
      const updatedVoices = voices.filter(v => v.id !== voice.id);
      setVoices(updatedVoices);
      saveVoicesToStorage(updatedVoices);
      
      // Если удаляемый голос был в режиме редактирования, закрываем модал
      if (editingVoice && editingVoice.id === voice.id) {
        setEditingVoice(null);
      }
      
      console.log(`Voice "${voice.name}" has been deleted`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="flex w-full justify-center items-start shadow-[0px_4px_0px_0px_#D6DEE6,4px_1px_14px_0px_#D6DEE6] min-h-screen bg-white pb-[35px]">
      <div className="flex w-full flex-col items-center gap-14 shrink-0 px-10 py-10 max-md:px-6 max-md:py-6 max-sm:px-4 max-sm:py-4">
        <Header />
        
        <main className="flex flex-col items-start gap-6 w-full">
          <Breadcrumb />
          
          <header className="text-[#252B2F] text-3xl font-bold leading-[39px] w-full h-16 content-between gap-1 px-0 py-2 max-sm:text-2xl">
            Audio Management
          </header>
          
          <NavigationTabs 
            onAddVoice={handleAddVoice}
            onEditVoice={handleEditVoice}
            editingVoice={editingVoice}
            onEditingVoiceChange={setEditingVoice}
          />
          
          <FilterControls filters={filters} onFiltersChange={setFilters} />
          
          <section className="flex flex-col items-end gap-6 w-full">
            <VoiceTable 
              voices={paginatedVoices} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
            
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalItems={filteredVoices.length}
              itemsPerPage={rowsPerPage}
              onItemsPerPageChange={handleRowsPerPageChange}
            />
          </section>
        </main>
      </div>
    </div>
  );
} 