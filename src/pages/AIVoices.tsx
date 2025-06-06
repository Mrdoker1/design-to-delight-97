import React, { useState, useMemo } from 'react';
import { Header } from '../components/ai-voices/Header';
import { Breadcrumb } from '../components/ai-voices/Breadcrumb';
import { NavigationTabs } from '../components/ai-voices/NavigationTabs';
import { FilterControls } from '../components/ai-voices/FilterControls';
import { VoiceTable } from '../components/ai-voices/VoiceTable';
import { Pagination } from '../components/ai-voices/Pagination';
import { Voice, FilterState } from '../types/voice';

export default function AIVoices() {
  const [voices, setVoices] = useState<Voice[]>([]);
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
      id: Date.now().toString(), // Простой способ генерации ID
    };
    setVoices(prev => [...prev, newVoice]);
  };

  const handleEditVoice = (updatedVoice: Voice) => {
    setVoices(prev => prev.map(voice => 
      voice.id === updatedVoice.id ? updatedVoice : voice
    ));
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
      setVoices(prev => prev.filter(v => v.id !== voice.id));
      
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